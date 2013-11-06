$(document).ready(function() {

  var map = createNewMap()
  View.createSelectorPane()
  View.createResultsPane()

  $('.buttons button').click(switchEras)

}) // doc ready

var switchEras = function() {
  var era = this.value
  focusButton( this );
  createMapLayer(era, map);
  View.createMapKey(era);
}

var focusButton = function(button) {
  $button = $( button )
  $button.focus();
  $button.closest('div').find('button.selected').removeClass('selected');
  $button.addClass('selected');
}
