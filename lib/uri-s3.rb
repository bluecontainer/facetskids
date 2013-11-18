require 'aws/s3'

module URI

  class S3 < Generic
    def initialize(*args)
      @bucket, @file = args[2], args[5][1,args[5].length]
      super(*args)
    end

    def open &block
      http_url = AWS::S3::S3Object.url_for @file, @bucket
      URI.parse(http_url).open &block
    end
  end
  @@schemes['S3'] = S3
end


