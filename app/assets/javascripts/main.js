$(document).ready(function() {

  googleMap.createNewMap()
  View.createSelectorPane()
  View.createResultsPane()

  $('.buttons button').click(Controller.switchEras)

  // Load basic-modal dialog on click
  $('#basic-modal .basic').click(function (e) {
    $('#basic-modal-content').modal();
    return false;
  });

}) // doc ready

