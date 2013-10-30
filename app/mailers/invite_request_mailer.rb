class InviteRequestMailer < ActionMailer::Base
  default :from => ENV["MAIL_FROM"]
  
  def new_inviterequest(inviterequest)
    @inviterequest = inviterequest
    mail(:to => ENV["INVITE_REQUEST_MAIL_TO"], :subject => "Facets Pioneers email submission")
  end
end
