var Controller = {
  switchEras: function() {
    var era = this.value
    View.focusButton( this );
    Controller.createMapLayer(era);
    View.createMapKey(era);
  },

  featureClicker: function (ev, latlng, pos, data) {
    var gridId = data["grid_code"]
    Controller.updateMap(gridId);
    Controller.getSpeciesList(gridId, this.era)
  },

  getSpeciesList: function(gridId, era) {
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: 'cells/',
      data: {'id': gridId, 'era': era},
      success: View.updateResults
    })
  },

  updateMap: function(gridId) {
    var url = CartoDB.getUrl(gridId)
    $.getJSON(url, Controller.putPolygon)
  },

  putPolygon: function(response){
    var geoJSON = CartoDB.parseCartoDBResponse(response)
    var latLngObj = CartoDB.parseGeoJSON(geoJSON)
    googleMap.setCenter(latLngObj.firstLat, latLngObj.lastLat, latLngObj.firstLong, latLngObj.lastLong)
    googleMap.buildPolyFromCoords(geoJSON)
    googleMap.drawPolygon(poly);
  },

  createMapLayer: function(era, map) {
    if (typeof newMapLayer != 'undefined') { newMapLayer.setMap(null); }
    var newMapLayer = new MapLayer(era,map)
    newMapLayer = new CartoDBLayer({
      map: googleMap.map,
      user_name: newMapLayer.user_name,
      table_name: newMapLayer.table_name,
      interactivity: newMapLayer.interactivity,
      tile_style: newMapLayer.tile_style,
      featureOver: googleMap.setCursorToPointer,
      featureClick: Controller.featureClicker,
      era: newMapLayer.era
    })
  }
}
