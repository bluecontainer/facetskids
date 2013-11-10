class CreateJobs < ActiveRecord::Migration
  def change
    create_table :jobs do |t|
      t.references :video

      t.integer :zencoder_id
      t.string :state
      t.json :zencoder_response
      t.json :zencoder_request

      t.timestamps
    end

    add_index :jobs, :video_id
    add_index :jobs, :zencoder_id
  end
end
