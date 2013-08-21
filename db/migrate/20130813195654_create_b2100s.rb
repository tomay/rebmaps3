class CreateB2100s < ActiveRecord::Migration
  def change
    create_table :b2100s do |t|
      t.integer :r2100b
      #t.timestamps
    end
  end
end
