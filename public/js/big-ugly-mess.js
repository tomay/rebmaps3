var
polys = new Array(),
layer = null,
cartodb2_gmapsv3 = null,
era = "0",
r1, r2, r3, r4, r5, era_label,
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
var renderLayer = function() {
  var query = "SELECT * FROM {{table_name}}";
  var tilestyle = "#richlemur {line-color:#FFFFFF; line-width:1; line-opacity:0.4; polygon-opacity:0.7;}"

  if (era == "curr")
    {
    r1 = 3;
    r2 = 5;
    r3 = 8;
    r4 = 10;
    r5 = 13
    era_label = "current"
    }
  else if (era == "a2100")
    {
    r1 = 3;
    r2 = 5;
    r3 = 6;
    r4 = 8;
    r5 = 10
    era_label = "2100 A2a"
    }
  else // era == 2100b
    {
    r1 = 3;
    r2 = 5;
    r3 = 8;
    r4 = 10;
    r5 = 12
    era_label = "2100 B2a"
    }

    tilestyle = tilestyle + " #richlemur ["+ era + "<=" + r5.toString() + "] {polygon-fill:#253494} #richlemur ["+ era + "<=" + r4.toString() + "] {polygon-fill:#2C7FB8} #richlemur ["+ era + "<=" + r3.toString() + "] {polygon-fill:#41B6C4} #richlemur ["+ era + "<=" + r2.toString() + "] {polygon-fill:#A1DAB4} #richlemur ["+ era + "<=" + r1.toString() + "] {polygon-fill:#FFFFCC}"
  if (cartodb2_gmapsv3) {
    cartodb2_gmapsv3.setMap(null);
    //return;
  }

  cartodb2_gmapsv3 = new CartoDBLayer({
  map: map,
  user_name:"rebioma",
  table_name:"richlemur",
  query: query,
  interactivity: "grid_code",
  tile_style: tilestyle,
  featureOver: function(ev, latlng, pos, data) {
    map.setOptions({draggableCursor: 'pointer'});
  },
  featureOut: function() {
    map.setOptions({draggableCursor: 'default'});
  },
  featureClick: function(ev, latlng, pos, data) {
    // Set popup content
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
        $('#results').dialog("option","title","Found: " + response["size"] + " species in " + era_label);
        $('#results').dialog("open");
        $("div#results").html(response["list"]);
      }
    })
  }, // map feature click
  auto_bound: false,
  debug: false
  }); // new cartodb map

$('.legend-one').html("<li><span style='background:#FFFFCC;'></span>0-" + r1 + "</li>");
$('.legend-two').html("<li><span style='background:#A1DAB4;'></span>" + (r1 + 1).toString() + "-" + r2.toString() + "</li>");
$('.legend-three').html("<li><span style='background:#41B6C4;'></span>" + (r2 + 1).toString() + "-" + r3.toString() + "</li>");
$('.legend-four').html("<li><span style='background:#2C7FB8;'></span>" + (r3 + 1).toString() + "-" + r4.toString() + "</li>");
$('.legend-five').html("<li><span style='background:#253494;'></span>" + (r4 + 1).toString() + "-" + r5.toString() + "</li>");
$('.legend-title').html("Number of Species in " + era_label)
$('.wax-legend').show();

} // renderLayer

// Modal
var modal = (function(){
  var
  method = {},
  $overlay,
  $modal,
  $content,
  $close;

  // Center the modal in the viewport
  method.center = function () {
  var top, left;

  top = Math.max($(window).height() - $modal.outerHeight(), 0) / 2;
  left = Math.max($(window).width() - $modal.outerWidth(), 0) / 2;

  $modal.css({
    top:top + $(window).scrollTop(),
    left:left + $(window).scrollLeft()
    });
  };

  // Open the modal
  method.open = function (settings) {
    $content.empty().append(settings.content);

    $modal.css({
      width: settings.width || 'auto',
      height: settings.height || 'auto'
    });

    method.center();
    $(window).bind('resize.modal', method.center);
    $modal.show();
    $overlay.show();
  };

  // Close the modal
  method.close = function () {
    $modal.hide();
    $overlay.hide();
    $content.empty();
    $(window).unbind('resize.modal');
  };

// Generate the HTML and add it to the document
$overlay = $('<div id="overlay"></div>');
$modal = $('<div id="modal"></div>');
$content = $('<div id="content"></div>');
$close = $('<a id="close" href="#">close</a>');

$modal.hide();
$overlay.hide();
$modal.append($content, $close);

$(document).ready(function(){
 $('body').append($overlay, $modal);
});

$close.click(function(e){
  e.preventDefault();
  method.close();
});

return method;
}());

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

//   map = new L.Map('map', {
//     center: [-18.9,47.52],
//     zoom: 9
//   })
// //https://c.tiles.mapbox.com/v3/examples.map-9ijuk24y/12/252/1798.png
//   L.tileLayer('https://c.tiles.mapbox.com/v3/examples.map-9ijuk24y/{z}/{x}/{y}.png', {
//     zoomControl: false
//   }).addTo(map);

//   new L.Control.Zoom({ position: 'topright' }).addTo(map);

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
    //alert(era);
    renderLayer();
    });

  // open modal dialog
  $('a#source').click(function(e){
    modal.open({content: "<p><b>About this map</b><br><p>This map shows a snapshot of biodiversity data derived from species distribution models hosted on the <a href='http://data.rebioma.net'>REBIOMA</a> data portal. This is a prototype of mapping and data interaction tools we are working to integrate on top of the data portal.</p><p>We model species distributions for three eras from public and private occurrence data uploaded by many individuals and <a href='http://www.rebioma.net/index.php?option=com_content&view=article&id=41%3Aacknowledgement-for-taxonomic-expertise&catid=23%3Aexperts&Itemid=100017&lang=en'>partner institutions</a>.</p><p>After validation and review of the occurrence data by teams of taxonomic experts, we use MaxEnt to model species distributions from the database, using forest cover and <a href='http://www.worldclim.org'>WorldClim</a> climate data for 2000, and 2100 as predictors. For 2100, we use environmental data derived from two emissions scenarios, A2a and B2a. We then apply a presence threshold to each model, and use the result to build the map of species richness and a species list for each era, shown here. Richness and species lists are calculated on a 5x5 km grid. </p><p>REBIOMA is a joint project Wildlife Conservation Society Madagascar, and the University of California Berkeley with support from the MacArthur Foundation and the JRS Biodiversity Foundation. For more information, please see the <a href='http://rebioma.net'>project page</a>, <a href='http://data.rebioma.net'>data portal</a>, and <a href='https://sites.google.com/site/rebiomahelp/'>help pages</a>."});
    e.preventDefault();
  });

}) // doc ready

