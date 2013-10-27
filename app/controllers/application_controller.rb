class ApplicationController < ActionController::Base
  protect_from_forgery

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to authenticated_root_path, :alert => exception.message
  end

  def after_sign_in_path_for(resource)
    case current_user.roles.first.name
      when 'admin'
        users_path
      when 'alpha'
        content_alpha_path
      when 'silver'
        content_silver_path
      else
        authenticated_root_path
    end
  end
  
end
