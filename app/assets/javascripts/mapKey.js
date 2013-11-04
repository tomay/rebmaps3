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
