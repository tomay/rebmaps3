function MapLayer(era) {
  this.era = era;
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

