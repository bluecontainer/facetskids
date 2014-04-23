class AddDurationToGiftCard < ActiveRecord::Migration
  def change
    add_column :gift_cards, :duration_in_months, :integer
  end
end
