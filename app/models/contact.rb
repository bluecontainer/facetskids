class Contact
  include ActiveModel::Model

  attr_accessor :name, :email, :message, :received_at

  validates :name, presence: true
  validates :email, presence: true
  validates :message, presence: true, length: { maximum: 300 }
end
