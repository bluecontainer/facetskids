require 'spec_helper'
require 'stripe_mock'

describe User do

  before(:each) do
    @attr = {
      :name => "Example User",
      :email => "user@example.com",
      :password => "changeme",
      :password_confirmation => "changeme",
      :age_acknowledgement => true,
      :terms_acknowledgement => true,
      :child_age => 10
    }
  end

  it "should create a new instance given a valid attribute" do
    User.create!(@attr)
  end

  it "should require an email address" do
    no_email_user = User.new(@attr.merge(:email => ""))
    no_email_user.should_not be_valid
  end

  it "should accept valid email addresses" do
    addresses = %w[user@foo.com THE_USER@foo.bar.org first.last@foo.jp]
    addresses.each do |address|
      valid_email_user = User.new(@attr.merge(:email => address))
      valid_email_user.should be_valid
    end
  end

  it "should reject invalid email addresses" do
    addresses = %w[user@foo,com user_at_foo.org example.user@foo.]
    addresses.each do |address|
      invalid_email_user = User.new(@attr.merge(:email => address))
      invalid_email_user.should_not be_valid
    end
  end

  it "should reject duplicate email addresses" do
    User.create!(@attr)
    user_with_duplicate_email = User.new(@attr)
    user_with_duplicate_email.should_not be_valid
  end

  it "should reject email addresses identical up to case" do
    upcased_email = @attr[:email].upcase
    User.create!(@attr.merge(:email => upcased_email))
    user_with_duplicate_email = User.new(@attr)
    user_with_duplicate_email.should_not be_valid
  end

  describe "passwords" do

    before(:each) do
      @user = User.new(@attr)
    end

    it "should have a password attribute" do
      @user.should respond_to(:password)
    end

    it "should have a password confirmation attribute" do
      @user.should respond_to(:password_confirmation)
    end
  end

  describe "password validations" do

    it "should require a password" do
      User.new(@attr.merge(:password => "", :password_confirmation => "")).
        should_not be_valid
    end

    it "should require a matching password confirmation" do
      User.new(@attr.merge(:password_confirmation => "invalid")).
        should_not be_valid
    end

    it "should reject short passwords" do
      short = "a" * 5
      hash = @attr.merge(:password => short, :password_confirmation => short)
      User.new(hash).should_not be_valid
    end

  end

  describe "password encryption" do

    before(:each) do
      @user = User.create!(@attr)
    end

    it "should have an encrypted password attribute" do
      @user.should respond_to(:encrypted_password)
    end

    it "should set the encrypted password attribute" do
      @user.encrypted_password.should_not be_blank
    end

  end

  describe "expire" do

    before(:each) do
      @user = User.create!(@attr)
    end

    it "sends an email to user" do
      @user.expire
      ActionMailer::Base.deliveries.last.to.should == [@user.email]
    end

  end

  describe "with stripe" do

    before do
      StripeMock.start 

      @card_token = StripeMock.generate_card_token(last4: "2244", exp_month: 9, exp_year: 2255)
      @card_token2 = StripeMock.generate_card_token(last4: "2255", exp_month: 12, exp_year: 2256)

      @red_stripe_plan = Stripe::Plan.create(id: 'red', name: 'Red Plan', amount: 600, interval: 'month', trial_period_days: 1)
      @yellow_stripe_plan = Stripe::Plan.create(id: 'yellow', name: 'Yellow Plan', amount: 5000, interval: 'year', trial_period_days: 1)

      @alpha_plan = Plan.create(name: 'alpha', end_at: (Time.now.to_date >> 1).to_time)
      @silver_plan = Plan.create(name: 'silver', duration_in_months: 12)
      @red_plan = Plan.create(name: 'red', amount: 6.00, interval: 'month', stripe_plan_id: @red_stripe_plan.id)
      @yellow_plan = Plan.create(name: 'yellow', amount: 50.00, interval: 'year', stripe_plan_id: @yellow_stripe_plan.id)

      @alpha_role = FactoryGirl.create(:role, name: "alpha")
      @silver_role = FactoryGirl.create(:role, name: "silver")
      @red_role = FactoryGirl.create(:role, name: "red")
      @yellow_role = FactoryGirl.create(:role, name: "yellow")
      Role.all.count.should == 4
    end

    after do 
      StripeMock.stop
    end

    describe "#update_plan" do
      before(:each) do
        @giftcard_attr = {
          :value => "50",
          :receiver_email => "giftcardreceiver@example.com",
          :receiver_name => "receiver name",
          :duration_in_months => 12
        }
      end

      it "updates a user from alpha to red" do
        @user = FactoryGirl.create(:user, email: "alpha@example.com")
        @user.add_role(@alpha_role.name)
        @user.save.should be_true
        @user.roles.first.name.should == @alpha_role.name
        @user.subscriptions.first.plan.name.should eq(@alpha_plan.name)

        new_user = User.last
        new_user.stripe_token = @card_token
        new_user.update_plan(@red_role.name).should be_true
        new_user.roles.first.name.should == @red_role.name
        new_user.roles.count.should == 1
        new_user.subscriptions.length.should eq(2)
        new_user.active?.should be_true
        new_user.subscriptions.active.length.should eq(1)
        new_user.subscriptions.first.status.should eq("changed")
        new_user.subscriptions.last.status.should eq("trialing")
        new_user.subscriptions.last.plan.name.should eq(@red_plan.name)
        stripe_invoice = Stripe::Invoice.upcoming(:customer => new_user.customer_id)
        stripe_invoice.amount_due.should eq(@red_stripe_plan.amount)
      end

      it "updates a user from silver to red" do
        @user = FactoryGirl.create(:user, email: "test@example.com", stripe_token: @card_token, donation_amt: 100)
        @user.add_role(@silver_role.name)
        @user.save.should be_true
        @user.roles.first.name.should == @silver_role.name
        @user.subscriptions.length.should == 1
        @user.subscriptions.active.length.should == 1

        new_user = User.last
        new_user.update_plan(@red_role.name).should be_true
        new_user.roles.first.name.should == @red_role.name
        new_user.roles.count.should == 1
        new_user.subscriptions.length.should == 2
        new_user.subscriptions.active.length.should == 1
        stripe_invoice = Stripe::Invoice.upcoming(:customer => new_user.customer_id)
        stripe_invoice.amount_due.should eq(@red_stripe_plan.amount)
      end

      it "updates a user from red to yellow" do
        #create user
        @user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10)
        @user.add_role(@red_role.name)
        @user.save.should be_true
        @user.subscriptions.length.should eq(1)
        @user.subscriptions.last.status.should eq("trialing")

        new_user = User.last
        new_user.update_plan(@yellow_role.name).should be_true 
        new_user.subscriptions.length.should == 2
        new_user.subscriptions.active.length.should == 1
        new_user.subscriptions.active.first.plan.name.should eq(@yellow_plan.name)
        new_user.subscriptions.first.status.should eq("changed")
        new_user.subscriptions.last.status.should eq("active")
        stripe_invoice = Stripe::Invoice.upcoming(:customer => new_user.customer_id)
        stripe_invoice.amount_due.should eq(@yellow_stripe_plan.amount)
      end

      it "updates a user from yellow to red" do
        @user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10)
        @user.add_role(@yellow_role.name)
        @user.save.should be_true
        @user.subscriptions.length.should == 1
        @user.active?.should be_true
        @user.subscriptions.last.status.should eq("trialing")
        stripe_invoice = Stripe::Invoice.upcoming(:customer => @user.customer_id)
        stripe_invoice.amount_due.should eq(@yellow_stripe_plan.amount)

        new_user = User.last
        new_user.update_plan(@red_role.name).should be_true 
        new_user.subscriptions.length.should == 2
        new_user.subscriptions.active.length.should == 1
        new_user.subscriptions.active.first.plan.name.should eq(@red_plan.name)
        new_user.subscriptions.first.status.should eq("changed")
        new_user.subscriptions.last.status.should eq("active")
        stripe_invoice = Stripe::Invoice.upcoming(:customer => new_user.customer_id)
        stripe_invoice.amount_due.should eq(@red_stripe_plan.amount)
      end

      it "updates a user from gift_sender to red" do
        user = FactoryGirl.create(:user, stripe_token: @card_token)
        user.should be_valid

        giftcard = GiftCard.new(@giftcard_attr.merge(:sender => user))
        giftcard.save.should be_true
        giftcard.purchase.should be_true

        new_user = User.last
        new_user.update_plan(@red_role.name).should be_true
        stripe_invoice = Stripe::Invoice.upcoming(:customer => new_user.customer_id)
        stripe_invoice.amount_due.should eq(@red_stripe_plan.amount)
      end

      it "updates a user from gift_receiver to red" do
        sender_user = FactoryGirl.create(:user, stripe_token: @card_token, email: "giftcardsender@example.com")
        sender_user.should be_valid
        giftcard = GiftCard.new(@giftcard_attr.merge(:sender => sender_user))
        giftcard.save.should be_true
        giftcard.purchase.should be_true

        #receiver_user = FactoryGirl.create(:user, stripe_token: @card_token)
        receiver_user = FactoryGirl.create(:user)
        receiver_user.should be_valid
        receiver_user.active?.should be_false
        giftcard.redeem(receiver_user)
        giftcard.redeemed?.should be_true
        receiver_user.active?.should be_true
        lambda {Stripe::Invoice.upcoming(:customer => receiver_user.customer_id)}.should raise_error

        User.all.length.should == 2

        saved_receiver_user = User.last
        saved_receiver_user.stripe_token = @card_token
        saved_receiver_user.update_plan(@red_role.name).should be_true
        saved_receiver_user.active?.should be_true

        stripe_invoice = Stripe::Invoice.upcoming(:customer => saved_receiver_user.customer_id)
        stripe_invoice.amount_due.should eq(0)
        Timecop.travel(saved_receiver_user.received_gift_cards.last.end_at)
        stripe_invoice = Stripe::Invoice.upcoming(:customer => saved_receiver_user.customer_id)
        stripe_invoice.amount_due.should eq(@red_stripe_plan.amount)
      end

    end

    describe ".update_stripe" do

      it "creates a new alpha user" do
        @user = User.new(email: "test@testign.com", stripe_token: nil, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 100)
        @role = FactoryGirl.create(:role, name: "alpha")
        @user.add_role(@role.name)
        @user.save!

        new_user = User.last
        new_user.has_role?(:alpha).should be_true
        new_user.donations.length.should eq(0)
        new_user.customer_id.should be_nil
        new_user.last_4_digits.should be_nil
        new_user.stripe_token.should be_nil
        new_user.has_stripe_subscription?.should be_false
      end

      it "creates a new silver user with a successful stripe response" do
        @user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10, donation_amt: 100)
        @user.add_role(@silver_role.name)
        @user.save.should be_true

        new_user = User.last
        new_user.has_role?(:silver).should be_true
        new_user.donations.length.should eq(1)
        new_user.customer_id.should_not be_nil        
        new_user.last_4_digits.should eq("2244")
        new_user.stripe_token.should be_nil
        new_user.has_stripe_subscription?.should be_false

        stripe_customer = Stripe::Customer.retrieve(new_user.customer_id)
        stripe_customer.subscriptions.count.should eq(0)

        lambda {Stripe::Invoice.upcoming(:customer => new_user.customer_id)}.should raise_error
      end

      it "creates a new silver user with an error stripe response" do
        StripeMock.prepare_card_error(:card_declined)

        @user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10, donation_amt: 100)
        @user.add_role(@silver_role.name)
        @user.save.should be_false

        User.last.should be_nil
      end

      it "an alpha user should expire at end of plan period" do
        user = FactoryGirl.create(:user, email: "alpha@example.com")
        user.add_role(@alpha_role.name)
        user.save.should be_true
        user.active?.should be_true

        Timecop.travel(@alpha_plan.end_at)
        user.active?.should be_false
      end

      it "a silver user should expire at end of paid year" do
        user = FactoryGirl.create(:user, email: "silver@example.com", stripe_token: @card_token, donation_amt: 100)
        user.add_role(@silver_role.name)
        user.save.should be_true
        user.active?.should be_true

        Timecop.travel((Time.now.to_date >> 12).to_time)
        user.active?.should be_false
      end

      it "creates a new red user with a successful stripe response and failed donation" do
        StripeMock.prepare_card_error(:card_declined)

        #create user
        @user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10, donation_amt: 100)
        @user.add_role(@red_role.name)
        @user.save.should be_true
        @user.donations.length.should eq(0)
        @user.has_stripe_subscription?.should be_true
        @user.active?.should be_true
      end

      it "creates a new red user with a successful stripe response and successful donation" do
        #create user
        @user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10, donation_amt: 100)
        @user.add_role(@red_role.name)
        @user.save.should be_true
        @user.donations.length.should eq(1)
        @user.has_stripe_subscription?.should be_true
        @user.active?.should be_true
      end
 
      it "creates a new red user with a successful stripe response" do
        #create user
        @user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10)
        @user.add_role(@red_role.name)
        @user.save.should be_true

        #get user and check attributes
        new_user = User.last
        new_user.has_role?(:red).should be_true
        new_user.customer_id.should_not be_nil
        new_user.last_4_digits.should eq("2244")
        new_user.stripe_token.should be_nil
        new_user.subscriptions.length.should eq(1)
        new_user.subscriptions.last.status.should eq("trialing")
        new_user.active?.should be_true

        stripe_customer = Stripe::Customer.retrieve(new_user.customer_id)
        stripe_customer.subscriptions.count.should eq(1)
        stripe_customer.subscriptions.data[0].plan.id.should eq("red")
       
        stripe_invoice = Stripe::Invoice.upcoming(:customer => new_user.customer_id)
        stripe_invoice.amount_due.should eq(@red_stripe_plan.amount)
        #Time.at(stripe_invoice.period_end).day.should eq((Time.now + 1).day)
        #Time.at(stripe_invoice.period_end).mon.should eq((Time.now + 1).mon)

        #event = StripeMock.mock_webhook_event('customer.created', {
        #  :id => @user.customer_id,
        #  :email => @user.email
        #})
        #StripeEventHandlers::CustomerUserEventHandler.new.call(event)
      end

      it "creates a new red user then change the credit card" do
        #create user
        @user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10)
        @user.add_role(@red_role.name)
        @user.save.should be_true

        #get user and check attributes
        new_user = User.last
        new_user.has_role?(:red).should be_true
        new_user.customer_id.should_not be_nil
        new_user.last_4_digits.should eq("2244")
        new_user.stripe_token.should be_nil
        new_user.subscriptions.length.should eq(1)
        new_user.subscriptions.last.status.should eq("trialing")
        new_user.active?.should be_true

        new_user.stripe_token = @card_token2
        new_user.save.should be_true
        new_user.last_4_digits.should eq("2255")
      end

      it "red user should be active after subscription trial ends event" do
        #create user
        @user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10)
        @user.add_role(@red_role.name)
        @user.save.should be_true
        @user.active?.should be_true

        event = StripeMock.mock_webhook_event('customer.subscription.updated', {
          :id => @user.subscriptions.last.stripe_subscription_id,
          :customer => @user.customer_id,
          :status => "active"
        })
        StripeEventHandlers::SubscriptionUserEventHandler.new.call(event)

        new_user = User.last
        new_user.subscriptions.length.should eq(1)
        new_user.subscriptions.active.length.should eq(1)
        new_user.subscriptions.active.first.plan.name.should eq("red")
        new_user.subscriptions.last.status.should eq("active")
        new_user.active?.should be_true
      end

      it "red user should be active after subscription past_due event" do
        #create user
        @user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10)
        @user.add_role(@red_role.name)
        @user.save.should be_true
        @user.active?.should be_true

        event = StripeMock.mock_webhook_event('customer.subscription.updated', {
          :id => @user.subscriptions.last.stripe_subscription_id,
          :customer => @user.customer_id,
          :status => "past_due"
        })
        StripeEventHandlers::SubscriptionUserEventHandler.new.call(event)

        new_user = User.last
        new_user.subscriptions.length.should eq(1)
        new_user.active?.should be_true
      end

      it "red user should not be active after subscription unpaid event" do
        #create user
        @user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10)
        @user.add_role(@red_role.name)
        @user.save.should be_true
        @user.active?.should be_true

        event = StripeMock.mock_webhook_event('customer.subscription.updated', {
          :id => @user.subscriptions.last.stripe_subscription_id,
          :customer => @user.customer_id,
          :status => "unpaid"
        })
        StripeEventHandlers::SubscriptionUserEventHandler.new.call(event)

        new_user = User.last
        new_user.subscriptions.length.should eq(1)
        new_user.subscriptions.active.length.should eq(0)
        new_user.subscriptions.last.status.should eq("unpaid")
        new_user.active?.should be_false
        new_user.unpaid?.should be_true
      end

      it "red user that is suspended should become active after subscription with new credit card" do
        #create user
        @user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10)
        @user.add_role(@red_role.name)
        @user.save.should be_true
        @user.active?.should be_true

        event = StripeMock.mock_webhook_event('customer.subscription.deleted', {
          :id => @user.subscriptions.last.stripe_subscription_id,
          :customer => @user.customer_id,
          :status => "canceled"
        })
        StripeEventHandlers::DeleteSubscriptionUserEventHandler.new.call(event)

        new_user = User.last
        new_user.subscriptions.length.should eq(1)
        new_user.subscriptions.active.length.should eq(0)
        #new_user.subscriptions.last.status.should eq("canceled")
        new_user.active?.should be_false
        new_user.unpaid?.should be_true

        #new_user.stripe_token = @card_token2
        new_user.add_role(@red_role.name)
        new_user.save.should be_true
        new_user.subscriptions.length.should eq(2)
        new_user.subscriptions.active.length.should eq(1)
        new_user.active?.should be_true
      end

      it "red user should not be active after subscription cancel event" do
        #create user
        @user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10)
        @user.add_role(@red_role.name)
        @user.save.should be_true
        @user.active?.should be_true

        event = StripeMock.mock_webhook_event('customer.subscription.updated', {
          :id => @user.subscriptions.last.stripe_subscription_id,
          :customer => @user.customer_id,
          :status => "active"
        })
        StripeEventHandlers::SubscriptionUserEventHandler.new.call(event)

        new_user = User.last
        new_user.subscriptions.length.should eq(1)
        new_user.subscriptions.active.length.should eq(1)
        new_user.subscriptions.active.first.plan.name.should eq("red")
        new_user.subscriptions.last.status.should eq("active")
        new_user.active?.should be_true

        event = StripeMock.mock_webhook_event('customer.subscription.updated', {
          :id => @user.subscriptions.last.stripe_subscription_id,
          :customer => @user.customer_id,
          :status => "canceled"
        })
        StripeEventHandlers::SubscriptionUserEventHandler.new.call(event)

        new_user = User.last
        new_user.subscriptions.length.should eq(1)
        new_user.active?.should be_false
        new_user.canceled?.should be_false
        new_user.unpaid?.should be_true
      end

      it "red user should not be active after subscription cancel request" do
        #create user
        user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10)
        user.add_role(@red_role.name)
        user.save.should be_true
        user.active?.should be_true

        new_user = User.last
        new_user.active?.should be_true
        new_user.cancel_subscription.should be_true
        new_user.active?.should be_true
        new_user.canceled?.should be_false
        new_user.subscriptions.last.status.should eq("trialing")
        new_user.subscriptions.last.cancel_at_period_end.should be_true

        #new_user.stripe_customer.subscriptions.data.first.current_period_end
        event = StripeMock.mock_webhook_event('customer.subscription.deleted', {
          :id => new_user.subscriptions.last.stripe_subscription_id,
          :customer => user.customer_id,
          :status => "canceled"
        })
        StripeEventHandlers::DeleteSubscriptionUserEventHandler.new.call(event)

        new_user = User.last
        new_user.active?.should be_false
        new_user.subscriptions.last.status.should eq("canceled")
        new_user.canceled?.should be_true
        new_user.unpaid?.should be_false

      end

      it "canceled red user should be active after subscription update" do
        #create user
        user = User.new(email: "test@testign.com", stripe_token: @card_token, name: 'tester', password: 'password', age_acknowledgement: true, terms_acknowledgement: true, child_age: 10)
        user.add_role(@red_role.name)
        user.save.should be_true
        user.active?.should be_true

        new_user = User.last
        new_user.active?.should be_true
        new_user.cancel_subscription.should be_true
        new_user.active?.should be_true
        new_user.subscriptions.last.status.should eq("trialing")
        new_user.subscriptions.last.cancel_at_period_end.should be_true

        #new_user.stripe_customer.subscriptions.data.first.current_period_end
        event = StripeMock.mock_webhook_event('customer.subscription.deleted', {
          :id => new_user.subscriptions.last.stripe_subscription_id,
          :customer => user.customer_id,
          :status => "canceled"
        })
        StripeEventHandlers::DeleteSubscriptionUserEventHandler.new.call(event)

        new_user = User.last
        new_user.active?.should be_false
        new_user.subscriptions.last.status.should eq("canceled")
        new_user.canceled?.should be_true
        new_user.update_plan(@red_role.name).should be_true
        new_user.save.should be_true
        new_user.canceled?.should be_false
        new_user.active?.should be_true
      end
    end

  end

end
