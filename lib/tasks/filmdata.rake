require 'net/ftp'

def remote_size(ftp, idx)
  begin
    return ftp.size(idx)
  rescue Exception
    return 0
  end
end

namespace :filmdata do

  desc 'verify your data'
  task 'verify' => :environment do

    ftp = Net::FTP.new(ENV["VIDEO_SOURCE_FTP_HOST"])
    ftp.login ENV["VIDEO_SOURCE_USERNAME"], ENV["VIDEO_SOURCE_PASSWORD"]

    total_duration_seconds = 0
    filmcount = 0
    totalsize = 0
    header = true
    file = File.open("db/seeds/Films Acquired and Tagged.csv")
    file.each do |line|
      if header
        header = false
        next
      end
      filmcount += 1

      fields = line.split("|")
      if fields.length != 32
        print line + "\n"
      else
        errors = []

        #check file exists
        filename = ENV["VIDEO_SOURCE_DIRECTORY"] + "/" + fields[14]
        size = remote_size(ftp, filename)
        if size == 0
          error = "file missing (" + filename + ")"
          errors << error
        end
        totalsize += size

        #check country is valid
        #countries = fields[4].split(",")
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
          errors << "no category"
        end

        #check for profile and that it is valid
        profiles = fields[28].split(",").map{|x| x.downcase.strip}
        if profiles.length == 0
          errors << "profile missing"
        else
          #valid_profiles = ["happy", "excited", "think", "scared", "care", "laugh"]
          valid_profiles = EmotionTag.all.map(&:name)
          if !(profiles - valid_profiles).empty?
            error = "unknown profile (" + profiles.to_s + ")"
            errors << error
          end
        end

        lists = fields[30].split(",").map{|x| x.downcase.strip.gsub /\s/, '_'}
        if lists.empty?
          errors << "list missing"
        else
          #valid_lists = ["top_rated", "animation_antics", "picks_for_me", "brand_new"]
          valid_lists = CuratedVideoListTag.all.map(&:name)
          if !(lists - valid_lists).empty?
            error = "unknown list (" + lists.to_s + ")"
            errors << error
          end
        end

        if errors.length > 0
          raise "line " + filmcount.to_s + " : " + errors.to_s
        else
          print "."
          STDOUT.flush
        end
      end
    end

    puts
    puts filmcount.to_s + "/" + (totalsize/1000).to_s + "/" + (total_duration_seconds/60).to_s

  end

  task 'load' => ['verify'] do

    admin_user = User.find(1)
    header = true
    film_count = 0
    file = File.open("db/seeds/Films Acquired and Tagged.csv")
    file.each do |line|
      if header
        header = false
        next
      end
      film_count += 1

      fields = line.split("|")
      video = admin_user.videos.new
      video.name = fields[1]
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
          video.audio_language_code << l.iso_639_1
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
          video.subtitle_language_code << l.iso_639_1
        end
      end

      if film_count >= 1 && film_count <= 10
        input_url = "ftp://" + ENV["VIDEO_SOURCE_USERNAME"] + ":" + ENV["VIDEO_SOURCE_PASSWORD"] + "@" + ENV["VIDEO_SOURCE_FTP_HOST"] + "/" + ENV["VIDEO_SOURCE_DIRECTORY"] + "/" + fields[14]
        puts input_url
        video.encoding_input_url = input_url
      end

      video.save
      print "."
    end
  end
end

