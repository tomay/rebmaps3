var map;

function drawPolygon(poly) {

  if (typeof polys === 'undefined') { polys = new Array() }

  for (i in polys) { polys[i].setMap(null); }

  poly = constructPolygon(poly)
  poly.setMap(map);
  polys.push(poly);
}

var constructPolygon = function(poly) {
  return new google.maps.Polygon({
  paths: poly, strokeColor: '#000000',
  strokeOpacity: 0, strokeWeight: 2,
  fillColor: "#FF6600",
  fillOpacity: 0.9
  });
}

var createNewMap = function() {

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

  return map 
}
