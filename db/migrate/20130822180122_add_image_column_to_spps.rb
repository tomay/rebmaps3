class AddImageColumnToSpps < ActiveRecord::Migration
  def change
  	add_column :spps, :image_url, :string
  end
end
