class RegistrationsController < Devise::RegistrationsController
  before_filter :configure_permitted_parameters

  def after_sign_up_path_for(resource)
    UserMailer.welcome_email(resource).deliver

    case current_user.roles.first.name
      when 'alpha'
        content_alpha_path
      when 'red'
        content_silver_path
      when 'silver'
        content_silver_path
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
      if @plan.nil?
        self.resource.plan = :alpha
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
    build_resource(sign_up_params)

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
      resource.plan = params[:plan]

      original_resource = resource;

      resource = resource_class.find_by(email: sign_up_params["email"])
      if !resource.nil? && resource.invited_to_sign_up?

        resource.assign_attributes(sign_up_params)
        resource.invitation_token = nil
        if params[:plan]
          resource.add_role(params[:plan])
        end
 
        if resource.save!
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

  def update_plan
    @user = current_user
    role = Role.find(params[:user][:role_ids]) unless params[:user][:role_ids].nil?
    if @user.update_plan(role)
      redirect_to edit_user_registration_path, :notice => 'Updated plan.'
    else
      flash.alert = 'Unable to update plan.'
      render :edit
    end
  end

  def update_card
    @user = current_user
    @user.stripe_token = params[:user][:stripe_token]
    if @user.save
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

    UserMailer.gift_card_email(current_user).deliver
    @user.device_ids = params[:user][:device_ids]
    if @user.save
      redirect_to content_device_confirmation_path
    else
      redirect_to content_device_confirmation_path
    end
  end

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

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up).push(:name, :stripe_token, :coupon, :child_age, :age_acknowledgement, :terms_acknowledgement, :donation_amt, :plan)
    devise_parameter_sanitizer.for(:account_update).push(:name, :child_age, :email, :mail_list_ids => [] )
  end


  private

  def build_resource(*args)
    super
    if params[:plan]
      resource.add_role(params[:plan])
    end
    resource.add_all_mail_lists
  end
end
