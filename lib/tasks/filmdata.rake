require 'net/ftp'
require 'net/http'

def http_remote_size(connection, uri)
  #puts uri
  response = connection.request_head(uri.path)
  return response['content-length'].to_i
end

def remote_size(connection, path)
  if connection.is_a? Net::FTP
    begin
      return connection.size(path)
    rescue Exception
      return 0
    end
  else
    if connection.is_a? Fog::Storage::AWS::Real
      bucket = Attached::Attachment.options[:credentials]["bucket"]
      return connection.head_object(bucket, path, options = {}).headers["Content-Length"].to_i
    else
      return 0
    end
  end
end

def http_remote_init(uri)
  http = Net::HTTP.new(uri.host, uri.port)
  http.use_ssl = true
  http.verify_mode = OpenSSL::SSL::VERIFY_NONE
  return http
end

def ftp_remote_init()
  ftp = Net::FTP.new(ENV["VIDEO_SOURCE_FTP_HOST"])
  ftp.login ENV["VIDEO_SOURCE_FTP_USERNAME"], ENV["VIDEO_SOURCE_FTP_PASSWORD"]
  return ftp
end

def s3_remote_init()
  connection = Fog::Storage.new({
    :provider                 => 'AWS',
    :aws_access_key_id        => ENV["AWS_ACCESS_KEY_ID"],
    :aws_secret_access_key    => ENV["AWS_SECRET_ACCESS_KEY"]
  })
  return connection
end

def remote_init(type)
  if type == :s3
    return s3_remote_init
  else
    if type == :ftp
      return ftp_remote_init
    end
  end

  raise "Invalid remote type"
end

def remote_url(type, filename)
  if type == :ftp
    return "ftp://" + ENV["VIDEO_SOURCE_USERNAME"] + ":" + ENV["VIDEO_SOURCE_PASSWORD"] + "@" + ENV["VIDEO_SOURCE_FTP_HOST"] + "/" + ENV["VIDEO_SOURCE_DIRECTORY"] + "/" + filename
  else
    if type == :s3
      bucket = Attached::Attachment.options[:credentials]["bucket"]
      return "s3://" + bucket + "/" + ENV["VIDEO_SOURCE_DIRECTORY"] + "/" + filename
    end
  end
end

def data_files
  return ["db/seeds/Films Acquired and Tagged.csv", "db/seeds/Films Acquired and Tagged 2.csv", "db/seeds/Films Acquired and Tagged 3.csv"]
end

def data_file_open(index)
  return File.open(data_files[index])
end

