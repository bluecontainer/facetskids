class CreateGiftCards < ActiveRecord::Migration
  def change
    create_table :gift_cards do |t|
      t.string :code, index: true, uniq: true
      t.decimal :value
      t.boolean :paid
      t.boolean :redeemed
      t.boolean :coupon_created
      t.references :sender, index: true
      t.references :receiver, index: true
      t.string :receiver_email
      t.string :receiver_name

      t.timestamps
    end
  end
end
