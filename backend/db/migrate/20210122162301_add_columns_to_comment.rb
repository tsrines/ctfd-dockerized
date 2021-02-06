class AddColumnsToComment < ActiveRecord::Migration[6.0]
  def change
    add_column :comments, :author_avatar, :string
    add_column :comments, :author_name, :string
    add_column :comments, :author_email, :string
  end
end
