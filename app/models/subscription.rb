class Subscription < ActiveRecord::Base
  belongs_to :user
  belongs_to :plan

  after_initialize :defaults, unless: :persisted?

  validates_presence_of :user, :plan

  def defaults
    #self.status = "new"
  end

  #scope :active, -> { where status: 'active' or status: 'trialing ' }
  scope :active, lambda { where(arel_table[:status].eq('active').or(arel_table[:status].eq('trialing'))) }

  def active?
  	status == 'active' or status == 'trialing' or status == 'past_due'
  end
end
