var serverURL = "http://wego67.internet-box.ch";
//var serverURL = "http://192.168.1.114";

var siteURLHome = serverURL;
var siteURLMeasurement= serverURL + "/measurement";
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
            el.classList.remove('deselected-timerange-btn');
            el.classList.add('selected-timerange-btn');
            console.log('case 1');
            console.log(el);
          break;
        case 3:
            el= document.getElementById('1-sel-btn');
            el.classList.remove('deselected-timerange-btn');
            el.classList.add('selected-timerange-btn');
          break;
        case 7:
            el= document.getElementById('2-sel-btn');
            el.classList.remove('deselected-timerange-btn');
            el.classList.add('selected-timerange-btn');
          break;
        case 14:
            el= document.getElementById('3-sel-btn');
            el.classList.remove('deselected-timerange-btn');
            el.classList.add('selected-timerange-btn');
          break;
        case 31:
            el= document.getElementById('4-sel-btn');
            el.classList.remove('deselected-timerange-btn');
            el.classList.add('selected-timerange-btn');
          break;
        case 183:
            el= document.getElementById('5-sel-btn');
            el.classList.remove('deselected-timerange-btn');
            el.classList.add('selected-timerange-btn');
          break;
        case 365:
            el= document.getElementById('6-sel-btn');
            el.classList.remove('deselected-timerange-btn');
            el.classList.add('selected-timerange-btn');
          break;
        case 730:
            el= document.getElementById('7-sel-btn');
            el.classList.remove('deselected-timerange-btn');
            el.classList.add('selected-timerange-btn');
      }
}
var onMediaQuerryMobile = false;
if (window.innerWidth <= 500) {
        onMediaQuerryMobile= true;
    } else {
        onMediaQuerryMobile= false;
    }

function onMediaQuery(e) {
    var conf;
    if (e.matches) { // If media query matches
        console.log('mediaquery matches');
        //updateTrendData(window.myLine,1);
        onMediaQuerryMobile = true;
        navigateTo('/');
               
    } else {
        console.log('mediaquery does not match');
        //updateTrendData(window.myLine,1)
        onMediaQuerryMobile = false;
        navigateTo('/');
             
    };
  };
  
  var mql = window.matchMedia("(max-width: 500px)");
  //onMediaQuery(x); // Call listener function at run time
  mql.addListener(onMediaQuery); // Attach listener function on state changes

  function showDetails() {
    var x = document.getElementById("tooltip-text-details");
    x.style.display= 'block';
    console.log("show");
  };

  function hideDetails() {
    var x = document.getElementById("tooltip-text-details");
    x.style.display= 'none';
    console.log("hide");
  };