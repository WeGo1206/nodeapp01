var serverURL = "http://wego67.internet-box.ch";
//var serverURL = "http://192.168.1.114";

var siteURLHome = serverURL;
var siteURLDocu = serverURL + "/documentation";
var siteURLInfo = serverURL + "/info";
var siteURLContact = serverURL + "/contact";

var siteURLGetDay = '/fixedTimeRange/?timeRange=1';
var siteURLGetWeek = '/fixedTimeRange/?timeRange=7';
var siteURLGetMonth = '/fixedTimeRange/?timeRange=31';


function navigateTo(route) {
    window.location = siteURLHome + route;
}

function updateTrendData(objLineChart, days) {
    updTrendData(objLineChart, days);
    var el; 
    var elId;
    var i;

    for(i=0; i<=7; i++) {

        elId= i+'-sel-btn';
        el= document.getElementById(elId);
        el.classList.remove('selected-timerange-btn');
        el.classList.add('deselected-timerange-btn');
        console.log(el);
    }
    console.log(days);
    switch (days) {
        case 1:
            el= document.getElementById('0-sel-btn');
            el.classList.add('selected-timerange-btn');
            console.log('case 1')
          break;
        case 3:
            el= document.getElementById('1-sel-btn');
            el.classList.add('selected-timerange-btn');
          break;
        case 7:
            el= document.getElementById('2-sel-btn');
            el.classList.add('selected-timerange-btn');
          break;
        case 14:
            el= document.getElementById('3-sel-btn');
            el.classList.add('selected-timerange-btn');
          break;
        case 31:
            el= document.getElementById('4-sel-btn');
            el.classList.add('selected-timerange-btn');
          break;
        case 183:
            el= document.getElementById('5-sel-btn');
            el.classList.add('selected-timerange-btn');
          break;
        case 365:
            el= document.getElementById('6-sel-btn');
            el.classList.add('selected-timerange-btn');
          break;
        case 730:
            el= document.getElementById('7-sel-btn');
            el.classList.add('selected-timerange-btn');
      }








}


/* function onMediaQuery(x) {
    if (x.matches) { // If media query matches
        console.log('mediaquery matches');
        
    } else {
        console.log('mediaquery does not match');
       
    };
  };
  
  var x = window.matchMedia("(max-width: 600px)");
  onMediaQuery(x); // Call listener function at run time
  x.addListener(window.myLine.update()); // Attach listener function on state changes
 */