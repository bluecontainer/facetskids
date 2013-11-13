module Api
  class VideosController < BaseController
    skip_before_filter :verify_authenticity_token

    def index
      if params[:ids]
        @videos = Video.find(params[:ids])
      else
        @videos = Video.all
      end
      #respond_with @videos
      render :json => @videos.to_json(:include => [:emotions, :viewing_age]) 
    end

    def show
      @video = Video.find(params[:id])
      render :json => @video.to_json(:include => [:emotions, :viewing_age])
    end

    def create
      respond_with Video.create(params.require(:video).permit(:name, :description, :emotion_list => [], :viewing_age_list => []))
    end
  end
end
