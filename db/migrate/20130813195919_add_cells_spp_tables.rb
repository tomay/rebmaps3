class AddCellsSppTables < ActiveRecord::Migration
  def up
  	# era current
    create_table :currents_spps, :id => false do |t|
      t.references :current, :null => false
      t.references :spp, :null => false
    end
    add_index(:currents_spps, [:current_id, :spp_id])

    # era 2100 a2a    
    create_table :a2100s_spps, :id => false do |t|
      t.references :a2100, :null => false
      t.references :spp, :null => false
    end
    add_index(:a2100s_spps, [:a2100_id, :spp_id])

    # era 2100 b2a
    create_table :b2100s_spps, :id => false do |t|
      t.references :b2100, :null => false
      t.references :spp, :null => false
    end
    add_index(:b2100s_spps, [:b2100_id, :spp_id])

    #system "rsync -ruv /home/tomay/rails/rebmaps/db/migrate/data/ /tmp"
    # one file for all species data
    execute "COPY spps (id, sciname) FROM '/home/tomay/rails/rebmaps3_data/spec2.txt' (FORMAT CSV)"  

    # curr cells and join data seed
    execute "COPY currents (id, r2000)  FROM '/home/tomay/rails/rebmaps3_data/curr_cells.txt' (FORMAT CSV)"  
    execute "COPY currents_spps (current_id, spp_id) FROM '/home/tomay/rails/rebmaps3_data/current_cells_specs.txt' (FORMAT CSV)"

    # a2a cells and join data seed
    execute "COPY a2100s (id, r2100a)  FROM '/home/tomay/rails/rebmaps3_data/a2a_cells.txt' (FORMAT CSV)"  
    execute "COPY a2100s_spps (a2100_id, spp_id) FROM '/home/tomay/rails/rebmaps3_data/a2a_cells_specs.txt' (FORMAT CSV)"

    # b2a cells and join data seed
    execute "COPY b2100s (id, r2100b)  FROM '/home/tomay/rails/rebmaps3_data/b2a_cells.txt' (FORMAT CSV)"  
    execute "COPY b2100s_spps (b2100_id, spp_id) FROM '/home/tomay/rails/rebmaps3_data/b2a_cells_specs.txt' (FORMAT CSV)"

  end

  def down
  	drop_table :currents_spps
    drop_table :a2100s_spps
    drop_table :b2100s_spps
  end
end
