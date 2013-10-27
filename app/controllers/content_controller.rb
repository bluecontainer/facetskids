class ContentController < ApplicationController
  before_filter :authenticate_user!

  def alpha
    authorize! :view, :alpha, :message => 'Access limited to alpha subscribers.'
  end
  
  def silver
    authorize! :view, :silver, :message => 'Access limited to Silver Plan subscribers.'
  end
  
end
