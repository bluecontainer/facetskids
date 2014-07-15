class Donation < ActiveRecord::Base
  belongs_to :user

  validates_presence_of :user, :amount

  before_save :charge_before_save

  def charge_before_save
    if self.stripe_charge_id.nil?
      charge_id = self.user.charge(amount.to_i * 100)
      if charge_id != false
        self.stripe_charge_id = charge_id
        true
      else
        errors.add :base, "Failed to charge donation"
        false
      end
    else
      true
    end
  end

  def paid?
    self.stripe_charge_id.present?
  end
end
