class AddEndedAtToSubscriptions < ActiveRecord::Migration
  def change
    add_column :subscriptions, :ended_at, :datetime
  end
end
