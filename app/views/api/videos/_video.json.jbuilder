json.(video, :id, :name, :description)
json.duration_in_sec video.duration_in_ms/1000
json.age_range video.viewing_age_list.first.to_s.split("_").first+"-"+video.viewing_age_list.last.to_s
#json.user_emotion_list video.emotions_from(current_user)
json.(video, :origin_country_code, :audio_language_code, :subtitle_language_code, :released_year)
json.audio_language video.audio_language_code.map{ |code| LanguageList::LanguageInfo.find(code).name } unless video.audio_language_code.nil?
json.subtitle_language video.subtitle_language_code.map{ |code| LanguageList::LanguageInfo.find(code).name } unless video.subtitle_language_code.nil?
json.origin_country video.origin_country_code.map{ |code| Country.find_country_by_alpha2(code).name } unless video.origin_country_code.nil?
json.video_url video.encoding.url(:hlsipad)
json.(video, :thumbnails)
json.supporing_roles video.supporting_roles do |role|
  json.role role.name
  json.person role.person.name
end
