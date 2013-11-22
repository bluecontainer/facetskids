class CreateUserVideoViews < ActiveRecord::Migration
  def change
    create_table :user_video_views do |t|
      t.references :user, index: true
      t.references :video, index: true
      t.integer :duration_seconds
      t.integer :current_marker_seconds

      t.timestamps
    end
  end
end
