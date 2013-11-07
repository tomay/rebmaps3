$(document).ready(function() {

  googleMap.createNewMap()
  View.createSelectorPane()
  View.createResultsPane()

  $('.buttons button').click(Controller.switchEras)

}) // doc ready

