var serverURL = "http://wego67.internet-box.ch";
//var serverURL = "http://192.168.1.114";

var siteURLHome = serverURL;
var siteURLDocu = serverURL + "/documentation";
var siteURLInfo = serverURL + "/info";
var siteURLContact = serverURL + "/contact";

var siteURLGetWeek = serverURL +'/fixedTimeRange/?timeRange=7';
var siteURLGetMonth = serverURL +'/fixedTimeRange/?timeRange=31';


function navigateTo(route) {
    window.location = siteURLHome + route;
}