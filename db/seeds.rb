# one file for all species data
execute "COPY spps (id, sciname) FROM 'seed-data/spec2.txt' (FORMAT CSV)"  

# curr cells and join data seed
execute "COPY currents (id, r2000) FROM 'seed-data/curr_cells.txt' (FORMAT CSV)"  
execute "COPY currents_spps (current_id, spp_id) FROM 'seed-data/current_cells_specs.txt' (FORMAT CSV)"

# a2a cells and join data seed
execute "COPY a2100s (id, r2100a) FROM 'seed-data/a2a_cells.txt' (FORMAT CSV)"  
execute "COPY a2100s_spps (a2100_id, spp_id) FROM 'seed-data/a2a_cells_specs.txt' (FORMAT CSV)"

# b2a cells and join data seed
execute "COPY b2100s (id, r2100b) FROM 'seed-data/b2a_cells.txt' (FORMAT CSV)"  
execute "COPY b2100s_spps (b2100_id, spp_id) FROM 'seed-data/b2a_cells_specs.txt' (FORMAT CSV)"


## species
# Note: delete all quotes ("") from file before running
sppFile = File.new("seed-data/spec2.txt", "r")
sppFile.each {|line| 
  values = line.split(",")
  Spp.create(:id => values[0], :sciname => values[1].strip) if values[0]
}
sppFile.close

## current cells
currFile = File.new("seed-data/curr_cells.txt", "r")
currFile.each {|line|
  values = line.split(",")
  Current.create(:id => values[0], :r2000 => values[1])
}
currFile.close

## a2100 cells
a2File = File.new("seed-data/a2a_cells.txt", "r")
a2File.each {|line|
  values = line.split(",")
  A2100.create(:id => values[0], :r2100a => values[1])
}
a2File.close

## b2100 cells
b2File = File.new("seed-data/b2a_cells.txt", "r")
b2File.each {|line|
  values = line.split(",")
  B2100.create(:id => values[0], :r2100a => values[1])
}
b2File.close

## spp join current cells

