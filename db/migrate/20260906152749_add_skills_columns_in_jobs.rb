class AddSkillsColumnsInJobs < ActiveRecord::Migration[6.1]
  def change
    add_column :jobs, :required_skills, :string,
               array: true, default: [], null: false

    add_column :jobs, :preferred_skills, :string,
               array: true, default: [], null: false

    add_column :jobs, :minimum_experience_years, :decimal,
               precision: 4, scale: 1

    add_index :jobs, :required_skills, using: :gin
    add_index :jobs, :preferred_skills, using: :gin
  end
end
