class CreateDevices < ActiveRecord::Migration
  def change
    create_table :devices do |t|
      t.string :name
      t.string :description
      t.timestamps
    end

    create_table(:users_devices, :id => false) do |t|
      t.references :user
      t.references :device
    end

    add_index(:devices, :name)
    add_index(:users_devices, [ :user_id, :device_id ])
  end
end
