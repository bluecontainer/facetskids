class RegistrationsController < Devise::RegistrationsController
  before_filter :configure_permitted_parameters

  def new
    @plan = params[:plan]
    if (@plan.nil?) || (@plan && ENV["ROLES"].include?(@plan) && @plan != "admin")
      super
    else
      redirect_to unauthenticated_root_path, :notice => 'Please select a subscription plan below.'
    end
  end

      def clear_invitation
        self.invitation_token = nil
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
      logger.debug resource.to_json
      logger.debug resource.errors.to_json

      original_resource = resource;
      resource = resource_class.find_by(email: sign_up_params["email"])
      if !resource.nil? && resource.invited_to_sign_up?

        logger.debug resource.to_json
        logger.debug "invited_to_sign_up? = #{resource.invited_to_sign_up?}"

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

  protected

  def configure_permitted_parameters
    devise_parameter_sanitizer.for(:sign_up).push(:name, :stripe_token, :coupon, :child_age, :age_acknowledgement, :terms_acknowledgement, :donation_amt)
  end

  private
  def build_resource(*args)
    super
    if params[:plan]
      resource.add_role(params[:plan])
    end
  end
end
