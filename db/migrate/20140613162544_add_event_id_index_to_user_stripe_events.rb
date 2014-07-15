class AddEventIdIndexToUserStripeEvents < ActiveRecord::Migration
  def change
    add_index :user_stripe_events, :event_id
  end
end
