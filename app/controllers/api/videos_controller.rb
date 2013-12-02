module Api
  class VideosController < BaseController
    #skip_before_filter :verify_authenticity_token
    before_filter :authenticate_user!

    def index
      if params[:ids]
        @videos = Video.tagged_with(age_tag).find(params[:ids].split(","))
      elsif params[:tag_list]
        @all_videos = Video.tagged_with(age_tag).tagged_with(params[:tag_list], :any => true)
        @videos = Video.find_by_sql(Video.tagged_with(params[:tag_list], :owned_by => current_user).union(@all_videos).to_sql)
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

    def counts
      @counts = Video.tagged_with(age_tag).all_tag_counts.map{ |x| {:name=>x.name, :type=>x.type, :count=>x.count} }
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

    def save_marker
      if params[:view_id] && params[:current_marker_seconds]
        @view = UserVideoView.find(params[:view_id])
        if @view
          @view.current_marker_seconds = params[:current_marker_seconds]
          duration_seconds = 0
          duration_seconds = @view.duration_seconds if @view.duration_seconds
          @view.duration_seconds = duration_seconds + params[:interval].to_i if params[:interval] 
          @view.save!
        end
  
        if @view.nil? 
          render :json => { :error => 'not found' }, :status => 422 
        else
          render :mark
        end
        #view_updated = UserVideoView.where(:id => params[:view_id]).update_all(:current_marker_seconds => params[:current_marker_seconds])
        #render :json => {} if view_updated == 1
        #render :json => { :error => 'not found'}, :status => 422 if view_updated == 0

      elsif params[:video_id]
        marker = params[:current_marker_seconds]
        duration = 0
        duration = marker if marker
        @view = (current_user.user_video_views.create({:video_id => params[:video_id], :current_marker_seconds => marker, :duration_seconds => duration}))

        render :mark
      elsif
        render :json => { :error => 'missing parameters'}, :status => 422 
      end
    end

    def get_marker
      @view = nil
      if params[:id]
        last_user_video_view = current_user.user_video_views.where(:video_id => params[:id]).order(created_at: :desc).first
        if !last_user_video_view.nil?
          if last_user_video_view.current_marker_seconds
            if last_user_video_view.current_marker_seconds < (last_user_video_view.video.duration_in_ms/1000 - 30)
              @view = last_user_video_view
            end
          end
        end
      end

      if @view.nil?
        render :json => { :error => 'not found' }, :status => 422 if @view.nil?
      else
        render :mark
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
