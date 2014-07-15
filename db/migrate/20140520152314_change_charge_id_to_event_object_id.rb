class ChangeChargeIdToEventObjectId < ActiveRecord::Migration
  def change
    rename_column :user_stripe_events, :charge_id, :event_object_id
  end
end
