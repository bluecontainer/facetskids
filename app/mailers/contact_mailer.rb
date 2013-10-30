class ContactMailer < ActionMailer::Base
  default :from => ENV["MAIL_FROM"]
  
  def new_contact(contact)
    @contact = contact
    mail(:to => ENV["CONTACT_MAIL_TO"], :subject => "FacetsKids - Message from Contact Page")
  end
end
