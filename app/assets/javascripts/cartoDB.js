var CartoDB = {
  getUrl: function(gridId) {
    sql = "SELECT ST_AsGeoJSON(the_geom) as geoj FROM richlemur WHERE grid_code = " + gridId,
    url = "http://rebioma.cartodb.com/api/v2/sql?q=" + sql;
    return url
  },

  parseCartoDBResponse: function(cartoDBResponse) {
    return JSON.parse(cartoDBResponse.rows[0].geoj).coordinates[0][0];
  },

  parseGeoJSON: function(geoJSON) {
    var first_long, last_long, first_lat, last_lat

    for (j in geoJSON) {
      if (j==0) {
        firstLong = geoJSON[j][0];
        firstLat = geoJSON[j][1];
      }
      else if (j==2) {
        lastLong = geoJSON[j][0];
        lastLat = geoJSON[j][1];
      }
    }
    return {firstLong: firstLong, lastLong: lastLong, firstLat: firstLat, lastLat: lastLat }
  }

}