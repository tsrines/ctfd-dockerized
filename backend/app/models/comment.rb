class Comment < ApplicationRecord
  belongs_to :user, default: -> { Current.user }
  belongs_to :post
end
