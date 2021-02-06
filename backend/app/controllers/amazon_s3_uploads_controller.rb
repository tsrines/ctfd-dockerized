class AmazonS3UploadsController < ApplicationController
  require 'aws-sdk-s3'

  def set_s3_direct_post
    filename = params[:filename]
    file_type = params[:fileType]
    directory = params[:directory]
    random_path = SecureRandom.uuid
    key = "uploads/#{directory}/#{random_path}/#{filename}"

    signer = Aws::S3::Presigner.new
    post_url =
      signer.presigned_url(
        :put_object,
        bucket: ENV['S3_BUCKET'],
        key: key,
        acl: 'public-read',
        content_type: file_type
      )

    get_url = "https://#{ENV['S3_BUCKET']}.s3-us-east-2.amazonaws.com/#{key}"
    json_response({ post_url: post_url, get_url: get_url })
  end

  private

  def json_response(object, status = :ok)
    render json: object, status: status
  end
end
