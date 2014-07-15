class AddMessageToGiftCard < ActiveRecord::Migration
  def change
    add_column :gift_cards, :message, :string
  end
end
