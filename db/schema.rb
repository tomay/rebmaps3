# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20130822180122) do

  create_table "a2100s", :force => true do |t|
    t.integer "r2100a"
  end

  create_table "a2100s_spps", :id => false, :force => true do |t|
    t.integer "a2100_id", :null => false
    t.integer "spp_id",   :null => false
  end

  add_index "a2100s_spps", ["a2100_id", "spp_id"], :name => "index_a2100s_spps_on_a2100_id_and_spp_id"

  create_table "b2100s", :force => true do |t|
    t.integer "r2100b"
  end

  create_table "b2100s_spps", :id => false, :force => true do |t|
    t.integer "b2100_id", :null => false
    t.integer "spp_id",   :null => false
  end

  add_index "b2100s_spps", ["b2100_id", "spp_id"], :name => "index_b2100s_spps_on_b2100_id_and_spp_id"

  create_table "currents", :force => true do |t|
    t.integer "r2000"
  end

  create_table "currents_spps", :id => false, :force => true do |t|
    t.integer "current_id", :null => false
    t.integer "spp_id",     :null => false
  end

  add_index "currents_spps", ["current_id", "spp_id"], :name => "index_currents_spps_on_current_id_and_spp_id"

  create_table "spps", :force => true do |t|
    t.string "sciname"
    t.string "eol_url"
    t.string "wikipedia_url"
    t.string "image_url"
  end

end
