class User < ActiveRecord::Base
  rolify
  # Include default devise modules. Others available are:
  # :token_authenticatable, :confirmable,
  # :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable,
         :invitable

  has_many :invitations, :class_name => self.to_s, :as => :invited_by

  # Setup accessible (or protected) attributes for your model
  attr_accessible :name, :email, :password, :password_confirmation, :remember_me, :stripe_token, :coupon, :child_age, :age_acknowledgement, :terms_acknowledgement, :donation_amt
  attr_accessor :stripe_token, :coupon
  before_save :update_stripe
  before_destroy :cancel_subscription

  def update_plan(role)
    self.role_ids = []
    self.add_role(role.name)
    unless customer_id.nil?
      customer = Stripe::Customer.retrieve(customer_id)
      customer.update_subscription(:plan => role.name)
    end
    true
  rescue Stripe::StripeError => e
    logger.error "Stripe Error: " + e.message
    errors.add :base, "Unable to update your subscription. #{e.message}."
    false
  end
  
  def update_stripe
    return if email.include?(ENV['ADMIN_EMAIL'])
    return if email.include?('@example.com') and not Rails.env.production?
    return if roles.empty?
    return if roles.first.name == 'alpha'
    logger.debug roles.to_json
    if customer_id.nil?
      if !stripe_token.present?
        raise "Stripe token not present. Can't create account."
      end

      if coupon.blank?
        customer = Stripe::Customer.create(
          :email => email,
          :description => name,
          :card => stripe_token,
          :plan => roles.first.name
        )
      else
        customer = Stripe::Customer.create(
          :email => email,
          :description => name,
          :card => stripe_token,
          :plan => roles.first.name,
          :coupon => coupon
        )
      end
    else
      customer = Stripe::Customer.retrieve(customer_id)
      if stripe_token.present?
        customer.card = stripe_token
      end
      customer.email = email
      customer.description = name
      customer.save
    end

    self.last_4_digits = customer.cards.data.first["last4"]
    self.customer_id = customer.id
    self.stripe_token = nil

    plan = Stripe::Plan.retrieve(roles.first.name)
    unless plan.nil?
      donation_charge = (donation_amt * 100) - plan.amount
      if donation_charge > 0
        Stripe::Charge.create(
          :amount => donation_charge,
          :currency => "usd",
          :customer => customer_id
        )
      end  
    end

  rescue Stripe::StripeError => e
    logger.error "Stripe Error: " + e.message
    errors.add :base, "#{e.message}."
    self.stripe_token = nil
    false
  end
  
  def cancel_subscription
    unless customer_id.nil?
      customer = Stripe::Customer.retrieve(customer_id)
      unless customer.nil? or customer.respond_to?('deleted')
        if customer.subscription.status == 'active'
          customer.cancel_subscription
        end
      end
    end
  rescue Stripe::StripeError => e
    logger.error "Stripe Error: " + e.message
    errors.add :base, "Unable to cancel your subscription. #{e.message}."
    false
  end
  
  def expire
    UserMailer.expire_email(self).deliver
    destroy
  end

  def self.find_by_email(email)
    where("email = ?", email)
  end

end
