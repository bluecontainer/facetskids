class Account::VideosController < ApplicationController
  before_filter :authenticate_user!
  before_action :load_video, only: :create
  load_and_authorize_resource

  respond_to :html

  # GET /videos
  def index
    @user = current_user
    @videos = @user.videos

    respond_with(@videos)
  end

  # GET /account/videos/new
  def new
    @user = current_user
    @video = @user.videos.new

    respond_with(@video)
  end

  # GET /account/videos/1/edit
  def edit
    @user = current_user
    @video = @user.videos.find(params[:id])

    respond_with(@video)
  end

  # POST /account/videos
  def load_video
    @user = current_user
    @video = @user.videos.new
  end

  def create
    #@user = current_user
    #@video = @user.videos.new
    @video.attributes = params.require(:video).permit(:name, :description, :encoding, :preview, :encoding_input_url, :emotion_list => [], :viewing_age_list => [], :screen_cap_time_code => [], :origin_country_code => [])

    if @video.screen_cap_time_code.nil?
      @video.screen_cap_time_code = params[:video][:screen_cap_time_code].split(",") unless params[:video][:screen_cap_time_code].nil?
    end
    unless @video.screen_cap_time_code.nil?
      #convert to integer array
      tmp_array = []
      @video.screen_cap_time_code.each_with_index do |i, x|
        tmp_array << i.to_i unless i.to_i == 0
      end
      @video.screen_cap_time_code = tmp_array
    end

    if @video.save
      respond_with(@video, notice: 'Video was successfully created.', location: account_videos_path)
    else
      respond_with(@video)
    end  
  end

  # PUT /account/videos/1
  def update
    @user = current_user
    @video = @user.videos.find(params[:id])
    @video.attributes = params.require(:video).permit(:name, :description, :encoding, :preview)
    @video.save

    respond_with(@video, notice: 'Video was successfully updated.', location: account_videos_path)
  end

  # DELETE /account/videos/1
  def destroy
    @user = current_user
    @video = @user.videos.find(params[:id])
    @video.destroy

    respond_with(@video, notice: 'Video was successfully destroyed.', location: account_videos_path)
  end

end
