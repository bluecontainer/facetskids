require 'spec_helper'

describe "PasswordResets" do

  it "emails user when requesting password reset" do
    user = FactoryGirl.create(:user)
    visit new_user_session_path
    click_link "Forgot your password?"
    fill_in "user_email", :with => user.email
    click_button "Send me reset password instructions"
    page.should have_content("You will receive an email with instructions about how to reset your password in a few minutes.")
    ActionMailer::Base.deliveries.last.to.should include(user.email)
  end

  it "does not email invalid user when requesting password reset" do
    visit new_user_session_path
    click_link "Forgot your password?"
    fill_in "user_email", :with => "bademail@example.com"
    click_button "Send me reset password instructions"
    page.should have_content("Email not found")
    ActionMailer::Base.deliveries.last.should be_nil
  end

end
