class UserStripeEvent < ActiveRecord::Base
  belongs_to :user

  scope :charge, lambda { 
  	where(arel_table[:event_type].in(['charge.succeeded','charge.failed','charge.refunded'])) 
  }
  scope :invoice, lambda { 
    where(arel_table[:event_type].in(['invoice.created','invoice.updated','invoice.payment_failed','invoice.payment_succeeded'])) 
  }

  def other_object_events
  	UserStripeEvent.where(UserStripeEvent.arel_table[:event_object_id].eq(self.event_object_id).and(UserStripeEvent.arel_table[:id].not_eq(self.id)))
  end

end

