class AddChildAgeToUsers < ActiveRecord::Migration
  def change
    add_column :users, :child_age, :integer
  end
end
