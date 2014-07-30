require 'aws/s3'
require 'RMagick'
require 'open-uri'

def resize(video, regenerate)
  include AWS::S3
  include Magick

  AWS::S3::Base.establish_connection!(:access_key_id => ENV['AWS_ACCESS_KEY_ID'], :secret_access_key => ENV['AWS_SECRET_ACCESS_KEY'])
  orig_thumbnail = video.thumbnails.first

  puts "Processing video: #{video.name}, Thumbnail: #{orig_thumbnail}"

  new_thumbnail_name = "#{URI::encode(video.name)}_200x200."+orig_thumbnail.split('.').last

  if !regenerate && S3Object.exists?(new_thumbnail_name, 'facets_thumbnails') then
    puts "\t Video already exists in S3"
  else

    big_thumbnail = ImageList.new(orig_thumbnail).first
    big_thumbnail.resize_to_fill!(206,155)

    puts "\t Resized"

    puts "\t Uploading to S3 (#{new_thumbnail_name})"

    S3Object.store(new_thumbnail_name, big_thumbnail.to_blob, 'facets_thumbnails',:access => :public_read)

    new_thumbnail_url = S3Object.url_for(new_thumbnail_name,'facets_thumbnails',:authenticated => false)

    puts "\t Uploaded to S3, url: #{new_thumbnail_url}"
  end
end

namespace :thumbnail_resize do
  task :all, [:regenerate] => :environment do |regenerate|
    Video.all.each do |video|
      unless defined? regenerate then
        regenerate = false
      end
      resize video, regenerate
    end
  end

  task :fix_array => :environment do
    Video.all.each do |video|
      retina = video.thumbnails.first
      normal = video.thumbnails.last
      video.thumbnails.delete_all
      video.thumbnails.append retina
      video.thumbnails.append normal
      video.save
    end
  end

end