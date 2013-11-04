// Leaflet example: http://leafletjs.com/examples/quick-start.html
// see: http://developers.cartodb.com/tutorials/toggle_map_view.html

$(document).ready(function() {

  var map = createNewMap()
  View.createSelectorPane()
  View.createResultsPane()

  $('.buttons button').click(switchEras)


}) // doc ready

var switchEras = function() {
  var era = this.value
  focusButton( this );
  renderMap(era);
  createMapKey(era);
}

var focusButton = function(button) {
  $button = $( button )
  $button.focus();
  $button.closest('div').find('button.selected').removeClass('selected');
  $button.addClass('selected');
}
