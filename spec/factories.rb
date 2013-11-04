require 'faker'

FactoryGirl.define do

  factory :current do
    r2000 {rand(20..200)}
  end

  factory :a2100 do
    r2100a {rand(20..200)}
  end

  factory :b2100 do
    r2100b {rand(20..200)}
  end

  factory :spp do
    sciname { "#{Faker::Name.first_name} #{Faker::Name.last_name.downcase}" }
  end

  factory :spp_with_currents, :parent => :spp do |spp|
    currents { build_list :current, 3 }
  end

  factory :spp_with_a2100s, :parent => :spp do |spp|
    a2100s { build_list :a2100, 3 }
  end

  factory :spp_with_b2100s, :parent => :spp do |spp|
    b2100s { build_list :b2100, 3 }
  end

end
