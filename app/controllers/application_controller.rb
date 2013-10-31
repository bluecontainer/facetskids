class ApplicationController < ActionController::Base
  protect_from_forgery

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to authenticated_root_path, :alert => exception.message
  end

  prepend_before_filter :store_location

  def store_location
    # store last url - this is needed for post-login redirect to whatever the user last visited.
    if (request.fullpath != "/users/sign_in" &&
      request.fullpath != "/users/sign_up" &&
      request.fullpath != "/users/password" &&
      !request.xhr?) # don't store ajax calls
        session[:previous_url] = request.fullpath 
    end
  end

  def after_sign_in_path_for(resource)
    case current_user.roles.first.name
      when 'admin'
        users_path
      when 'alpha'
        edit_user_registration_path
      when 'silver'
        edit_user_registration_path
      else
        authenticated_root_path
    end
  end

  def after_invite_path_for(resource)
    authenticated_root_path
  end
end
