Koala.configure do |config|
  config.app_id = ENV['FACEBOOK_APP_ID']
  config.app_secret = ENV['FACEBOOK_SECRET']
  config.api_version = 'v9.0'
  # See Koala::Configuration for more options, including details on how to send requests through
  # your own proxy servers.
end
