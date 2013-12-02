json.(video, :id, :name, :description)
json.duration_in_sec video.duration_in_ms/1000
#json.(video, :emotion_list, :viewing_age_list)
#json.user_emotion_list video.emotions_from(current_user)
json.(video, :origin_country_code, :audio_language_code, :subtitle_language_code)
json.video_url video.encoding.url(:hlsipad)
json.(video, :thumbnails)
