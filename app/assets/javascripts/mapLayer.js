function MapLayer(era,map) {
  this.era = era;
  this.map = map;

  this.user_name = "rebioma";
  this.table_name = "richlemur";
  this.interactivity = "grid_code";

  this.tile_style = this.tilestyler(this.era);
}

MapLayer.prototype.tilestyler = function(era) {
  var tilestyle = "#richlemur {line-color:#FFFFFF; line-width:1; line-opacity:0.4; polygon-opacity:0.7;}"
  var labels = View.labeler(era)

  tilestyle = tilestyle + " #richlemur ["+ era + "<=" + labels.r5 + "] {polygon-fill:#253494} #richlemur ["+ era + "<=" + labels.r4 + "] {polygon-fill:#2C7FB8} #richlemur ["+ era + "<=" + labels.r3 + "] {polygon-fill:#41B6C4} #richlemur ["+ era + "<=" + labels.r2 + "] {polygon-fill:#A1DAB4} #richlemur ["+ era + "<=" + labels.r1 + "] {polygon-fill:#FFFFCC}"
  return tilestyle
}

MapLayer.prototype.featureOut = function() {
  this.map.setOptions({draggableCursor: 'default'});
}

MapLayer.prototype.featureOver = function() {
  this.map.setOptions({draggableCursor: 'pointer'});
}


var createMapLayer = function(era, map) {

  if (typeof newMapLayer != 'undefined') { newMapLayer.setMap(null); }

  var newMapLayer = new MapLayer(era,map)
  newMapLayer = new CartoDBLayer({
    map: newMapLayer.map,
    user_name: newMapLayer.user_name,
    table_name: newMapLayer.table_name,
    interactivity: newMapLayer.interactivity,
    tile_style: newMapLayer.tile_style,
    featureOut: newMapLayer.featureOut,
    featureOver: newMapLayer.featureOver,
    featureClick: featureClicker
  })
}






