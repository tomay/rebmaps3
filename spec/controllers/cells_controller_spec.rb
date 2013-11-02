require 'spec_helper'



describe CellsController do
  let!(:spp) { FactoryGirl.create(:spp_with_current) }
  it "responds with json" do
    @mine = {
      "size" => "4",
      "list" => "something"
    }.to_json

    get :search, :id => 1, :era => "curr"

    expect(response.body).to eq(@mine)

  end
end