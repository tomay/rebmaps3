var View = {
  labeler: function(era) {
    labels = {}
    labels["curr"] = {"r1": 3,"r2": 5,"r3": 8,"r4": 10,"r5": 13 }
    labels["a2100"] = {"r1": 3,"r2": 5,"r3": 6,"r4": 8,"r5": 10 }
    labels["b2100"] = {"r1": 3,"r2": 5,"r3": 8,"r4": 10,"r5": 12 }
    return labels[era]
  },

  eraName: function(era) {
    names = { "curr" : "Current", "a2100" : '2100 A2a', "b2100" : "2100 B2a" }
    return names[era]
  },

  rangeCreator: function(high,low) {
    if (!low) { return 0 + '-' + high };
    if ((low + 1) === high) { return high.toString() };
    return (low + 1) + '-' + high
  },

  createMapKey: function(era) {
    var labels = this.labeler(era)
    $('#legend-one-range').text(this.rangeCreator(labels.r1));
    $('#legend-two-range').text(this.rangeCreator(labels.r2,labels.r1));
    $('#legend-three-range').text(this.rangeCreator(labels.r3,labels.r2));
    $('#legend-four-range').text(this.rangeCreator(labels.r4,labels.r3));
    $('#legend-five-range').text(this.rangeCreator(labels.r5,labels.r4));
    $('#legend-title').text("Number of Species in " + this.eraName(era))
    $('.wax-legend').show();
  },

  createSelectorPane: function() {
    $('#selector-pane').dialog({
      autoOpen: true,
      title: 'Lemur species richness',
      minWidth: 50,
      width: 320,
      height: 160,
      position: [10, 5]
    });
  },

  createResultsPane: function() {
    $('#results-pane').dialog({
      autoOpen: false,
      title: 'Species',
      minWidth: 50,
      height: 230,
      width: 320,
      overflow: 'auto',
      position: [10, 180]
    })
  },

  updateResults: function(response) {
    $('#results-pane').dialog("option","title","Found: " + response["size"] + " species in " + View.eraName(response["era"]));
    $('#results-pane').dialog("open");
    $("div#results-pane").html(response["list"]);
  },

  focusButton: function(button) {
    $button = $( button )
    $button.focus();
    $button.closest('div').find('button.selected').removeClass('selected');
    $button.addClass('selected');
  }
}
