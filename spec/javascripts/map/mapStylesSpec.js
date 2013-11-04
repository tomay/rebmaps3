describe("map styles", function() {
  var labels;
  var tileStyle;
  var spanStyle;
  var mapKey;
  var legendOneElem;

  beforeEach(function() {
    $('body').append('<li class="legend-one"></li>');
    $('body').append('<li class="legend-two"></li>');
    $('body').append('<li class="legend-three"></li>');
    $('body').append('<li class="legend-four"></li>');
    $('body').append('<li class="legend-five"></li>');
    $('body').append('<li class="legend-title"></li>');

    labels = mapStyles.labeler("curr");
    tileStyle = mapStyles.tileStyler("curr");
    spanStyle = mapStyles.generateHtmlSpanStyle("#FFFFCC")
    mapKey = mapStyles.createMapKey("curr")
  });

  afterEach(function() {
    $('.legend-one').remove();
    $('.legend-two').remove();
    $('.legend-three').remove();
    $('.legend-four').remove();
    $('.legend-five').remove();
    $('.legend-title').remove();
  })

  it("should correctly render labels", function() {
    expect(labels).toEqual({"r1": "3","r2": "5","r3": "8","r4": "10","r5": "13", "era_label": "current"});
  });

  it("should correctly render tile styles", function() {
    expect(tileStyle).toEqual("#richlemur {line-color:#FFFFFF; line-width:1; line-opacity:0.4; polygon-opacity:0.7;} #richlemur [curr<=13] {polygon-fill:#253494} #richlemur [curr<=10] {polygon-fill:#2C7FB8} #richlemur [curr<=8] {polygon-fill:#41B6C4} #richlemur [curr<=5] {polygon-fill:#A1DAB4} #richlemur [curr<=3] {polygon-fill:#FFFFCC}");
  });

  it("should correctly render span styles", function() {
    expect(spanStyle).toEqual("<span style='background:#FFFFCC;'></span>");
  });

  it("should correctly generate map key one", function() {
    expect($('.legend-one').html()).toEqual('<li><span style="background:#FFFFCC;"></span>0-3</li>')
  });

  it("should correctly generate map key two", function() {
    expect($('.legend-two').html()).toEqual('<li><span style="background:#A1DAB4;"></span>4-5</li>')
  });

  it("should correctly generate map key three", function() {
    expect($('.legend-three').html()).toEqual('<li><span style="background:#41B6C4;"></span>6-8</li>')
  });

  it("should correctly generate map key four", function() {
    expect($('.legend-four').html()).toEqual('<li><span style="background:#2C7FB8;"></span>9-10</li>')
  });

  it("should correctly generate map key five", function() {
    expect($('.legend-five').html()).toEqual('<li><span style="background:#253494;"></span>11-13</li>')
  });

  it("should correctly generate map key title", function() {
    expect($('.legend-title').html()).toEqual('Number of Species in current')
  });

});