class CreateCurrents < ActiveRecord::Migration
  def change
    create_table :currents do |t|
      t.integer :r2000
    end
  end
end
