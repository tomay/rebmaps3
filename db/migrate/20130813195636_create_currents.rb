class CreateCurrents < ActiveRecord::Migration
  def change
    create_table :currents do |t|
      t.integer :r2000
      #t.string :a2100
      #t.string :b2100

      #t.timestamps
    end
  end
end
