class AppController < ApplicationController
  #before_filter :authenticate_user!

  def index
    force_run_app(params[:force])

    if can_run_app? 
      authenticate_user!
    else
      if can_install_app?
        #show installation instructions
        render :installation
      else
        #show supported platform information
        redirect_to :unauthenticated_root
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
