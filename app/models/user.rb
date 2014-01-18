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

  acts_as_tagger
 
  validates_presence_of :age_acknowledgement
  validates_presence_of :terms_acknowledgement
  validates_presence_of :child_age, :unless => :is_admin?

  attr_accessor :stripe_token, :coupon, :plan

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

  def has_credit_card?
    !customer_id.nil?
  end

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
    return if roles.first.name == "alpha"

    if customer_id.nil?
      if !stripe_token.present?
        raise "Stripe token not present. Can't create account."
      end

      if roles.first.name == "silver"
        if donation_amt.present?
          customer = Stripe::Customer.create(
            :email => email,
            :description => name,
            :card => stripe_token
          )

          donation_charge = donation_amt * 100
          if donation_charge > 0
            Stripe::Charge.create(
              :amount => donation_charge,
              :currency => "usd",
              :customer => customer.id
            )  
          end
        else
          raise "Donation amount not present. Can't create account."
        end 
      else
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
        if !customer.subscription.nil? and customer.subscription.status == 'active'
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
