class AddScoreColumnsInApplication < ActiveRecord::Migration[6.1]
  def change
    add_column :applications, :match_score, :decimal,
           precision: 5, scale: 2

    add_column :applications, :score_breakdown, :jsonb,
              null: false, default: {}

    add_column :applications, :scoring_status, :string,
              null: false, default: "pending"

    add_column :applications, :scored_at, :datetime
    add_column :applications, :scoring_error, :text
    add_column :applications, :scoring_version, :string
  end
end
