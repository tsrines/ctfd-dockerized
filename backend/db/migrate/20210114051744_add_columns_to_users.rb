class AddColumnsToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :name, :string
    add_column :users, :token, :string
    add_column :users, :uid, :string
    add_column :users, :avatar, :string
    add_column :users, :role, :integer, default: 0
  end
end
