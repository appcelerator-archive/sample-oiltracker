var win = Ti.UI.currentWindow;
var annotations = [];
var annotationsMeta = [];

//Allow client-side filtering of results
var filters = Ti.UI.createView({
  height:200,
  width:200,
  opacity:0.85,
  borderRadius:5,
  backgroundColor:"#cdcdcd",
  borderColor:"#787878",
  zIndex:10,
  layout:"vertical",
  visible:false
});

filters.add(Ti.UI.createLabel({
  text:"Oil Thickness",
  top:20,
  left:10,
  right:10,
  height:"auto"
}));

var thickness = Ti.UI.createSlider({
  min:0,
  max:10,
  value:10,
  height:40,
  top:10,
  left:10,
  right:10
});
filters.add(thickness);

filters.add(Ti.UI.createLabel({
  text:"Wetlands Damage",
  height:"auto",
  top:10,
  left:10,
  right:10
}));

var wetlands = Ti.UI.createSlider({
  min:0,
  max:10,
  value:10,
  height:40,
  top:10,
  left:10,
  right:10
});
filters.add(wetlands);
win.add(filters);

// Show/hide filter options
var filtersButton = Ti.UI.createView({
  height:34,
  width:34,
  opacity:0.65,
  borderRadius:5,
  bottom:8,
  right:8,
  backgroundColor:"#cdcdcd",
  borderColor:"#787878",
  zIndex:10
});

filtersButton.addEventListener("click", function() {
  filters.visible = !filters.visible;
});

var showFilters = Ti.UI.createImageView({
  url:"options.png",
  height:32,
  width:32,
  top:1,
  right:1
});
filtersButton.add(showFilters);
win.add(filtersButton);

// Create Oil Tracker Map
var mapview = Titanium.Map.createView({
	mapType: Titanium.Map.SATELLITE_TYPE,
	region: {latitude:27.19042, longitude:-88.7649, latitudeDelta:14.5, longitudeDelta:13},
	animate:true,
	regionFit:true,
	userLocation:true,
	top:0,
	left:0
});
win.add(mapview);

//Do initial fetch of Oil Reporter Data
var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() {
  try {
    var results = JSON.parse(this.responseText);
    for (var i = 0; i < results.length; i++) {
      var rpt = results[i];
      var annotation = Titanium.Map.createAnnotation({
      	latitude:rpt.latitude,
      	longitude:rpt.longitude,
      	title:rpt.description,
      	subtitle:rpt.wildlife,
      	pincolor:Titanium.Map.ANNOTATION_RED
      });
      annotationsMeta.push({
        oil:rpt.oil,
        wetlands:rpt.wetlands
      });
      annotations.push(annotation);
    }
    mapview.removeAllAnnotations();
    mapview.addAnnotations(annotations);
  } catch(e) {
    Ti.API.info(e);
  }
};
xhr.open("GET","http://oilreporter.org/reports.json?api_key=59e99e4251278ec00f4e435bac5bad8422224a3c");
xhr.send();

wetlands.addEventListener("change", function(e) {
  var displayed = [];
  for (var i = 0; i < annotations.length; i++) {
    if (annotationsMeta[i].wetlands <= e.value) {
      displayed.push(annotations[i]);
    }
  }
  mapview.removeAllAnnotations();
  mapview.addAnnotations(displayed);
});

thickness.addEventListener("change", function(e) {
  var displayed = [];
  for (var i = 0; i < annotations.length; i++) {
    if (annotationsMeta[i].oil <= e.value) {
      displayed.push(annotations[i]);
    }
  }
  mapview.removeAllAnnotations();
  mapview.addAnnotations(displayed);
});