class AddRedeemFieldToGiftCard < ActiveRecord::Migration
  def change
    add_column :gift_cards, :redeemed_at, :datetime
    add_column :gift_cards, :end_at, :datetime
  end
end
