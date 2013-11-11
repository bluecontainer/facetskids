class Video < ActiveRecord::Base

  belongs_to :user

  has_one :job, dependent: :destroy
  has_many :outputs, dependent: :destroy

  acts_as_taggable_on :emotions, :viewing_age

  validates_presence_of :name
  validates_presence_of :description

  validates_format_of :encoding_input_url, :with => URI::regexp(%w(http https ftp)), :allow_blank => true
  
  scope :active, -> { where(state: 'finished') }

  DEFAULTS = {
    public: 1, speed: 1, quality: 5,
    notifications: [ { format: "json", url: "http://76.16.102.51/videos/notifications.json" } ]
  }

  OUTPUTS = {
    #webm: { label: 'webm', video_codec: 'vp8',    audio_codec: 'vorbis', width: 928, height: 522 },
    #mp4:  { label: 'mp4',  video_codec: 'h264',   audio_codec: 'aac',    width: 928, height: 522 },
    #ogg:  { label: 'ogg',  video_codec: 'theora', audio_codec: 'vorbis', width: 928, height: 522 },
    webm: { label: 'webm', video_codec: 'vp8',    audio_codec: 'vorbis' },
    mp4:  { label: 'mp4',  video_codec: 'h264',   audio_codec: 'aac' },
    ogg:  { label: 'ogg',  video_codec: 'theora', audio_codec: 'vorbis' },

    hls64: {
      label: 'hls64',
      audio_bitrate: 64,
      audio_sample_rate: 22050,
      format: "aac",
      type: "segmented"
    },

    hls240: {
      label: 'hls240',
      audio_bitrate: 56,
      audio_sample_rate: 22050,
      decoder_bitrate_cap: 360,
      decoder_buffer_size: 840,
      max_frame_rate: 15,
      type: "segmented",
      video_bitrate: 184,
      width: 400,
      format: "ts"
    },

    hls440: {
      label: 'hls440',
      audio_bitrate: 56,
      audio_sample_rate: 22050,
      decoder_bitrate_cap: 578,
      decoder_buffer_size: 1344,
      type: "segmented",
      video_bitrate: 384,
      width: 400,
      format: "ts"
    },

    hls640: {
      label: 'hls640',
      audio_bitrate: 56,
      audio_sample_rate: 22050,
      decoder_bitrate_cap: 960,
      decoder_buffer_size: 2240,
      type: "segmented",
      video_bitrate: 584,
      width: 480,
      encryption_method: "aes-128",
      format: "ts"
    },

    hls1040: {
      label: 'hls1040',
      audio_bitrate: 56,
      audio_sample_rate: 22050,
      decoder_bitrate_cap: 1500,
      decoder_buffer_size: 4000,
      type: "segmented",
      video_bitrate: 1000,
      width: 640,
      encryption_method: "aes-128",
      format: "ts"
    },

    hls1540: {
      label: 'hls1540',
      audio_bitrate: 56,
      audio_sample_rate: 22050,
      decoder_bitrate_cap: 2310,
      decoder_buffer_size: 5390,
      type: "segmented",
      video_bitrate: 1484,
      width: 960,
      encryption_method: "aes-128",
      format: "ts"
    },

    hls2040: {
      label: 'hls2040',
      audio_bitrate: 56,
      audio_sample_rate: 22050,
      decoder_bitrate_cap: 3060,
      decoder_buffer_size: 7140,
      type: "segmented",
      video_bitrate: 1984,
      width: 1024,
      encryption_method: "aes-128",
      format: "ts"
    },

    hlsipad: {
      label: 'hlsipad',
      streams: [
        {
          bandwidth: 2040,
          path: "../hls2040/hls2040.m3u8"
        },
        {
          bandwidth: 1540,
          path: "../hls1540/hls1540.m3u8"
        },
        {
          bandwidth: 1040,
          path: "../hls1040/hls1040.m3u8"
        },
        {
          bandwidth: 640,
          path: "../hls640/hls640.m3u8"
        },
        {
          bandwidth: 440,
          path: "../hls440/hls440.m3u8"
        },
        {
          bandwidth: 240,
          path: "../hls240/hls240.m3u8"
        },
      ],
      type: "playlist"
    },

    thumbnails: {
      label: 'thumbnails',
      thumbnails:
      {
        label: "selected",
        width: 576,
        height: 430,
        aspect_mode: "crop"
      }
    }
  }

  has_attached :encoding, path: "videos/encodings/:identifier/:style/:style:extension", styles: {
    webm: { extension: '.webm' },
    mp4:  { extension: '.mp4'  },
    ogg:  { extension: '.ogv'  },
    hls64: { extension: '.m3u8' },
    hls240: { extension: '.m3u8' },
    hls440: { extension: '.m3u8' },
    hls640: { extension: '.m3u8' },
    hls1040: { extension: '.m3u8' },
    hls1540: { extension: '.m3u8' },
    hls2040: { extension: '.m3u8' },
    hlsipad: { extension: '.m3u8' },
    thumbnails: { extension: '.png' }
  }

  has_attached :preview, path: "videos/previews/:identifier/:style:extension", processor: :image, styles: {
    poster: { size: "928x522#" },
    :detail => { size: "288x215#" },
    :detailx2 => { size: "576x430#" },
    :list => { size: "227x170#" },
    :listx2 => { size: "454x340#" }
  }

  #validates_attached_presence :encoding
  #validates_attached_size :encoding, in: 0.megabytes..2.gigabytes

  #validates_attached_presence :preview
  #validates_attached_size :preview, in: 0.megabytes..2.gigabytes
  #validates_attached_extension :preview, in: %w(jpe jpg jpeg png)

  def encodings
    [
      self.encoding.url(:original),
      self.encoding.url(:webm),
      self.encoding.url(:mp4),
      self.encoding.url(:ogg),
      self.encoding.url(:hls240),
      self.encoding.url(:hls440),
      self.encoding.url(:hls640),
      self.encoding.url(:hls1040),
      self.encoding.url(:hls1540),
      self.encoding.url(:hls2040),
      self.encoding.url(:hlsipad)
    ]
  end

  def thumbnails
    thumbnail_urls = Array.new
    count = 0
    self.screen_cap_time_code.each { |x|
      thumbnail_url = String.new
      thumbnail_url << encoding_base_url(:thumbnails) << "frame_" << sprintf('%04i', count) << ".png"
      thumbnail_urls << thumbnail_url
      count += 1
    }
    thumbnail_urls
  end

  def encoding_base_url(style)
    logger.debug self.encoding.url(style)
    uri = URI(self.encoding.url(style))
    uri.scheme + "://" + uri.host + File.dirname(uri.path) + "/"
  end

  def refresh(job, output)
    job.refresh
    job.save

    output.refresh
    output.save

    self.duration_in_ms = output.zencoder_response["input"]["duration_in_ms"] if self.duration_in_ms.nil?

    self.state = job.state || output.state
    self.save
  end

  def refresh_poll
    self.job.refresh
    job.save

    self.state = job.state
    self.save
  end

  #before_save :zencodeit_noupload, if: Proc.new { |video| video.encoding.changed? }
  before_save :zencodeit_noupload, if: Proc.new { |video| video.encoding_input_url_changed? }

  def zencodeit
    input = self.encoding.url
    outputs = []

    OUTPUTS.each do |style, options|
      output = DEFAULTS
      output = output.merge(options)
      unless style == :thumbnails
        output = output.merge(url: self.encoding.url(style))
      else
        output[:thumbnails][:base_url] = encoding_base_url(style)
        output[:thumbnails][:times] = self.screen_cap_time_code
      end
      outputs << output
    end
 
    response = Zencoder::Job.create({ input: input, outputs: outputs })

    self.state = response.success? ? 'processing' : 'failed'
    self.build_job(
      zencoder_id: response.body['id'], 
      zencoder_request: {input: input, outputs: outputs}, 
      zencoder_response: response.body)
 
    if response.success?
      response.body['outputs'].each do |output|
        self.outputs.build(zencoder_id: output['id'], label: output['label'])
      end
    end

    return response
  end

  def zencodeit_noupload
    return if encoding_input_url.nil? || encoding_input_url.blank?

    self.encoding.identifier = Identifier.generate
    self.encoding.extension = File.extname(self.encoding_input_url)

    input = self.encoding_input_url

    outputs = []

    #use zencoder to copy file from ftp to s3
    transfer = {
      label: 'transfer',
      type: "transfer-only",
      url: self.encoding.url
    }
    output = DEFAULTS
    output = output.merge(transfer)
    outputs << output

    OUTPUTS.each do |style, options|
      output = DEFAULTS
      output = output.merge(options)
      #output[:source] = "transfer"
      unless style == :thumbnails
        output = output.merge(url: self.encoding.url(style))
      else
        output[:thumbnails][:base_url] = encoding_base_url(style)
        output[:thumbnails][:times] = self.screen_cap_time_code
      end
      outputs << output
    end

    request = { input: input, outputs: outputs }
    logger.debug request
    response = Zencoder::Job.create(request)

    self.state = response.success? ? 'processing' : 'failed'
    self.build_job(
      zencoder_id: response.body['id'], 
      zencoder_request: {input: input, outputs: outputs}, 
      zencoder_response: response.body)
 
    if response.success?
      response.body['outputs'].each do |output|
        self.outputs.build(zencoder_id: output['id'], label: output['label'])
      end
    end

    return response
  end


end
