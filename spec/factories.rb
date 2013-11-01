require 'faker'

FactoryGirl.define do

  factory :spp do
    #sciname { "#{Faker::Name.first_name} #{Faker.Name.last_name.downcase}" }
    sciname {"Urdus catta"}
  end

  factory :current do
    r2000 {rand(20..200)}
  end

  factory :a2100 do
    r2100a {rand(20..200)}
  end

  factory :b2100 do
    r2100b {rand(20..200)}
  end

  factory :spp_with_currents do |f|
    after(:create) do |spp|
      FactoryGirl.create_list(:spp, rand(1..10), current: current)
    end
  end

  factory :spp_with_a2100s do |f|
    after(:create) do |spp|
      FactoryGirl.create_list(:spp, rand(1..10), a2100: a2100)
    end
  end

  factory :spp_with_b2100s do |f|
    after(:create) do |spp|
      FactoryGirl.create_list(:spp, rand(1..10), b2100: b2100)
    end
  end


end
