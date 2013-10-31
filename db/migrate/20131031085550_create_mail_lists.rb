class CreateMailLists < ActiveRecord::Migration
  def change
    create_table :mail_lists do |t|
      t.string :name
      t.string :description
      t.timestamps
    end

    create_table(:users_mail_lists, :id => false) do |t|
      t.references :user
      t.references :mail_list
    end

    add_index(:mail_lists, :name)
    add_index(:users_mail_lists, [ :user_id, :mail_list_id ])
  end

end
