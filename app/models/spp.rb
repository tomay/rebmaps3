class Spp < ActiveRecord::Base
  attr_accessible :id, :sciname
  validates_presence_of :sciname
  has_and_belongs_to_many :currents
  has_and_belongs_to_many :a2100s
  has_and_belongs_to_many :b2100s
end