class AddColToApplications < ActiveRecord::Migration[6.1]
  def change
    add_column :applications, :status, :integer, default: 0, null:false
    add_column :applications, :email, :string, null: false, default: ""
  end
end
