class AddDetailsToApplications < ActiveRecord::Migration[6.1]
  def change
    add_column :applications, :cgpa, :integer
    add_column :applications, :yoe, :integer
  end
end
