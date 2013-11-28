module SessionsHelper
 
  def deny_access
    store_location
    redirect_to new_user_session_path
  end
 
  # add back anyone_signed_in? method after Oliver's comment @ 2011-03-12
  def anyone_signed_in?
    !current_user.nil?
  end
 
  private
 
    def store_location
      # store last url - this is needed for post-login redirect to whatever the user last visited.
      if (request.fullpath != "/users/sign_in" &&
        request.fullpath != "/users/sign_up" &&
        request.fullpath != "/users/password" &&
        !request.xhr?) # don't store ajax calls
          session[:previous_url] = request.fullpath
      end 
    end
 
    def clear_stored_location
      session[:return_to] = nil
    end
end
