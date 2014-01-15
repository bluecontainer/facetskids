class ApplicationController < ActionController::Base
  prepend_before_filter :store_location
  protect_from_forgery

  include SessionsHelper

  rescue_from CanCan::AccessDenied do |exception|
    redirect_to authenticated_root_path, :alert => exception.message
  end

  def initialize
    @force = false
    @client_check = false
    super
  end

  def after_sign_in_path_for(resource)
    default_path = authenticated_root_path
    default_path = app_path if in_app?
    
    (session[:user_return_to].nil?) ? default_path : session[:user_return_to].to_s

    #case current_user.roles.first.name
    #  when 'admin'
    #    users_path
    #  when 'alpha'
    #    edit_user_registration_path
    #  when 'silver'
    #    edit_user_registration_path
    #  else
    #    authenticated_root_path
    #end
  end

  def after_sign_out_path_for(resource)
    if in_app?
      new_user_session_path
    else
      unauthenticated_root_path
    end    
  end

  def after_resetting_password_path_for(resource)
    edit_user_registration_path
  end

  def after_invite_path_for(resource)
    authenticated_root_path
  end

  def can_install_app?
    @user_agent = UserAgent.parse(request.user_agent)
    #check if an iPad
    if @user_agent.platform == "iPad"
      return false if @user_agent.product.map{|product| product.first.product}.include?("CriOS")
      return false if @user_agent.product.map{|product| product.first.product}.include?("Opera Mini")
      return true
    else
      return false
    end
  end

  def force_run_app(force)
    @force = force
  end

  def client_check(check)
   @client_check = check
  end

  def can_run_app?
    return true if @force
    @user_agent = UserAgent.parse(request.user_agent)
    #check if an iPad
    if @user_agent.platform == "iPad"
      #check if Safari or standalone
      if @user_agent.product.map{|product| product.first.product}.include?("Safari")
        return true if @user_agent.product.map{|product| product.first.product}.include?("Coast")
        return false
      else
        return true if @client_check or params['check']
        return false
      end
    else
      return false
    end  
  end

  def in_app?
    return can_run_app?
  end

  helper_method :in_app?
end
