class AppController < ApplicationController
  #before_filter :authenticate_user!

  def index
    logger.debug request.user_agent
    force_run_app(params[:force])
    client_check(params[:check])

    if can_run_app? 
      authenticate_user!
    else
      if can_install_app?
        #supported platform
        #show installation instructions
        @type = "install"
        render :installation
      else
        #error unsupported platform
        @user = current_user
        if @user.nil?
          @user = User.new
        end
        @type = "unsupported"
        render :unsupported
      end
    end
  end

  def client_platform_version
    return UserAgent.parse(request.user_agent).version.to_s.match(/^\D*(\d)/).captures.first.to_i
  end

  def inline_svg(file)
    file = File.open("app/assets/images/#{file}", "rb")
    file.read
  end

  helper_method :client_platform_version, :inline_svg
end
