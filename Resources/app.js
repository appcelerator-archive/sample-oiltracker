// create tab group
var tabGroup = Titanium.UI.createTabGroup();

var win1 = Titanium.UI.createWindow({  
  title:'Oil Tracker',
  url:'tracker.js',
  backgroundColor:'#fff',
  barColor:"#000"
});
var tab1 = Titanium.UI.createTab({  
  icon:'radar.png',
  title:'Tracker',
  window:win1
});

var win2 = Titanium.UI.createWindow({  
  title:'Get Involved',
  url:'about.js',
  backgroundColor:'#fff',
  backgroundImage:'about.png',
  barColor:"#000"
});
var tab2 = Titanium.UI.createTab({  
  icon:'book.png',
  title:'Learn',
  window:win2
});

tabGroup.addTab(tab1);  
tabGroup.addTab(tab2);  

tabGroup.open();
