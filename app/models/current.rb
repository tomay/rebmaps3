class Current < ActiveRecord::Base
  #attr_accessible :a2100, :b2100
  has_and_belongs_to_many :spps
end
