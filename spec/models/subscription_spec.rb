require 'spec_helper'

describe Subscription do
  before do 
    StripeMock.start
    @red_stripe_plan = Stripe::Plan.create(id: 'red', name: 'Red Plan', amount: 600, interval: 'month', trial_period_days: 1)
  end
  after {StripeMock.stop}
  before(:each) do
    @user = FactoryGirl.create(:user, email: "subscriber@example.com")
    @plan = FactoryGirl.create(:plan, name: "red")

    @attr = {
      :user => @user,
      :plan => @plan
    }
  end
 
  it "should create a new instance given valid attributes" do
    subscription = Subscription.create!(@attr)
    subscription.status.should eq("new")
  end

  it "should require a user" do
    no_user_subscription = Subscription.new(@attr.merge(:user => nil))
    no_user_subscription.should_not be_valid
  end

  it "should require a plan" do
    no_plan_subscription = Subscription.new(@attr.merge(:plan => nil))
    no_plan_subscription.should_not be_valid
  end

  it "should be added to users" do
    @user.stripe_token = {number: '4242424242424242', exp_month: 1, exp_year: 2015, cvc: 123}
    @user.add_role(@plan.name)
    @user.subscriptions << Subscription.new({:plan => @plan})
    @user.should be_valid
    @user.save.should be_true
    @user.subscriptions.length.should eq(1)

    user_found = User.find_by_email(@user.email)
    user_found.subscriptions.length.should eq(1)
    user_found.subscriptions.first.plan.name.should eq("red")
    user_found.subscriptions.active.length.should eq(0)
  end
end
