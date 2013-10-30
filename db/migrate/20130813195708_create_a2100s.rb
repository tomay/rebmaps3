class CreateA2100s < ActiveRecord::Migration
  def change
    create_table :a2100s do |t|
      t.integer :r2100a
    end
  end
end
