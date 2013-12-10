json.(@video, :id)
json.user_emotion_list @video.emotions_from(current_user)
json.user_rating @video.ratings_from(current_user).first
