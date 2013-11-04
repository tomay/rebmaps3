require 'spec_helper'

describe CellsController do
  let!(:spp_currents) { FactoryGirl.create(:spp_with_currents) }
  let!(:spp_a2100s) { FactoryGirl.create(:spp_with_a2100s) }
  let!(:spp_b2100s) { FactoryGirl.create(:spp_with_b2100s) }

  it "responds with JSON object" do
    get :search, :id => spp_currents.currents.first.id, :era => "curr"
    expect(JSON.is_json?(response.body)).to eq(true)
  end

  it "responds with expected data for current era" do
    @mine = {
      "size" => "1",
      "list" => spp_currents.sciname
    }.to_json
    get :search, :id => spp_currents.currents.first.id, :era => "curr"
    expect(response.body).to eq(@mine)
  end

  it "responds with expected data for a2100 era" do
    @mine = {
      "size" => "1",
      "list" => spp_a2100s.sciname
    }.to_json
    get :search, :id => spp_a2100s.a2100s.first.id, :era => "a2100"
    expect(response.body).to eq(@mine)
  end

  it "responds with expected data for b2100 era" do
    @mine = {
      "size" => "1",
      "list" => spp_b2100s.sciname
    }.to_json
    get :search, :id => spp_b2100s.b2100s.first.id, :era => "b2100"
    expect(response.body).to eq(@mine)
  end
end