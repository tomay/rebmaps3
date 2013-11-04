class A2100 < ActiveRecord::Base
  has_many :a2100s_spps
  has_many :spps, through: :a2100s_spps
end
