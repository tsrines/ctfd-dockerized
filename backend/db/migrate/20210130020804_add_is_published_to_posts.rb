class AddIsPublishedToPosts < ActiveRecord::Migration[6.1]
  def change
    add_column :posts, :is_published, :boolean
  end
end
