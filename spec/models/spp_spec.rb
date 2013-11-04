require 'spec_helper'

describe Spp do
  let(:spp) { FactoryGirl.create(:spp) }
  it { should validate_presence_of(:sciname) }
  it { should have_many(:currents).through(:currents_spps) }
  it { should have_many(:a2100s).through(:a2100s_spps) }
  it { should have_many(:b2100s).through(:b2100s_spps) }

end