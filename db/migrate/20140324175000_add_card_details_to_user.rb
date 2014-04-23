class AddCardDetailsToUser < ActiveRecord::Migration
  def change
    add_column :users, :card_exp_month, :integer
    add_column :users, :card_exp_year, :integer
  end
end
