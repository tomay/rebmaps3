class CreateSpps < ActiveRecord::Migration
  def change
    create_table :spps do |t|
      t.string :sciname
      #t.timestamps
    end
  end
end
