class CreateVideos < ActiveRecord::Migration
  def change
    create_table :videos do |t|
      t.references :user

      t.string :name
      t.text :description

      t.string :state

      t.attachment :encoding
      t.attachment :preview

      t.string :encoding_input_url
      t.integer :screen_cap_time_code, array: true

      t.integer :duration_in_ms
      t.json :zencoder_input_response

      t.string :origin_country_code, array: true
      t.string :audio_language_code, array: true
      t.string :subtitle_language_code, array: true
      
      t.integer :released_year

      t.timestamps
    end

    add_index :videos, :user_id
  end
end
