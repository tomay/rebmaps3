class Spp < ActiveRecord::Base
  attr_accessible :id, :sciname
  validates_presence_of :sciname
  has_many :currents_spps
  has_many :currents, through: :currents_spps
  has_many :a2100s_spps
  has_many :a2100s, through: :a2100s_spps
  has_many :b2100s_spps
  has_many :b2100s, through: :b2100s_spps
end