namespace :filmdata do

  desc 'verify your data'
  task 'verify' => :environment do

    connection = remote_init(:s3)
    #connection = remote_init("ftp")
    total_duration_seconds = 0
    filmcount = 0
    totalsize = 0
 
    data_files.each do |filename|
    linecount = 0
    header = true
    puts filename
    
    file = File.open(filename)
    file.each do |line|
      linecount += 1

      if header
        header = false
        next
      end
      filmcount += 1

      errors = []
      fields = line.split("|")
      if fields.length < 32
        errors << "incorrect number of fields: " + fields.length.to_s() + " fields at line: " + linecount.to_s()
      else
        #check file exists
        filename = ENV["VIDEO_SOURCE_DIRECTORY"] + "/" + fields[14]
        begin
          size = remote_size(connection, filename)
          if size == 0
            error = "file missing (" + filename + ")"
            errors << error
          end
          totalsize += size
        rescue Exception => e
          errors << "Remote size exception for " + filename + ": " + e.message
        end

        #check country is valid
        countries = fields[4].split /\s*,\s*/
        if countries.length == 0
          errors << "country missing"
        else
          countries.each do |country|
            country.strip!
            if country == "UK"
              country = "United Kingdom"
            end 
            if country == "South Korea"
              country = "Korea (South)"
            end
            if country == "Wales"
              country = "United Kingdom"
            end
            c = Country.find_country_by_name(country)
            if c.nil?
              c = Country.find_country_by_alpha2(country)
            end
            if c.nil?
              c = Country.find_country_by_alpha3(country)
            end
            if c.nil?
              error = "unknown country (" << country << ")"
              errors << error
            end
          end
        end

        #check audio language is valid
        languages = fields[5].split /\s*,\s*/
        if languages.length == 0
          errors << "language missing"
        else
          languages.each do |language|
            language.strip!

            language = "Modern Greek (1453-)" if language == "Greek"
            language = "Mandarin Chinese" if language == "Mandarin"
  
            if language != "Nonverbal"
              l = LanguageList::LanguageInfo.find(language)
              if l.nil?
                error = "unknown language (" << language << ")"
                errors << error
              elsif l.iso_639_3.nil?
                error = "no iso_639_3 code for (" << language << ")"
                errors << error
              end
            end
          end
        end

        #check subtitle language is valid
        languages = fields[6].split /\s*,\s*/
        languages.each do |language|
          language.strip!

          language = "Modern Greek (1453-)" if language == "Greek"
          language = "Mandarin Chinese" if language == "Mandarin"
  
          if language != "Nonverbal"
            l = LanguageList::LanguageInfo.find(language)
            if l.nil?
              error = "unknown subtitle language (" << language << ")"
              errors << error
            end
          end
        end

        year = fields[7].strip.to_i
        if year < 1900 and year > 2020
          errors << "Invalid year"
        end

        duration_seconds = 0
        duration = fields[8].strip
        if dt = DateTime.parse(duration) rescue false
          duration_seconds = dt.hour * 3600 + dt.min * 60 + dt.sec
        else
          error = "duration invalid (" + duration + ")"
          errors << error
        end
        total_duration_seconds += duration_seconds
       
        #check screen capture timecode is valid
        screen_cap_time_code = fields[9].strip
        if dt = DateTime.parse(screen_cap_time_code) rescue false
          seconds = dt.hour * 3600 + dt.min * 60 + dt.sec
          if seconds > duration_seconds
            error = "screen capture timecode greater than duration (" + screen_cap_time_code + ")"
          end
        else
          error = "screen capture timecode invalid (" + screen_cap_time_code + ")"
          errors << error
        end

        #check at least one age category
        age2_4 = fields[20].strip.downcase
        age5_6 = fields[21].strip.downcase
        age7_8 = fields[22].strip.downcase
        age9_12	= fields[23].strip.downcase
        age13_14 = fields[24].strip.downcase
        age14_ = fields[25].strip.downcase
        has_category = age2_4 == 'x' || age5_6 == 'x' || age7_8 == 'x' || age9_12 == 'x' || age13_14 == 'x' || age14_ == 'x'
        if !has_category
          errors << "no age category"
        end

        #check for profile and that it is valid
        profiles = fields[28].split(",").map{|x| x.downcase.strip}
        if profiles.length == 0
          errors << "profile missing"
        else
          valid_profiles = EmotionTag.all.map(&:name)
          if !(profiles - valid_profiles).empty?
            error = "unknown profile (" + profiles.to_s + ")"
            errors << error
          end
        end

        lists = fields[30].split(",").map{|x| x.downcase.strip.gsub /\s/, '_'}
        if !lists.empty?
          valid_lists = CuratedVideoListTag.all.map(&:name)
          if !(lists - valid_lists).empty?
            error = "unknown list (" + lists.to_s + ")"
            errors << error
          end
        end
      end

      if errors.length > 0
        raise "line " + linecount.to_s + ", film " + filmcount.to_s + " : " + errors.to_s
      else
        print "."
        STDOUT.flush
      end
 
    end
    end

    puts
    puts filmcount.to_s + "/" + (totalsize/1000).to_s + "/" + (total_duration_seconds/60).to_s

  end


  task 'verify_load' => :environment do
    header = true
    film_count = 0
    file = data_file_open
    file.each do |line|
      if header
        header = false
        next
      end
      film_count += 1
    end

    failed_videos = film_count - Video.active.length
    raise "There are " + failed_videos.to_s + " failed videos" if failed_videos > 0

    http = nil
    Video.active.each do |video|
      #puts video.encoding_input_url
      video.encodings.each do |encoding|
        #puts type + "," + encoding
        uri = URI(URI.encode(encoding))
        http = http_remote_init(uri) if http.nil?
        if http_remote_size(http, uri) == 0
          puts "FAILED - " + encoding
        else
          print "."
        end
      end
    end
  end


  task 'load' => ['verify'] do

    admin_user = User.find(1)
    header = true
    film_count = 0
    file = data_file_open(2)
    file.each do |line|
      if header
        header = false
        next
      end
      film_count += 1

      fields = line.split("|")

      video_name = fields[1]

      video = Video.find_by(:name => video_name)
      if !video.nil?
        puts "exists"
      else
        puts "new"
        video = admin_user.owned_videos.new
        #video = Video.new
        video.name = video_name
      end
 
      video.description = fields[15]

      screen_cap_time_code = fields[9].strip
      if dt = DateTime.parse(screen_cap_time_code) rescue false
        video.screen_cap_time_code = [(dt.hour * 3600 + dt.min * 60 + dt.sec)]
      end
 
      video.viewing_age_list << "2_4" if fields[20].strip.downcase == 'x'
      video.viewing_age_list << "5_6" if fields[21].strip.downcase == 'x'
      video.viewing_age_list << "7_8" if fields[22].strip.downcase == 'x'
      video.viewing_age_list << "9_12" if fields[23].strip.downcase == 'x'
      video.viewing_age_list << "13_14" if fields[24].strip.downcase == 'x'
      video.viewing_age_list << "14+" if fields[25].strip.downcase == 'x'

      video.emotion_list = fields[28].split(",").map{|x| x.downcase.strip}

      video.curated_video_list_list = fields[30].split(",").map{|x| x.downcase.strip.gsub /\s/, '_'}

      countries = fields[4].split /\s*,\s*/
      video.origin_country_code = [] if !countries.empty?
      countries.each do |country|
        country.strip!
        if country == "UK"
          country = "United Kingdom"
        end
        if country == "South Korea"
          country = "Korea (South)"
        end
        if country == "Wales"
          country = "United Kingdom"
        end
        c = Country.find_country_by_name(country)
        if c.nil?
          c = Country.find_country_by_alpha2(country)
        end
        if c.nil?
          c = Country.find_country_by_alpha3(country)
        end
        video.origin_country_code << c.alpha2
      end

      languages = fields[5].split /\s*,\s*/
      video.audio_language_code = [] if !languages.empty?
      languages.each do |language|
        language.strip!

        language = "Modern Greek (1453-)" if language == "Greek"
        language = "Mandarin Chinese" if language == "Mandarin"
  
        if language != "Nonverbal"
          l = LanguageList::LanguageInfo.find(language)
          video.audio_language_code << l.iso_639_3
        end
      end

      languages = fields[6].split /\s*,\s*/
      video.subtitle_language_code = [] if !languages.empty?
      languages.each do |language|
        language.strip!

        language = "Modern Greek (1453-)" if language == "Greek"
        language = "Mandarin Chinese" if language == "Mandarin"
  
        if language != "Nonverbal"
          l = LanguageList::LanguageInfo.find(language)
          video.subtitle_language_code << l.iso_639_3
        end
      end

      video.released_year = fields[7].strip.to_i

      input_url = remote_url(:s3, fields[14])
      video.encoding_input_url = input_url

      print "x" if video.encoding_input_url_changed? 
      video.save!
      print "."
    end
  end
end

