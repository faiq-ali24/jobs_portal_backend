class ModifyIndexInUser < ActiveRecord::Migration[6.1]
  # def up
  #   remove_index :users, :email if index_exists?(:users, :email)

  #   change_column :users, :company_id, :bigint if column_exists?(:users, :company_id)

  #   add_index :users, [:company_id, :email],
  #             unique: true,
  #             name: "index_users_on_company_id_and_email"
  # end

  # def down
  #   remove_index :users, name: "index_users_on_company_id_and_email" if index_exists?(:users, [:company_id, :email])

  #   # You might want to change back company_id to integer if it was bigint before
  #   change_column :users, :company_id, :integer if column_exists?(:users, :company_id)

  #   add_index :users, :email,
  #             unique: true,
  #             name: "index_users_on_email"
  # end
end
