/*
 * SimpleModal Basic Modal Dialog
 * http://www.ericmmartin.com/projects/simplemodal/
 * http://code.google.com/p/simplemodal/
 *
 * Copyright (c) 2010 Eric Martin - http://ericmmartin.com
 *
 * Licensed under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 *
 * Revision: $Id: basic.js 254 2010-07-23 05:14:44Z emartin24 $
 */

jQuery(function ($) {
  // Load dialog on page load
  //$('#basic-modal-content').modal();

  // Load dialog on click
  $('#basic-modal .basic').click(function (e) {
    $('#basic-modal-content').modal();
    return false;
  });

  $('a#source').click(function(e){
    modal.open({content: "<p><b>About this map</b><br><p>This map shows a snapshot of biodiversity data derived from species distribution models hosted on the <a href='http://data.rebioma.net'>REBIOMA</a> data portal. This is a prototype of mapping and data interaction tools we are working to integrate on top of the data portal.</p><p>We model species distributions for three eras from public and private occurrence data uploaded by many individuals and <a href='http://www.rebioma.net/index.php?option=com_content&view=article&id=41%3Aacknowledgement-for-taxonomic-expertise&catid=23%3Aexperts&Itemid=100017&lang=en'>partner institutions</a>.</p><p>After validation and review of the occurrence data by teams of taxonomic experts, we use MaxEnt to model species distributions from the database, using forest cover and <a href='http://www.worldclim.org'>WorldClim</a> climate data for 2000, and 2100 as predictors. For 2100, we use environmental data derived from two emissions scenarios, A2a and B2a. We then apply a presence threshold to each model, and use the result to build the map of species richness and a species list for each era, shown here. Richness and species lists are calculated on a 5x5 km grid. </p><p>REBIOMA is a joint project Wildlife Conservation Society Madagascar, and the University of California Berkeley with support from the MacArthur Foundation and the JRS Biodiversity Foundation. For more information, please see the <a href='http://rebioma.net'>project page</a>, <a href='http://data.rebioma.net'>data portal</a>, and <a href='https://sites.google.com/site/rebiomahelp/'>help pages</a>."});
    e.preventDefault();
  });

});

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
