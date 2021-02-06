class CommentSerializer < ActiveModel::Serializer
  attributes :id,
             :content,
             :author_name,
             :author_avatar,
             :author_email,
             :post,
             :posted_at
end
