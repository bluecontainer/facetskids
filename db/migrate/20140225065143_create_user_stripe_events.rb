class CreateUserStripeEvents < ActiveRecord::Migration
  def change
    create_table :user_stripe_events do |t|
      t.string :event_id, index: true
      t.string :event_type
      t.json :event_data
      t.references :user, index: true
      t.decimal :charge_amount
      t.string :charge_id
      t.string :plan

      t.timestamps
    end
  end
end
