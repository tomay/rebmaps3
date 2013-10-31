var
polys = new Array(),
layer = null,
cartodb2_gmapsv3 = null,
era = "0",
map;

var mapStyles = {
  drawPolygon: function(poly) {
    // Clear existing polygon
    for (i in polys) {
      polys[i].setMap(null);
    }
    // Construct the new polygon
    poly = new google.maps.Polygon({
      paths: poly, strokeColor: '#000000',
      strokeOpacity: 0, strokeWeight: 2,
      fillColor: "#FF6600",
      fillOpacity: 0.9
    });
    poly.setMap(map);
    polys.push(poly);
  },

  labeler: function(era) {
    labels = {}
    labels["curr"] = {"r1": "3","r2": "5","r3": "8","r4": "10","r5": "13", "era_label": "current"}
    labels["a2100"] = {"r1": "3","r2": "5","r3": "6","r4": "8","r5": "10", "era_label": "2100 A2a"}
    labels["b2100"] = {"r1": "3","r2": "5","r3": "8","r4": "10","r5": "12", "era_label": "2100 B2a"}
    return labels[era]
  },

  tileStyler: function(era) {
    var tilestyle = "#richlemur {line-color:#FFFFFF; line-width:1; line-opacity:0.4; polygon-opacity:0.7;}"
    var labels = mapStyles.labeler(era)
    tilestyle = tilestyle + " #richlemur ["+ era + "<=" + labels.r5 + "] {polygon-fill:#253494} #richlemur ["+ era + "<=" + labels.r4 + "] {polygon-fill:#2C7FB8} #richlemur ["+ era + "<=" + labels.r3 + "] {polygon-fill:#41B6C4} #richlemur ["+ era + "<=" + labels.r2 + "] {polygon-fill:#A1DAB4} #richlemur ["+ era + "<=" + labels.r1 + "] {polygon-fill:#FFFFCC}"
    return tilestyle
  },

  generateHtmlSpanStyle: function(colorHex) {
    return "<span style='background:" + colorHex + ";'></span>"
  },

  createMapKey: function(era) {
    var labels = mapStyles.labeler(era)
    $('.legend-one').html("<li>" + mapStyles.generateHtmlSpanStyle("#FFFFCC") + "0-" + labels.r1 + "</li>");
    $('.legend-two').html("<li>" + mapStyles.generateHtmlSpanStyle("#A1DAB4") + (parseInt(labels.r1) + 1).toString() + "-" + labels.r2 + "</li>");
    $('.legend-three').html("<li>" + mapStyles.generateHtmlSpanStyle("#41B6C4") + (parseInt(labels.r2) + 1).toString() + "-" + labels.r3 + "</li>");
    $('.legend-four').html("<li>" + mapStyles.generateHtmlSpanStyle("#2C7FB8") + (parseInt(labels.r3) + 1).toString() + "-" + labels.r4 + "</li>");
    $('.legend-five').html("<li>" + mapStyles.generateHtmlSpanStyle("#253494") + (parseInt(labels.r4) + 1).toString() + "-" + labels.r5 + "</li>");
    $('.legend-title').html("Number of Species in " + labels.era_label)
    $('.wax-legend').show();
  }
}

var mapProvider = {
  getSpeciesList: function(era, gridCode) {
    var labels = mapStyles.labeler(era);
    $.ajax({
      type: "GET",
      dataType: 'json',
      url: 'cells/',
      data: {'id': gridCode, 'era': era},
      success: function(response) {
        $('#results').dialog("option","title","Found: " + response["size"] + " species in " + labels.era_label);
        $('#results').dialog("open");
        $("div#results").html(response["list"]);
      }
    })
  },

  getMapCenter: function(response) {
    var poly   = new Array();
    var coords = JSON.parse(response.rows[0].geoj).coordinates[0][0];
    var first_long, last_long, first_lat, last_lat;

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
    mapStyles.drawPolygon(poly);
    var lat_ave = ((parseFloat(first_lat.toFixed(4)) + parseFloat(last_lat.toFixed(4))) / 2);
    var long_ave = ((parseFloat(first_long.toFixed(4)) + parseFloat(last_long.toFixed(4))) / 2);
    var center = new google.maps.LatLng(lat_ave, long_ave);
    return center
  }
}


var renderLayer = function() {
  var query = "SELECT * FROM {{table_name}}";

  if (cartodb2_gmapsv3) {
    cartodb2_gmapsv3.setMap(null);
  }

  cartodb2_gmapsv3 = new CartoDBLayer({
    map: map,
    user_name:"rebioma",
    table_name:"richlemur",
    query: query,
    interactivity: "grid_code",
    tile_style: mapStyles.tileStyler(era),
    featureOver: function(ev, latlng, pos, data) {
      map.setOptions({draggableCursor: 'pointer'});
    },
    featureOut: function() {
      map.setOptions({draggableCursor: 'default'});
    },
    featureClick: function(ev, latlng, pos, data) {
      var
      sql = "SELECT ST_AsGeoJSON(the_geom) as geoj FROM richlemur WHERE grid_code = " + data.grid_code,
      url = "http://rebioma.cartodb.com/api/v2/sql?q=" + sql;

      $.getJSON(url,
          function(response){
            map.setCenter(mapProvider.getMapCenter(response));
        })

      mapProvider.getSpeciesList(era, data.grid_code)

    }, // map feature click
    auto_bound: false,
    debug: false
  }); // new cartodb map
  mapStyles.createMapKey(era)
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
    overflow: 'none',
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
    renderLayer();
  });
}) // doc ready
