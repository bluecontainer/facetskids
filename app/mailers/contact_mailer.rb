class ContactMailer < ActionMailer::Base
  default :from => ENV["MAIL_SENDER"]
  
  def new_contact(contact)
    @contact = contact
    mail(:to => ENV["MAIL_SENDER"], :subject => "FacetsKids - Message from Contact Page")
  end
end
