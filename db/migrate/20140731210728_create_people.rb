class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.string :name
      t.integer :age

      t.timestamps
    end

    create_table :supporting_roles do |t|
      t.belongs_to :person
      t.belongs_to :video
      t.belongs_to :supporting_role_type
    end

    create_table :supporting_role_types do |t|
      t.string :name
    end
  end
end
