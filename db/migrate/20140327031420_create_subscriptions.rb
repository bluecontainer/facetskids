class CreateSubscriptions < ActiveRecord::Migration
  def change
    create_table :subscriptions do |t|
      t.references :user, index: true
      t.references :plan, index: true
      t.string :status
      t.boolean :cancel_at_period_end
      t.timestamp :canceled_at
      t.timestamp :trial_start
      t.timestamp :trial_end
      t.timestamp :current_period_start
      t.timestamp :current_period_end
      t.string :stripe_subscription_id

      t.timestamps
    end
  end
end
