class InvitationsController < Devise::InvitationsController
  before_filter :configure_permitted_parameters, if: :devise_controller?

  def after_accept_path_for(resource)
    UserMailer.welcome_email(resource).deliver

    case current_user.roles.first.name
      when 'alpha'
        content_alpha_path
      when 'silver'
        content_silver_path
    end
  end


  # GET /resource/invitation/accept?invitation_token=abcdef
  def edit
    resource.invitation_token = params[:invitation_token]
    resource.plan = "alpha"
    render :edit
  end


  # PUT /resource/invitation
  def update
    logger.debug update_resource_params
    self.resource = resource_class.accept_invitation!(update_resource_params)
 
    if resource.errors.empty?
      resource.add_role(params[:plan])
      flash_message = resource.active_for_authentication? ? :updated : :updated_not_active                                                                                        
      set_flash_message :notice, flash_message
      sign_in(resource_name, resource)
      respond_with resource, :location => after_accept_path_for(resource)
    else
      #logger.debug resource.errors.to_json
      respond_with_navigational(resource){ render :edit }
    end
  end

  protected

  def configure_permitted_parameters
    #devise_parameter_sanitizer.for(:accept_invitation).push(:email, :name, :stripe_token, :coupon, :child_age, :age_acknowledgement, :terms_acknowledgement, :donation_amt)
    devise_parameter_sanitizer.for(:accept_invitation) do |u|
      u.permit(:password, :password_confirmation, :invitation_token, :plan, :email, :name, :stripe_token, :coupon, :child_age, :age_acknowledgement, :terms_acknowledgement, :donation_amt)
    end
  end

end
