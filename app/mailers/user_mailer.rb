class UserMailer < ActionMailer::Base
  default :from => ENV["MAIL_FROM"]
  
  def expire_email(user)
    mail(:to => user.email, :subject => "Subscription Cancelled")
  end
end
