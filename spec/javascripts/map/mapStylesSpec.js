describe("map styles", function() {
  var labels;
  var mapKey;
  var tileStyles;
  var era = "curr";

  beforeEach(function() {
    $('body').append('<li class="legend-one"></li>');
    $('.legend-one').append('<span id="legend-one-box"></span>');
    $('.legend-one').append('<span id="legend-one-range"></span>');
    $('body').append('<li class="legend-two"></li>');
    $('.legend-two').append('<span id="legend-two-box"></span>');
    $('.legend-two').append('<span id="legend-two-range"></span>');
    $('body').append('<li class="legend-three"></li>');
    $('.legend-three').append('<span id="legend-three-box"></span>');
    $('.legend-three').append('<span id="legend-three-range"></span>');
    $('body').append('<li class="legend-four"></li>');
    $('.legend-four').append('<span id="legend-four-box"></span>');
    $('.legend-four').append('<span id="legend-four-range"></span>');
    $('body').append('<li class="legend-five"></li>');
    $('.legend-five').append('<span id="legend-five-box"></span>');
    $('.legend-five').append('<span id="legend-five-range"></span>');
    $('body').append('<div id="legend-title"></div>');

    $('body').append('<div class="buttons"></div>')
    $('.buttons').append('<button class="" autofocus="" type="button" value="curr">Current</button>')
    $('.buttons').append('<button type="button" value="a2100">2100 A2a</button>')
    $('.buttons').append('<button type="button" value="b2100" class="last selected">2100 B2a</button>')

    labels = View.labeler(era);
    mapKey = View.createMapKey(era);
    tileStyles =  new MapLayer(era).tile_style;
  });

  afterEach(function() {
    $('.legend-one').remove();
    $('.legend-two').remove();
    $('.legend-three').remove();
    $('.legend-four').remove();
    $('.legend-five').remove();
    $('#legend-title').remove();
    $('.buttons').remove();
  })

  it("should correctly render labels", function() {
    expect(labels).toEqual({ r1 : 3, r2 : 5, r3 : 8, r4 : 10, r5 : 13 });
  });

  it("should correctly render tile styles", function() {
    expect(tileStyles).toEqual("#richlemur {line-color:#FFFFFF; line-width:1; line-opacity:0.4; polygon-opacity:0.7;} #richlemur [curr<=13] {polygon-fill:#253494} #richlemur [curr<=10] {polygon-fill:#2C7FB8} #richlemur [curr<=8] {polygon-fill:#41B6C4} #richlemur [curr<=5] {polygon-fill:#A1DAB4} #richlemur [curr<=3] {polygon-fill:#FFFFCC}")
  });

  it("should correctly generate map key one", function() {
    expect($('.legend-one').html()).toEqual('<span id="legend-one-box"></span><span id="legend-one-range">0-3</span>')
  });

  it("should correctly generate map key two", function() {
    expect($('.legend-two').html()).toEqual('<span id="legend-two-box"></span><span id="legend-two-range">4-5</span>')
  });

  it("should correctly generate map key three", function() {
    expect($('.legend-three').html()).toEqual('<span id="legend-three-box"></span><span id="legend-three-range">6-8</span>')
  });

  it("should correctly generate map key four", function() {
    expect($('.legend-four').html()).toEqual('<span id="legend-four-box"></span><span id="legend-four-range">9-10</span>')
  });

  it("should correctly generate map key five", function() {
    expect($('.legend-five').html()).toEqual('<span id="legend-five-box"></span><span id="legend-five-range">11-13</span>')
  });

  it("should correctly generate map key title", function() {
    expect($('#legend-title').html()).toEqual('Number of Species in Current')
  });

  it("should add selected class to selected button", function() {
    $button = $('.buttons button')[2]
    View.focusButton($button)
    expect($button).toHaveClass("selected")
  })
});


describe("controller", function() {
  var era = "curr";
  var gridId = 37711

  beforeEach(function() {
    $('body').append('<div id="results-pane"></div>');
  })

  it("should return species list", function(){
    Controller.getSpeciesList(era,gridId)
    expect($("div#results-pane").html()).toEqual("Yo momma")
  })
});
