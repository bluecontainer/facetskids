class InviteRequest
  include ActiveModel::Model

  attr_accessor :email, :received_at

  validates :email, presence: true
end
