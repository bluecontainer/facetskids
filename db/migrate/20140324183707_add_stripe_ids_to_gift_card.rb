class AddStripeIdsToGiftCard < ActiveRecord::Migration
  def change
    add_column :gift_cards, :stripe_charge_id, :string
    add_column :gift_cards, :stripe_coupon_id, :string
  end
end
