class RegistrationsController < Devise::RegistrationsController
  before_filter :configure_permitted_parameters

  prepend_before_filter :authenticate_scope!, only: [:edit, :update, :destroy, :redeem_gift, :purchase_gift_edit]

  def after_sign_up_path_for(resource)
    case current_user.roles.first.name
      when 'alpha'
        UserMailer.welcome_email(resource).deliver
        content_alpha_path
      when 'red'
        UserMailer.welcome_email(resource).deliver        
        content_silver_path
      when 'yellow'
        UserMailer.welcome_email(resource).deliver
        content_silver_path
      when 'silver'
        UserMailer.welcome_email(resource).deliver
        content_silver_path
      when 'giftcard_purchase'
        content_giftcard_path
    end
  end

  def after_invite_path_for(resource)
    authenticated_root_path
  end

  def after_update_path_for(resource)
    edit_user_registration_path
  end

  # GET /resource/sign_up
  def new
    @plan = params[:plan]
    if (@plan.nil?) || (@plan && ENV["ROLES"].include?(@plan) && @plan != "admin")
      build_resource({})
      self.resource.donations.build
      self.resource.sent_gift_cards.build
      self.resource.gift_code = params[:giftcode]

      if @plan.nil?
        self.resource.plan = :red
      else
        self.resource.plan = @plan
      end

      respond_with self.resource
    else
      redirect_to unauthenticated_root_path, :notice => 'Please select a subscription plan below.'
    end
  end

  # POST /resource
  def create
    params[:plan] = params[:plan].gsub(/\+donation/, "")
    @plan = params[:plan]
    
    build_resource(sign_up_params)
    self.resource.plan = @plan
    resource = self.resource

    if resource.save
      if self.resource.active_for_authentication?
        set_flash_message :notice, :signed_up if is_navigational_format?
        sign_up(resource_name, resource)
        respond_with resource, :location => after_sign_up_path_for(resource)
      else
        set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_navigational_format?
        expire_session_data_after_sign_in!
        respond_with resource, :location => after_inactive_sign_up_path_for(resource)
      end
    else
      resource.plan = params[:plan]

      original_resource = resource;

      resource = resource_class.find_by(email: sign_up_params["email"])
      if !resource.nil? && resource.invited_to_sign_up?

        resource.assign_attributes(sign_up_params)
        resource.invitation_token = nil
        if params[:plan]
          resource.add_role(params[:plan])
        end
 
        if resource.save
          if resource.active_for_authentication?
            set_flash_message :notice, :signed_up if is_navigational_format?
            sign_up(resource_name, resource)
            respond_with resource, :location => after_sign_up_path_for(resource)
          else
            set_flash_message :notice, :"signed_up_but_#{resource.inactive_message}" if is_navigational_format?
            expire_session_data_after_sign_in!
            respond_with resource, :location => after_inactive_sign_up_path_for(resource)
          end
        else
          clean_up_passwords resource
          respond_with resource
        end
      else
        clean_up_passwords original_resource
        respond_with original_resource
      end

    end
  end

  # PUT /resource
  # We need to use a copy of the resource because we don't want to change
  # the current user in place.
  def update
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

    if update_resource(resource, account_update_params)
      if is_navigational_format?
        flash_key = update_needs_confirmation?(resource, prev_unconfirmed_email) ?
          :update_needs_confirmation : :updated
        set_flash_message :notice, flash_key
      end
      sign_in resource_name, resource, :bypass => true
      respond_with resource, :location => after_update_path_for(resource)
    else
      clean_up_passwords resource
      respond_with resource
    end
  end

  def cancel_plan
    @user = current_user
    if @user.cancel_subscription
      redirect_to edit_user_registration_path, :notice => 'Cancelled plan.'
    else
      flash.alert = 'Unable to cancel plan.'
      render :edit
    end
  end

  def subscribe_plan
    params[:user][:plan] = params[:user][:plan].gsub(/\+donation/, "")

    @user = current_user
    @user.stripe_token = params[:user][:stripe_token]

    if @user.update_plan(params[:user][:plan])
      redirect_to edit_user_registration_path, :notice => 'Updated plan.'
    else
      flash.alert = 'Unable to update plan.'
      render :edit
    end

  end

  def update_plan
    @user = current_user
    role = Role.find(params[:user][:role_ids]) unless params[:user][:role_ids].nil?
    if @user.update_plan(role.name)
      redirect_to edit_user_registration_path, :notice => 'Updated plan.'
    else
      flash.alert = 'Unable to update plan.'
      render :edit
    end
  end

  def update_card
    @user = current_user
    @user.stripe_token = params[:user][:stripe_token]
    if @user.stripe_token.present? and @user.save
    #if @user.save
      redirect_to edit_user_registration_path, :notice => 'Updated card.'
    else
      flash.alert = 'Unable to update card.'
      render :edit
    end
  end

  def add_invitations
    @user = current_user
    @user.name = params[:user][:name]
    if @user.save
      @user.invite_users(params[:email_invitations].split(","))

      if resource.errors.empty?
        set_flash_message :notice, :send_instructions, :email => self.resource.email if self.resource.invitation_sent_at
        #respond_with resource, :location => after_invite_path_for(resource)
      else
        #respond_with_navigational(resource) { render :new }
      end    
      #respond_with resource, :location => after_invite_path_for(resource)
    else
      flash.alert = "Unable to update user name."
    end
  end

  def update_devices
    @user = current_user
    if @user.nil?
      email = params[:user][:email]
      @user = User.invite!( {:email => email, :skip_invitation => true} )
    end

    @user.device_ids = params[:user][:device_ids]
    if @user.save
      redirect_to content_device_confirmation_path
    else
      redirect_to content_device_confirmation_path
    end
  end

  def redeem_gift
    @gift_code = params["code"]
    @apply = params["apply"]
    
    unless @apply.nil?
      @gc = current_user.redeem_gift(@gift_code)
    else
      @gc = GiftCard.find_by(:code => @gift_code)
      if @gc.nil? or @gc.redeemed?
        flash.now.alert = "Gift code #{@gift_code} is invalid"
        render "home/giftcard"
      end
    end
  end

  def purchase_gift_edit
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    self.resource.sent_gift_cards.build
    self.resource.donations.build
  end

  def purchase_gift_update
    giftcard = current_user.sent_gift_cards.build(params[:user][:sent_gift_cards_attributes].first.second)
    current_user.save

    render "content/giftcard"
  end


  protected

  def subscription_create_params
    devise_parameter_sanitizer.sanitize(:subscription_create)
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up).push(:name, :stripe_token, :coupon, :child_age, :age_acknowledgement, :terms_acknowledgement, :donation_amt, :plan, :gift_code, :gift_receiver_name, :gift_receiver_email, :gift_message, sent_gift_cards_attributes: [:receiver_name, :sender_name, :receiver_email, :message, :value, :duration_in_months], donations_attributes: [:amount])
    devise_parameter_sanitizer.for(:account_update).push(:name, :child_age, :email, :mail_list_ids => [] )

    @plans = [ 
      ["red", "Monthly Subscription","$6"], 
      ["yellow", "Annual Membership", "$50"],
      ["yellow+donation", "Annual Membership + Donation", "$60"]
    ]
    @offer_gift = true

    @donation_amts = (0..95).step(5).to_a + (100..1000).step(50).to_a
  end

  def update_without_password
    self.resource = resource_class.to_adapter.get!(send(:"current_#{resource_name}").to_key)
    prev_unconfirmed_email = resource.unconfirmed_email if resource.respond_to?(:unconfirmed_email)

    if resource.update_without_password(account_update_params)
      if is_navigational_format?
        flash_key = update_needs_confirmation?(resource, prev_unconfirmed_email) ?
          :update_needs_confirmation : :updated
        set_flash_message :notice, flash_key
      end
      sign_in resource_name, resource, :bypass => true
      respond_with resource, :location => after_update_path_for(resource)
    else
      clean_up_passwords resource
      respond_with resource
    end
  end

  private

  def create_gift_card
    giftcard = GiftCard.new
    giftcard.value = params[:giftcard][:value]
    giftcard.sender = current_user
    giftcard.receiver_email = params[:giftcard][:receiver_email]
    receiver_user = User.find_by_email(giftcard.receiver_email)
    giftcard.receiver = receiver_user

    if giftcard.save
      UserMailer.gift_card_email(current_user).deliver
    else
      flash.alert = "Failed to create gift card."
    end
  end

  def build_resource(*args)
    super

    self.resource.donations.each do |x|
      unless x.amount.nil?
        x.user = self.resource
      end
    end

    self.resource.sent_gift_cards.each do |x|
      #unless x.receiver_name.nil?
        x.sender = self.resource
      #end
    end

    if params[:plan]
      self.resource.add_role(params[:plan])
    end

    if params[:plan] == 'giftcard_purchase'
      self.resource.age_acknowledgement = true
      self.resource.terms_acknowledgement = true
      self.resource.child_age = 0
    else
      self.resource.add_all_mail_lists
    end
  end
end
