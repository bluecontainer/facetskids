class AddDurationToPlan < ActiveRecord::Migration
  def change
    add_column :plans, :duration_in_months, :integer
    add_column :plans, :end_at, :timestamp
  end
end
