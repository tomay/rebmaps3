class AddColumnsToSpeciesTable < ActiveRecord::Migration
  def change
  	add_column :spps, :eol_url, :string
  	add_column :spps, :wikipedia_url, :string
  end
end
