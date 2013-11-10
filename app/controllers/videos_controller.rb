class VideosController < ApplicationController
  before_filter :authenticate_user!, :except => [:notifications]  
  
  respond_to :html

  # GET /videos
  def index
    @videos = Video.active

    respond_with(@videos)
  end

  # GET /videos/1
  def show
    @video = Video.active.find(params[:id])

    respond_with(@video)
  end

  # POST /videos/notifications.xml
  # POST /videos/notifications.json
  def notifications
    @job = Job.find_by!(zencoder_id: params[:job][:id])
    @output = Output.find_by!(zencoder_id: params[:output][:id])

    if @job and @output
      @output.zencoder_response = params.to_json

      @video = @job.video || @output.video

      @video.zencoder_input_response = params[:input].to_json if @video.zencoder_input_response.nil?
      @video.refresh(@job, @output)
    end

    respond_to do |format|
      format.xml  { head :ok }
      format.json { head :ok }
    end
  end

end
