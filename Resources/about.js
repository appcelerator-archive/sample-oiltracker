var win = Ti.UI.currentWindow;

var container = Ti.UI.createView({
  borderRadius:10,
  width:"auto",
  height:130,
  left:15,
  right:15,
  backgroundColor:"#000",
  opacity:0.55
});

container.add(Ti.UI.createLabel({
  text:"Oil Tracker demonstrates how organizations can leverage data from OilReporter.org to integrate Oil Spill data into their own applications.  To get started, visit oilreporter.org/setup - and thanks!",
  textAlign:"center",
  color:"#fff",
  font:{fontSize:14},
  height:"auto",
  width:"auto",
  top:10,
  left:10,
  right:10,
  bottom:10
}));

win.add(container);