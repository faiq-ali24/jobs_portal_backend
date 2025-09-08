class CreateApplications < ActiveRecord::Migration[6.1]
  def change
    create_table :applications do |t|
      t.integer :user_id
      t.integer :job_id
      t.timestamps
    end
  end
end
