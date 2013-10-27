require 'spec_helper'

describe ContentController do

  before (:each) do
    @user = FactoryGirl.create(:user)
    sign_in @user
    @user.add_role :silver # gives the user a role. tests pass regardless of role
  end

  describe "GET 'alpha'" do
    it "returns http success" do
      get 'alpha'
      response.should @user.has_role?(:alpha) ? be_success : redirect_to(authenticated_root_url)
    end
  end

  describe "GET 'silver'" do
    it "returns http success" do
      get 'silver'
      response.should @user.has_role?(:silver) ? be_success : redirect_to(authenticated_root_url)
    end
  end

end
