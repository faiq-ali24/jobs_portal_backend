class EnablePgTrgm < ActiveRecord::Migration[6.1]
  def change
    enable_extension 'pg_trgm' unless extension_enabled?('pg_trgm')
  end
end
