## build urls for spp
# TO DO: save this as a rake task

# adds EOL url
require 'net/http'
spps = Spp.all; puts nil
spps.each {|spp|
  next if !spp.eol_url.nil?
  spp_name = spp.sciname.split(" ").join("+")
  uri = URI("http://eol.org/api/search/1.0.json?q=#{spp_name}&page=1&exact=true")
  response = Net::HTTP.get_response(uri)
  r_hash = JSON.parse(response.body)
  next if r_hash["totalResults"] == 0
  link = r_hash["results"][0]["link"]
  next if link.nil?
  spp.eol_url = link
  spp.save
}

# adds wiki pageid and image url
require 'wikipedia'
spps = Spp.all; puts nil
spps.each {|spp|
  # pageid
  page = Wikipedia.find(spp.sciname)
  spp.wikipedia_url = page.page["pageid"]

  # image url
  image_urls = page.image_urls.first
  spp.image_url = image_urls unless image_urls == "http://upload.wikimedia.org/wikipedia/commons/1/1b/Lemur_%28PSF%29.png"
  
  spp.save
}