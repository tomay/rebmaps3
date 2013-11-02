require 'spec_helper'

describe Spp do
  let(:spp) { FactoryGirl.create(:spp) }
  it { should validate_presence_of(:sciname) }
  it { should have_and_belong_to_many(:currents) }
  it { should have_and_belong_to_many(:a2100s) }
  it { should have_and_belong_to_many(:b2100s) }

end