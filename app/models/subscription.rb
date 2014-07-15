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
    if plan.name == "alpha" or plan.name == "silver"
      current_period_end > Time.now
    else
      status == 'active' or status == 'trialing' or status == 'past_due'
    end
  end

  def past_due?
    status == "past_due"
  end

  def cancel_requested?
    active? and cancel_at_period_end
  end

  def canceled?
    #status == "unpaid" or status == "canceled"
    plan_name = plan.name
    if plan_name != "alpha" and plan_name != "silver"
      status == "canceled" and cancel_at_period_end
      #subscriptions.last.cancel_at_period_end.present?
    else
      false
    end
  end

  def unpaid?
    plan_name = plan.name
    if plan_name != "alpha" and plan_name != "silver"
      (status == "canceled" or status == "unpaid") and !cancel_at_period_end
    else
      false
    end
  end

end
