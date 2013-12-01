json.view_id @view.id
json.(@view, :current_marker_seconds, :duration_seconds, :video_id, :user_id)
json.video_duration_seconds @view.video.duration_in_ms/1000
