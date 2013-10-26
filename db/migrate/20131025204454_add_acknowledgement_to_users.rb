class AddAcknowledgementToUsers < ActiveRecord::Migration
  def change
    add_column :users, :age_acknowledgement, :boolean
    add_column :users, :terms_acknowledgement, :boolean
  end
end
