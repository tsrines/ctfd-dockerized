# FaceBlogger Back End

This backend serves as the API for <https://github.com/tsrines/ctfd-front>.

## Instructions for local setup

Before doing the below instructions, you will have to get an AWS S3 account and update your local .env file to accommodate the ability to upload photos to your markdown.

The keys should be `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. You can optionally set a `storage.yml` file in the configuration, like below:

```ruby
# Use rails credentials:edit to set the AWS secrets (as aws:access_key_id|secret_access_key)
amazon:
  service: S3
  access_key_id: <%= Rails.application.credentials.dig(:aws, :access_key_id) %>
  secret_access_key: <%= Rails.application.credentials.dig(:aws, :secret_access_key) %>
  region: "YOUR REGION"
  bucket: "YOUR S3 BUCKET"
```

Additionally, to use Koala, and for authentication, you'll need `FACEBOOK_APP_ID` and `FACEBOOK_SECRET`.

See env template as an example.

Once the configuration is set, follow these commands:

```ruby
1. git clone https://github.com/tsrines/ctfd-back.git
2. cd ctfd-back
3. bundle
4. rails db:create
5. rails db:migrate
7. rails db:seed
8. rails s
```

Head on over to <https://github.com/tsrines/ctfd-front> and follow further instructions from there.
