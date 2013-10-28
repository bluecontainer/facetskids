class AddDonationAmtToUsers < ActiveRecord::Migration
  def change
    add_column :users, :donation_amt, :integer
  end
end
