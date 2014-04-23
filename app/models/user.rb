class User < ActiveRecord::Base
  include TokenAuthenticatable

  rolify

  # Include default devise modules. Others available are:
  # :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :token_authenticatable,
         :invitable

  has_many :invitations, :class_name => self.to_s, :foreign_key => :invited_by_id
  belongs_to :invited_by, :class_name => self.to_s

  has_and_belongs_to_many :mail_lists, :join_table => :users_mail_lists
  has_and_belongs_to_many :devices, :join_table => :users_devices

  has_many :owned_videos, :class_name => :Video
  has_many :user_video_views
  has_many :viewed_videos, :source => :video, :through => :user_video_views

  has_many :subscriptions, -> { order('subscriptions.created_at ASC') }, dependent: :destroy
  has_many :user_stripe_events, dependent: :destroy
  has_many :donations, dependent: :destroy
  has_many :sent_gift_cards, -> { where paid: true }, class_name: :GiftCard, foreign_key: :sender_id 
  has_many :received_gift_cards, class_name: :GiftCard, foreign_key: :receiver_id

  acts_as_tagger
 
  validates_presence_of :age_acknowledgement
  validates_presence_of :terms_acknowledgement
  validates_presence_of :child_age, :unless => :is_admin?

  attr_accessor :stripe_token, :coupon, :plan, :trial_end

  before_save :update_stripe
  before_destroy :cancel_subscription

  scope :invitation_not_sent, lambda { where(arel_table[:invitation_token].not_eq(nil)).where(:invitation_sent_at => nil) }

  def is_admin?
    if !plan.nil? and plan == "admin"
      return true
    else
      return has_role? :admin
    end
  end

  def has_stripe_subscription?
    #return (has_role? :red or has_role? :yellow)

    if subscriptions.length > 0
      plan = subscriptions.last.plan
      unless plan.stripe_plan_id.nil?
        #subscriptions.last.status == "trialing" or subscriptions.last.status == "active"
        subscriptions.last.active?
      else
        false
      end
    else
      false
    end
  end

  def has_subscription?
    if subscriptions.length > 0
      plan = subscriptions.last.plan
      if plan.name == "alpha" and plan.name == "silver"
        subscriptions.last.current_period_end >= Time.now
      else
        #subscriptions.last.status == "trialing" or subscriptions.last.status == "active"
        subscriptions.last.active?
      end
    else
      false
    end
  end

  def has_credit_card?
    !customer_id.nil?
  end

  def has_gift_card?
    return received_gift_cards.last.end_at > Time.now if received_gift_cards.length > 0
    false
  end

  def active?
    return true if is_admin?

    if subscriptions.length > 0
      plan_name = subscriptions.last.plan.name
      if plan_name != "alpha" and plan_name != "silver"
        subscriptions.last.active?
      else
        subscriptions.last.current_period_end >= Time.now
      end
    else
      has_gift_card?
    end
  end

  def unpaid?
    if subscriptions.length > 0
      plan_name = subscriptions.last.plan.name
      if plan_name != "alpha" and plan_name != "silver"
        (subscriptions.last.status == "canceled" or subscriptions.last.status == "unpaid") and !subscriptions.last.cancel_at_period_end
      else
        false
      end
    end    
  end

  def canceled?
    if subscriptions.length > 0
      plan_name = subscriptions.last.plan.name
      if plan_name != "alpha" and plan_name != "silver"
        subscriptions.last.status == "canceled" and subscriptions.last.cancel_at_period_end
        #subscriptions.last.cancel_at_period_end.present?
      else
        false
      end
    end    
  end 

  def stripe_customer
    if !customer_id.nil? and @stripe_customer.nil?
      @stripe_customer = Stripe::Customer.retrieve(customer_id)
    end
    @stripe_customer
  end

  def stripe_customer=(customer)
    @stripe_customer = customer
  end

  def charge(amount)
    if amount > 0 and !stripe_customer.nil?
      charge = Stripe::Charge.create(
        :amount => amount,
        :currency => "usd",
        :customer => stripe_customer.id
      )
      charge.id
    else
      false
    end
  rescue Stripe::StripeError => e
    logger.error "Stripe Error: " + e.message
    logger.error "Failed to charge amount #{amount}c for user #{email}."
    #errors.add :base, "Unable to charge your card. #{e.message}."
    false
  end

  def donate(amount)
    charge_id = charge(amount)
    if charge_id != false
      self.donations << Donation.new(:amount => amount, :stripe_charge_id => charge_id)
      true
    else
      logger.error "Failed to charge a donation #{amount}c for user #{email}."
      false
    end
  end
 
  def update_plan(name)
    self.role_ids = []
    self.add_role(name)

    unless stripe_customer.nil?
      #unless subscription.stripe_subscription_id.nil?
      if has_stripe_subscription?
        stripe_customer.update_subscription(:plan => name, :prorate => false, :trial_end => "now")
        self.stripe_customer = nil
        subscription = self.subscriptions.last        
        unless subscription.nil? or subscription.status == "canceled" #or (subscription.stripe_subscription_id == stripe_customer.subscriptions.data[0].id)
          subscription.status = "changed"
          subscription.save
        end
      else
        stripe_customer.subscriptions.create(:plan => name)
        self.stripe_customer = nil

        subscription = self.subscriptions.last        
        unless subscription.nil? or subscription.status == "canceled" #or (subscription.stripe_subscription_id == stripe_customer.subscriptions.data[0].id)
          subscription.status = "changed"
          subscription.save
        end
      end
      save
    else
      if !stripe_token.present?
        raise "Stripe token not present. Can't create account."
      else
        subscription = subscriptions.last
        unless subscription.nil?
          subscription.status = "changed"
          subscription.save
        end

        if has_gift_card?
          #create coupon
          coupon_results = received_gift_cards.last.create_coupon_from_remainder
          unless coupon_results == false
            self.coupon = coupon_results[:coupon_id]
            self.trial_end = coupon_results[:trial_end]
          else
            raise "Cannot create subscription plan from gift card."
          end
        end 

        save
      end
    end
  rescue Stripe::StripeError => e
    logger.error "Stripe Error: " + e.message
    errors.add :base, "Unable to update your subscription. #{e.message}."
    false
  end
  
  def update_stripe
    return if email.include?(ENV['ADMIN_EMAIL'])
    #return if email.include?('@example.com') and not Rails.env.production?
    return if roles.empty? and !stripe_token.present?
    #return if roles.first.name == "alpha"

    unless roles.empty?
      stripe_required = (roles.first.name != "alpha")
      donation_required = (roles.first.name == "silver")
      stripe_plan = roles.first.name unless roles.first.name == "silver"
    else
      stripe_required = stripe_token.present?
    end
    
    if stripe_required and customer_id.nil?
      if !stripe_token.present?
        raise "Stripe token not present. Can't create account."
      else
        if stripe_plan.nil?
          self.stripe_customer = Stripe::Customer.create(
            :email => email,
            :description => name,
            :card => stripe_token
          )
        elsif !coupon.blank?
          self.stripe_customer = Stripe::Customer.create(
            :email => email,
            :description => name,
            :card => stripe_token,
            :plan => stripe_plan,
            :coupon => coupon,
            :trial_end => self.trial_end
          )
        else
          self.stripe_customer = Stripe::Customer.create(
            :email => email,
            :description => name,
            :card => stripe_token,
            :plan => stripe_plan
          )
        end
      end

      if donation_amt.present?
        if !donate(donation_amt * 100)
          raise "Donation could not be charged. Can't create account.'" if donation_required
        end
      else
        raise "Donation amount not present. Can't create account." if donation_required
      end 
    elsif !stripe_customer.nil?
      if stripe_token.present?
        stripe_customer.card = stripe_token
      end
      stripe_customer.email = email
      stripe_customer.description = name
      stripe_customer.save
    end

    unless stripe_customer.nil?
      card = stripe_customer.cards.data.first
      self.last_4_digits = card["last4"]
      self.card_exp_month = card.exp_month
      self.card_exp_year = card.exp_year
      self.customer_id = stripe_customer.id
      self.stripe_token = nil
    end

    unless roles.empty?
      subscription = subscriptions.last
      create_subscription = subscription.present? ? ((subscription.plan.name != roles.first.name) or (subscription.status == "canceled" or subscription.status == "unpaid")) : true
      if create_subscription
        plan = Plan.find_by_name(roles.first.name)
        if self.stripe_customer and self.stripe_customer.subscriptions.count >= 1
          stripe_subscription_id = self.stripe_customer.subscriptions.data.first.id
          status = self.stripe_customer.subscriptions.data.first.status
        else
          status = "active"
          current_period_end = plan.end_at
          current_period_end = Time.now.to_date >> plan.duration_in_months unless plan.duration_in_months.nil?
        end
        subscription = Subscription.new(
          {
            :plan => plan, 
            :stripe_subscription_id => stripe_subscription_id,
            :status => status,
            :current_period_end => current_period_end
          })
        self.subscriptions << subscription
      end
    end
    true

  rescue Stripe::StripeError => e
    logger.error "Stripe Error: " + e.message
    errors.add :base, "#{e.message}."
    self.stripe_token = nil
    false
  rescue Exception => e
    logger.error e.message
    self.stripe_token = nil
    false
  end
  
  def cancel_subscription
    unless customer_id.nil?
      unless stripe_customer.nil? or stripe_customer.respond_to?('deleted')
        if stripe_customer.subscriptions.data.length > 0 and (stripe_customer.subscriptions.data.first.status == 'active' or stripe_customer.subscriptions.data.first.status == 'trialing')
          stripe_customer.cancel_subscription(at_period_end: true)
          self.stripe_customer = nil
          #subscriptions.last.status = "user_canceled"
          subscriptions.last.cancel_at_period_end = true
          subscriptions.last.save
        end
      end
    end
  rescue Stripe::StripeError => e
    logger.error "Stripe Error: " + e.message
    errors.add :base, "Unable to cancel your subscription. #{e.message}."
    false
  end
  
  def expire
    self.role_ids = []
    UserMailer.expire_email(self).deliver
  end

  def find_by_email(email)
    where("email = ?", email)
  end

  def add_mail_list(mail_list_name)
    mail_list = MailList.find_or_create_by( :name => mail_list_name.to_s)

    if !mail_lists.include?(mail_list)
      self.mail_list_ids |= [mail_list.id]
    end
    mail_list
  end

  def add_device(device_name)
    device = Device.find_or_create_by( :name => device_name.to_s)

    if !devices.include?(device)
      self.device_ids |= [device.id]
    end
    device
  end

  def add_all_mail_lists
    MailList.all.each { |mail_list|
      if !mail_lists.include?(mail_list)
        self.mail_list_ids |= [mail_list.id]
      end
    }
  end

  def invite_users(invitation_emails)
    invitation_emails.each { |x| User.invite!( {:email => x, :skip_invitation => false}, self) }
  end
end
