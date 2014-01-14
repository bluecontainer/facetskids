class UserMailer < ActionMailer::Base
  default :from => ENV["MAIL_FROM"]
  
  def expire_email(user)
    mail(:to => user.email, :subject => "Subscription Cancelled")
  end

  def welcome_email(user)
    @user = user
    @banner_image_type = "app"
    @header_copy = "Adding Facets Kids to your iPad"
    @body_copy = '<b>Facets Kids</b> is the best place to discover fun, exciting, and safe independent films for kids of all ages. Now that you have activated your account, you are almost ready to start streaming films from your iPad.<br/><br/>To start exploring, <b>open this email on your iPad and <a href="' + app_url + '">click here</a></b>. This will allow you to add the Facets Kids app to your home screen.'
    @button_text = "Install Facets Kids"
    @button_link = app_url
    @include_ipad_question = true    
    mail(:to => user.email, :subject => "Getting Started with Facets Kids")
  end

  def image_url(source)
    URI.join(unauthenticated_root_url, image_path(source))
  end
  helper_method :image_url
end
