var
polys = new Array(),
layer = null,
mapLayer = null,
era = "0",
map;

// Leaflet example: http://leafletjs.com/examples/quick-start.html
function drawPolygon(poly) {
  // First we erase the previous polygon
  for (i in polys) {
  polys[i].setMap(null);
  }

  // Construct the polygon
  poly = new google.maps.Polygon({
  paths: poly, strokeColor: '#000000',
  strokeOpacity: 0, strokeWeight: 2,
  fillColor: "#FF6600",
  fillOpacity: 0.9
  });

  poly.setMap(map);
  polys.push(poly);
}

// see: http://developers.cartodb.com/tutorials/toggle_map_view.html

var labeler = function(era) {
  labels = {}
  labels["curr"] = {"r1": 3,"r2": 5,"r3": 8,"r4": 10,"r5": 13 }
  labels["a2100"] = {"r1": 3,"r2": 5,"r3": 6,"r4": 8,"r5": 10 }
  labels["b2100"] = {"r1": 3,"r2": 5,"r3": 8,"r4": 10,"r5": 12 }

  return labels[era]
} 

var eraName = function(era) {
  names = { "curr" : "Current", "a2100" : '2100 A2a', "b2100" : "2100 B2a" }
  return names[era]
}

var tilestyler = function(era) {
  var tilestyle = "#richlemur {line-color:#FFFFFF; line-width:1; line-opacity:0.4; polygon-opacity:0.7;}"
  var labels = labeler(era)
  
  tilestyle = tilestyle + " #richlemur ["+ era + "<=" + labels.r5 + "] {polygon-fill:#253494} #richlemur ["+ era + "<=" + labels.r4 + "] {polygon-fill:#2C7FB8} #richlemur ["+ era + "<=" + labels.r3 + "] {polygon-fill:#41B6C4} #richlemur ["+ era + "<=" + labels.r2 + "] {polygon-fill:#A1DAB4} #richlemur ["+ era + "<=" + labels.r1 + "] {polygon-fill:#FFFFCC}"
  return tilestyle
}

var rangeCreator = function(high,low) {
  if (!low) { return 0 + '-' + high };
  if ((low + 1) === high) { return high.toString() };
  return (low + 1) + '-' + high
}

var createMapKey = function(era) {
  var labels = labeler(era)
  $('#legend-one-range').text(rangeCreator(labels.r1));
  $('#legend-two-range').text(rangeCreator(labels.r2,labels.r1));
  $('#legend-three-range').text(rangeCreator(labels.r3,labels.r2));
  $('#legend-four-range').text(rangeCreator(labels.r4,labels.r3));
  $('#legend-five-range').text(rangeCreator(labels.r5,labels.r4));
  $('#legend-title').text("Number of Species in " + eraName(era))
  $('.wax-legend').show();
}

var switchLayers = function(era) {
  renderMap(era);
  createMapKey(era);
};

var renderMap = function(era) {

  if (mapLayer) {
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
          $('#results').dialog("option","title","Found: " + response["size"] + " species in " + eraName(era));
          $('#results').dialog("open");
          $("div#results").html(response["list"]);
        }
      })
    }; // map feature click
} // renderLayer

$(document).ready(function() {
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

  var $layers = $('#layers').dialog({
    autoOpen: true,
    title: 'Lemur species richness',
    minWidth: 50,
    width: 320,
    height: 160,
    position: [10, 5]
  });

  var $results = $('#results').dialog({
    autoOpen: false,
    title: 'Species',
    minWidth: 50,
    height: 230,
    width: 320,
    overflow: 'auto',
    position: [10, 180]
  });

  // Bind the buttons
  $('.buttons button').click(function(){
    $(this).focus();
    era = $(this).val();

    $(this).closest('div').find('button.selected').removeClass('selected');
    $(this).addClass('selected');

    switchLayers(era);
    });


}) // doc ready

