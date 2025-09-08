class AddDetailsToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :role, :integer, default: 0, null:false
    add_column :users, :name, :string
    add_column :users, :location, :string
    add_column :users, :bio, :text
  end
end
