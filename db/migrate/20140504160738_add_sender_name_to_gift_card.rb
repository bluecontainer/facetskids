class AddSenderNameToGiftCard < ActiveRecord::Migration
  def change
    add_column :gift_cards, :sender_name, :string
  end
end
