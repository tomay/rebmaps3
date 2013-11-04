class Current < ActiveRecord::Base
  has_many :currents_spps
  has_many :spps, through: :currents_spps
end
