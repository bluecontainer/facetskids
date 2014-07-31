require "useragent" 

class SessionsController < Devise::SessionsController
 
  def new
    @user_agent = UserAgent.parse(request.user_agent)

    @redeem_view = false
    if session[:user_return_to] =~ /redeem/
      @redeem_view = true
      #logger.debug session[:user_return_to]
      #query = URI.parse(session[:user_return_to]).query
      #@giftcode = CGI.parse(query)["code"].first unless query.nil?
      @gift_code = session[:gift_code]
    elsif params["type"] == "redeem"
      @redeem_view = true
    end

    super
  end
 
  def create

    if request.xhr?
      logger.debug "create"
      resource = warden.authenticate!(:scope => resource_name, :recall => "sessions#failure")
      return sign_in_and_redirect(resource_name, resource)
    else
      super
    end
  end
  
  def sign_in_and_redirect(resource_or_scope, resource=nil)
    scope = Devise::Mapping.find_scope!(resource_or_scope)
    resource ||= resource_or_scope
    sign_in(scope, resource) unless warden.user(scope) == resource
    return render :json => {:success => true, :redirect => stored_location_for(scope) ||     
    after_sign_in_path_for(resource)}
  end
 
  def failure
    return render:json => {:success => false, :errors => ["Login failed."]}
  end
 
end
