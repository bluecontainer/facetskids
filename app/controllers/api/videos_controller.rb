module Api
  class VideosController < BaseController
    #skip_before_filter :verify_authenticity_token
    before_filter :authenticate_user!

    def index
      if params[:ids]
        @videos = Video.tagged_with(age_tag).find(params[:ids].split(","))
      elsif params[:emotion_list]
        @all_videos = Video.tagged_with(age_tag).tagged_with(params[:emotion_list], :any => true)
        @videos = Video.find_by_sql(Video.tagged_with(params[:emotion_list], :owned_by => current_user).union(@all_videos).to_sql)
      elsif params[:curated_video_list]
        @videos = Video.tagged_with(age_tag).tagged_with(params[:curated_video_list], :any => true)
      else
        @videos = Video.tagged_with(age_tag)
      end
    end

    def show
      @video = Video.tagged_with(age_tag).find(params[:id])
    end

    def create
      respond_with Video.create(params.require(:video).permit(:name, :description, :emotion_list => [], :viewing_age_list => []))
    end

    def tag
      @video = Video.find(params[:id])
      if params[:emotion_list]
        current_user.tag(@video, :with => params[:emotion_list], :on => :emotions)
      end
      if params[:rating]
        current_user.tag(@video, :with => params[:rating], :on => :ratings)
      end
    end

    def mark
      if params[:view_id] && params[:marker]
        @view = UserVideoView.find(params[:view_id])
        @view.current_marker_seconds = params[:marker]
        @view.duration_seconds = @view.duration_seconds + params[:interval].to_i if params[:interval]
        @view.save!
      elsif params[:id]
        marker = params[:marker]
        duration = 0
        duration = marker if marker
        @view = (current_user.user_video_views.create({:video => Video.find(params[:id]), :current_marker_seconds => marker, :duration_seconds => duration}))
      end
    end

    private
    def age_tag
      child_age = current_user.child_age
      if child_age >= 2 && child_age <= 4
        age_tag = "2_4"
      elsif child_age >= 5 && child_age <= 6
        age_tag = "5_6"
      elsif child_age >= 7 && child_age <= 8
        age_tag = "7_8"
      elsif child_age >= 9 && child_age <= 12
        age_tag = "9_12"
      elsif child_age >= 13 && child_age <= 14
        age_tag = "13_14"
      elsif child_age > 14
        age_tag = "14+"
      end
      return age_tag
    end
  end
end
