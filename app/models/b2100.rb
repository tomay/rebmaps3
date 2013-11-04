class B2100 < ActiveRecord::Base
  has_many :b2100s_spps
  has_many :spps, through: :b2100s_spps
end
