class AddColsToApplication < ActiveRecord::Migration[6.1]
  def change
    add_column :applications, :company_id, :integer, null: false
    add_index  :applications, :company_id
  end
end
