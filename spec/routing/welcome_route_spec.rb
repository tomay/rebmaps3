require 'spec_helper'
describe "routing to profiles" do
  it "routes / to welcome#index" do
    expect(:get => "/").to route_to(
      :controller => "welcome",
      :action => "index"
    )
  end

end