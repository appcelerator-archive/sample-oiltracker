var win = Ti.UI.currentWindow;

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

var xhr = Titanium.Network.createHTTPClient();
xhr.onload = function() {
  var annotations = [];
  var results = JSON.parse(this.responseText);
  for (var i = 0; i < results.length; i++) {
    var rpt = results[i];
    var annotation = Titanium.Map.createAnnotation({
    	latitude:rpt.latitude,
    	longitude:rpt.longitude,
    	title:rpt.description,
    	subtitle:rpt.wildlife,
    	pincolor:Titanium.Map.ANNOTATION_RED,
    	animate:true,
    	leftImage: (rpt.media != null) ? rpt.media.tiny : "radar.png"
    });
    annotations.push(annotation);
  }
  mapview.removeAllAnnotations();
  mapview.addAnnotations(annotations);
};
xhr.open("GET","http://oilreporter.org/reports.json?api_key=59e99e4251278ec00f4e435bac5bad8422224a3c");
xhr.send();