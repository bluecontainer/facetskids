class CreateDonations < ActiveRecord::Migration
  def change
    create_table :donations do |t|
      t.decimal :amount
      t.references :user, index: true
      t.string :stripe_charge_id

      t.timestamps
    end
  end
end
