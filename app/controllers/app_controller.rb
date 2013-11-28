class AppController < ApplicationController
  #before_filter :authenticate_user!

  def index
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

end
