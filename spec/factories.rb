require 'faker'

FactoryGirl.define do

  factory :current do
    r2000 {rand(20..200)}
  end

  factory :spp do
    sciname { "#{Faker::Name.first_name} #{Faker::Name.last_name.downcase}" }
    factory :spp_with_current do
      after(:create) do |spp|
        FactoryGirl.create(:current, spp: spp)
      end
    end

  end

  factory :a2100 do
    r2100a {rand(20..200)}
  end

  factory :b2100 do
    r2100b {rand(20..200)}
  end

  factory :spp_with_a2100s do |f|
    after(:create) do |spp|
      FactoryGirl.create_list(:spp, 5, a2100: a2100)
    end
  end

  factory :spp_with_b2100s do |f|
    after(:create) do |spp|
      FactoryGirl.create_list(:spp, 5, b2100: b2100)
    end
  end


end
