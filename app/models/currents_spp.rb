class CurrentsSpp < ActiveRecord::Base
  belongs_to :current
  belongs_to :spp
end
