class HomeController < ApplicationController
  def index
    force_run_app(false)
  end
end
