require 'spec_helper'
require 'stripe_mock'

describe GiftCard do
  before { StripeMock.start }
  after { StripeMock.stop }

  before(:each) do
    #@card_token = StripeMock.generate_card_token(last4: "2244", exp_month: 33, exp_year: 2255)
    @card_token = {number: '4242424242424242', exp_month: 1, exp_year: 2015, cvc: 123}
    @red_stripe_plan = Stripe::Plan.create(id: 'red', name: 'Red Plan', amount: 600, interval: 'month')
    
    @red_role = FactoryGirl.create(:role, name: "red")
    @red_plan = FactoryGirl.create(:plan, name: "red", amount: 6.00, interval: 'month', stripe_plan_id: @red_stripe_plan.id)
    @alpha_role = FactoryGirl.create(:role, name: "alpha")
    @alpha_plan = FactoryGirl.create(:plan, name: "alpha", duration_in_months: 1)
    @silver_role = FactoryGirl.create(:role, name: "silver")
    @silver_plan = FactoryGirl.create(:plan, name: "silver", duration_in_months: 12)

    @red_sender = FactoryGirl.build(:user, email: "giftcardsenderred@example.com", stripe_token: @card_token)
    @red_sender.add_role(@red_role.name)
    @red_sender.save!

    @sender = FactoryGirl.build(:user, email: "giftcardsender@example.com", stripe_token: @card_token)
    @sender.save!

    @attr = {
      :value => "50",
      :sender => @red_sender,
      :receiver_email => "giftcardreceiver@example.com",
      :receiver_name => "receiver name",
      :duration_in_months => 12
    }
  end
 
  after(:each) do
    stripe_customer = Stripe::Customer.retrieve(@red_sender.customer_id)
    stripe_customer.delete
  end
       
  it "should create a new instance given valid attributes" do
    GiftCard.create!(@attr)
  end

  it "should require a receiver email address" do
    no_email_giftcard = GiftCard.new(@attr.merge(:receiver_email => ""))
    no_email_giftcard.should_not be_valid
  end

  it "should require a sender user" do
    no_sender_giftcard = GiftCard.new(@attr.merge(:sender => nil))
    no_sender_giftcard.should_not be_valid
  end

  it "should require a value" do
    no_value_giftcard = GiftCard.new(@attr.merge(:value => nil))
    no_value_giftcard.should_not be_valid
  end

  it "should require a duration" do
    no_duration_giftcard = GiftCard.new(@attr.merge(:duration_in_months => nil))
    no_duration_giftcard.should_not be_valid
  end

  describe "purchases" do

    before(:each) do
      @giftcard = GiftCard.new(@attr)
      @giftcard.save!

      @red_receiver = FactoryGirl.build(:user, email: "giftcardreceiverred@example.com", stripe_token: @card_token)
      @red_receiver.add_role(@red_role.name)
      @red_receiver.save!

      @red_receiver2 = FactoryGirl.build(:user, email: "giftcardreceiverred2@example.com", stripe_token: @card_token)
      @red_receiver2.add_role(@red_role.name)
      @red_receiver2.save!

      @alpha_receiver = FactoryGirl.build(:user, email: "giftcardreceiveralpha@example.com")
      @alpha_receiver.add_role(:alpha)
      @alpha_receiver.save!

      @silver_receiver = FactoryGirl.build(:user, email: "giftcardreceiversilver@example.com", stripe_token: @card_token, donation_amt: 100)
      @silver_receiver.add_role(@silver_role.name)
      @silver_receiver.save!

      @noplan_receiver = FactoryGirl.create(:user, email: "giftcardreceivernoplan@example.com")
    end

    after(:each) do
      stripe_customer = Stripe::Customer.retrieve(@red_receiver.customer_id)
      stripe_customer.delete

      stripe_customer = Stripe::Customer.retrieve(@red_receiver2.customer_id)
      stripe_customer.delete
    end

    it "should be paid if charge is successful" do
      @giftcard.purchase.should be_true
      @giftcard.paid.should be_true
      @giftcard.stripe_charge_id.should_not be_nil
      @red_sender.sent_gift_cards.length.should eq(1)      
    end

    it "should not be paid if charge fails" do
      StripeMock.prepare_card_error(:card_declined)
      @giftcard.purchase.should be_false
      @giftcard.paid.should be_false
      @giftcard.stripe_charge_id.should be_nil
      @red_sender.sent_gift_cards.length.should eq(0)      
    end

    it "should be redeemed if not already redeemed" do
      stripe_invoice = Stripe::Invoice.upcoming(:customer => @red_receiver.customer_id)
      stripe_invoice.amount_due.should eq(@red_plan.amount * 100)

      @giftcard.purchase.should be_true

      @giftcard.redeemed.should be_false
      @giftcard.redeem(@red_receiver).should be_true
    end

    it "should not be redeemed if already redeemed" do
      stripe_invoice = Stripe::Invoice.upcoming(:customer => @red_receiver2.customer_id)
      stripe_invoice.amount_due.should eq(@red_plan.amount * 100)

      @giftcard.purchase.should be_true
      @giftcard.redeem(@red_receiver).should be_true

      @giftcard.redeem(@red_receiver2).should be_false
      @red_receiver2.received_gift_cards.length.should be(0)
      @giftcard.redeemed.should be_true
      @giftcard.stripe_coupon_id.should_not be_nil

      stripe_invoice = Stripe::Invoice.upcoming(:customer => @red_receiver2.customer_id)
      stripe_invoice.amount_due.should eq(@red_plan.amount * 100)
    end

    it "should be redeemed locally for alpha user" do
      @giftcard.purchase.should be_true
      @alpha_receiver.active?.should be_true
      @giftcard.redeem(@alpha_receiver).should be_true
      @alpha_receiver.active?.should be_true
      Timecop.travel(@alpha_receiver.received_gift_cards.last.end_at)
      @alpha_receiver.active?.should be_false
    end

    it "should be redeemed locally for silver user" do
      @giftcard.purchase.should be_true
      @silver_receiver.active?.should be_true
      @giftcard.redeem(@silver_receiver).should be_true
      @silver_receiver.active?.should be_true
      Timecop.travel(@silver_receiver.received_gift_cards.last.end_at)
      @silver_receiver.active?.should be_false
    end

    it "should be redeemed locally for no plan user" do
      @giftcard.purchase.should be_true
      @noplan_receiver.active?.should be_false
      @giftcard.redeem(@noplan_receiver).should be_true
      @noplan_receiver.active?.should be_true
      Timecop.travel(@noplan_receiver.received_gift_cards.last.end_at)
      @noplan_receiver.active?.should be_false
    end 

    it "should be redeemed by coupon for a red user" do
      stripe_invoice = Stripe::Invoice.upcoming(:customer => @red_receiver.customer_id)
      stripe_invoice.amount_due.should eq(@red_plan.amount * 100)

      @giftcard.purchase.should be_true

      @giftcard.redeemed.should be_false
      @giftcard.redeem(@red_receiver).should be_true
      @giftcard.stripe_coupon_id.should_not be_nil
      @giftcard.redeemed.should be_true
      @giftcard.stripe_coupon_id.should_not be_nil

      @red_receiver.received_gift_cards.length.should be(1)

      stripe_invoice = Stripe::Invoice.upcoming(:customer => @red_receiver.customer_id)
      stripe_invoice.amount_due.should eq(0)

      Timecop.travel(@red_receiver.received_gift_cards.last.end_at)
      stripe_invoice = Stripe::Invoice.upcoming(:customer => @red_receiver.customer_id)
      stripe_invoice.amount_due.should eq(@red_plan.amount * 100)
    end

    it "should be redeemed by coupon for a lapsed red user" do
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

      @giftcard.purchase.should be_true
      @giftcard.redeemed.should be_false
      @giftcard.redeem(new_user).should be_true
      @giftcard.stripe_coupon_id.should be_nil
      @giftcard.redeemed.should be_true
      new_user.has_subscription?.should be_false
    end

  end 

end
