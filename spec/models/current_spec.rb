require 'spec_helper'

describe Current do
  let(:current) { FactoryGirl.create(:current) }
  it { should have_many(:spps).through(:currents_spps) }
end
