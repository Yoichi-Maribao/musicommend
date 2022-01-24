class Image
  Aws.config.update(
    region: 'ap-northeast-1',
    credentials: Aws::Credentials.new(ENV['AWS_ACESS_KEY_ID'], ENV['AWS)SECRET_ACCESS_KEY'])
  )

  def self.signed_url(filename, operation)
    signer = Aws::S3::Presigner.new
    signer.presigned_url(operation, bucket: ENV['S3_BUCKET_NAME'], key: filename)
  end
end