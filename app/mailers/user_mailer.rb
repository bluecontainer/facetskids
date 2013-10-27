class UserMailer < ActionMailer::Base
  default :from => ENV["MAIL_SENDER"]
  
  def expire_email(user)
    mail(:to => user.email, :subject => "Subscription Cancelled")
  end
end
