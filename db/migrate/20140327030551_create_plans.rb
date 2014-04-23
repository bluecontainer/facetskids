class CreatePlans < ActiveRecord::Migration
  def change
    create_table :plans do |t|
      t.string :name
      t.decimal :amount
      t.string :interval
      t.integer :trial_period_days
      t.string :stripe_plan_id

      t.timestamps
    end
  end
end
