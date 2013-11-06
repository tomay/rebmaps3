
var makeAjaxCall = function(grid, era) {
  $.ajax({
      type: "GET",
      dataType: 'json',
      url: 'cells/',
      data: {'id': grid, 'era': era},
      success: updateResults
    })
}

var updateResults = function(response) {
  $('#results-pane').dialog("option","title","Found: " + response["size"] + " species in " + View.eraName(response["era"]));
  $('#results-pane').dialog("open");
  $("div#results-pane").html(response["list"]);
}

var getCartoDBData = function(grid) {
  var
  sql = "SELECT ST_AsGeoJSON(the_geom) as geoj FROM richlemur WHERE grid_code = " + grid,
  url = "http://rebioma.cartodb.com/api/v2/sql?q=" + sql;

  $.getJSON(url,recenter)
}

var recenter = function(response){
  var
  poly   = new Array();
  coords = JSON.parse(response.rows[0].geoj).coordinates[0][0];
  var first_long, last_long, first_lat, last_lat

  for (j in coords) {
    if (j==0){
      first_long = coords[j][0];
      first_lat = coords[j][1];
    }
    else if (j==2) {
      last_long = coords[j][0];
      last_lat = coords[j][1];
    }
    poly.push(new google.maps.LatLng(coords[j][1], coords[j][0]))
  }

  poly.pop();
  drawPolygon(poly);

  var lat_ave = ((parseFloat(first_lat.toFixed(4)) + parseFloat(last_lat.toFixed(4))) / 2);
  var long_ave = ((parseFloat(first_long.toFixed(4)) + parseFloat(last_long.toFixed(4))) / 2);
  var center = new google.maps.LatLng(lat_ave, long_ave)

  map.setCenter(center);
}