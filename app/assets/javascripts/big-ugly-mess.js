var map;

// Leaflet example: http://leafletjs.com/examples/quick-start.html
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

// see: http://developers.cartodb.com/tutorials/toggle_map_view.html



var tilestyler = function(era) {
  var tilestyle = "#richlemur {line-color:#FFFFFF; line-width:1; line-opacity:0.4; polygon-opacity:0.7;}"
  var labels = labeler(era)
  
  tilestyle = tilestyle + " #richlemur ["+ era + "<=" + labels.r5 + "] {polygon-fill:#253494} #richlemur ["+ era + "<=" + labels.r4 + "] {polygon-fill:#2C7FB8} #richlemur ["+ era + "<=" + labels.r3 + "] {polygon-fill:#41B6C4} #richlemur ["+ era + "<=" + labels.r2 + "] {polygon-fill:#A1DAB4} #richlemur ["+ era + "<=" + labels.r1 + "] {polygon-fill:#FFFFCC}"
  return tilestyle
}


var renderMap = function(era) {

  if (typeof mapLayer != 'undefined') {
    mapLayer.setMap(null);
  }

  mapLayer = new CartoDBLayer({
    map: map,
    user_name:"rebioma",
    table_name:"richlemur",
    interactivity: "grid_code",
    tile_style: tilestyler(era)
  }); // new cartodb map

  mapLayer.options.featureOut = function() {
      map.setOptions({draggableCursor: 'default'});
  };

  mapLayer.options.featureOver = function(ev, latlng, pos, data) {
    map.setOptions({draggableCursor: 'pointer'});
  };

  mapLayer.options.featureClick = function(ev, latlng, pos, data) {
      // Set popup content
      var labels = labeler(era);

      var html = '';
      for(var column in data) {
        html += '<label>' + column + '</label>';
        html += '<p>' + data[column] + '</p>';
      }
      var
      sql = "SELECT ST_AsGeoJSON(the_geom) as geoj FROM richlemur WHERE grid_code = " + data[column],
      url = "http://rebioma.cartodb.com/api/v2/sql?q=" + sql;

      $.getJSON(url,
        function(response){
        var
          poly   = new Array();
          coords = JSON.parse(response.rows[0].geoj).coordinates[0][0];
          var first_long = 0;
          var last_long = 0;
          var first_lat = 0;
          var last_lat = 0;
          var lat_ave = -17.9990;
          var long_ave = 47.5222;

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
          f_long = parseFloat(first_long.toFixed(4));
          f_lat = parseFloat(first_lat.toFixed(4));
          l_long = parseFloat(last_long.toFixed(4));
          l_lat = parseFloat(last_lat.toFixed(4));
          lat_ave = ((f_lat + l_lat) / 2);
          long_ave = ((f_long + l_long) / 2);
          poly.pop();
          drawPolygon(poly);
          var center = new google.maps.LatLng(lat_ave, long_ave); // 8/13
          map.setCenter(center);
      })

      $.ajax({
        type: "GET",
        dataType: 'json',
        url: 'cells/',
        data: {'id': data[column], 'era': era},
        success: function(response) {
          $('#results-pane').dialog("option","title","Found: " + response["size"] + " species in " + eraName(era));
          $('#results-pane').dialog("open");
          $("div#results-pane").html(response["list"]);
        }
      })
    }; // map feature click
} // renderLayer

$(document).ready(function() {

  map = createNewMap()
  createSelectorPane()
  createResultsPane()

  $('.buttons button').click(switchEras)


}) // doc ready

var switchEras = function() {
  var era = this.value
  focusButton( this );
  renderMap(era);
  createMapKey(era);
}

var focusButton = function(button) {
  $button = $( button )
  $button.focus();
  $button.closest('div').find('button.selected').removeClass('selected');
  $button.addClass('selected');
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







