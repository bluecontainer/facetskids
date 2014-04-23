class GiftCard < ActiveRecord::Base
  belongs_to :sender, :class_name => "User"
  belongs_to :receiver, :class_name => "User"
  after_initialize :defaults, unless: :persisted?

  validates_presence_of :receiver_email, :receiver_name, :sender, :value, :duration_in_months

  def defaults
    self.code = create_uniq_code_string
    self.paid = false
    self.redeemed = false
    self.coupon_created = false
  end

  def purchase
    charge_id = self.sender.charge(value.to_i * 100)
    if charge_id != false
      self.stripe_charge_id = charge_id
      self.paid = true
      save
    else
      false
    end
  end

  def redeem(receiver_user)
    return false unless paid?
    return false if redeemed?
 
    if receiver_user.has_stripe_subscription?
      coupon = create_coupon(receiver_user, self.duration_in_months)
      unless coupon.nil?
        self.stripe_coupon_id = coupon.id 
        self.redeemed = true
        self.redeemed_at = Time.now
        self.end_at = (redeemed_at.to_date >> self.duration_in_months)
        receiver_user.received_gift_cards << self
        save
      else
        false
      end
    else
      self.redeemed = true
      self.redeemed_at = Time.now
      self.end_at = (redeemed_at.to_date >> self.duration_in_months)
      receiver_user.received_gift_cards << self
      save
    end
  end

  def create_coupon_from_remainder
    if stripe_coupon_id.nil? and !receiver.nil? and redeemed
      days_spent = (Time.now.to_date - self.redeemed_at.to_date).to_i
      months_spent = (days_spent / 30)
      days_spent_remainder = (days_spent % 30)
      trial_end = (self.redeemed_at.to_date >> (months_spent + 1)).to_time.to_i
      coupon_duration_in_months = self.duration_in_months - (months_spent + 1)

      coupon = create_coupon(receiver, coupon_duration_in_months)
      unless coupon.nil?
        self.stripe_coupon_id = coupon.id 
        save

        {coupon_id: coupon.id, trial_end: trial_end}
      else
        false
      end
    else
      false
    end
  end
  
  private

  def create_coupon(receiver_user, duration_in_months)
    coupon = Stripe::Coupon.create(
      :percent_off => 100,
      :duration => 'repeating',
      :duration_in_months => duration_in_months,
      :max_redemptions => 1
    )
    unless coupon.nil? or receiver_user.customer_id.nil?
      stripe_customer = Stripe::Customer.retrieve(receiver_user.customer_id)
      stripe_customer.coupon = coupon.id
      stripe_customer.save
    end
    coupon
  end

  def create_uniq_code_string
    code_string = create_code_string
    while GiftCard.exists?(:code => code_string)
      code_string = create_code_string
    end

    code_string
  end

  def create_code_string
    code_string = String.new
    for i in 0..3
      code_string << create_code_digit
    end
    code_string << "-"
    for i in 0..3
      code_string << create_code_digit
    end
    code_string << "-"
    for i in 0..3
      code_string << create_code_digit
    end
 
    code_string
  end

  CODE_CONVERSION_MAP = ('A'..'Z').to_a + ('0'..'9').to_a
  def create_code_digit
    CODE_CONVERSION_MAP[rand(0..35)]
  end
end
