class AddMoreDetailsToApplications < ActiveRecord::Migration[6.1]
  def change
    add_column :applications, :name, :string
    add_column :applications, :age, :integer
  end
end
