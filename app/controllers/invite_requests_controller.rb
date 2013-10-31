class InviteRequestsController < ApplicationController
  def new
    @inviterequest = InviteRequest.new
  end

  def create
    @inviterequest = InviteRequest.new(params[:invite_request])
    @inviterequest.received_at = Time.now.utc
    if @inviterequest.valid?
      InviteRequestMailer.new_inviterequest(@inviterequest).deliver
      redirect_to unauthenticated_root_path, :notice => "Thank you so much for your interest in the Facets Kids streaming portal. We appreciate your pioneering spirit! We will notify you by email as soon as you can set up your free account."
    else
      render :new
    end
  end
end
