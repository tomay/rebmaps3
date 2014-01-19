var googleMap = {
  drawPolygon: function(poly) {
    if (typeof polys === 'undefined') { polys = new Array() }
    for (i in polys) { polys[i].setMap(null); }
    poly = googleMap.makeGooglePolygon(poly)
    poly.setMap(this.map);
    polys.push(poly);
  },

  buildPolyFromCoords: function(coords) {
    poly = new Array();
    for (j in coords) {
      poly.push(new google.maps.LatLng(coords[j][1], coords[j][0]))
    }
    poly.pop();
    return poly
  },

  makeGooglePolygon: function(poly) {
    return new google.maps.Polygon({
      paths: poly, strokeColor: '#000000',
      strokeOpacity: 0, strokeWeight: 2,
      fillColor: "#FF6600",
      fillOpacity: 0.9
    });
  },

  createNewMap: function() {
    map = new google.maps.Map(document.getElementById('map'), {
      center: new google.maps.LatLng(-18.9,47.52),
      zoom: 9,
      disableDefaultUI: true,
      zoomControl: true,
      zoomControlOptions: {
        style: google.maps.ZoomControlStyle.SMALL,
        position: google.maps.ControlPosition.TOP_RIGHT
      },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      mapTypeControl: false
    });
    // sets googleMap.map = map
    this.map = map
  },

  setCursorToPointer: function() {
    this.map.setOptions({draggableCursor: 'pointer'});
  },

  setCenter: function(first_lat,last_lat,first_long,last_long) {
    var lat_ave = ((parseFloat(first_lat.toFixed(4)) + parseFloat(last_lat.toFixed(4))) / 2);
    var long_ave = ((parseFloat(first_long.toFixed(4)) + parseFloat(last_long.toFixed(4))) / 2);
    var center = new google.maps.LatLng(lat_ave, long_ave)
    googleMap.map.setCenter(center);
  }
}
