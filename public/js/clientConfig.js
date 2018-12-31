//var serverURL = "http://wego67.internet-box.ch";
var serverURL = "http://192.168.179.30";

var siteURLHome = serverURL;
var siteURLDocu = serverURL + "/documentation";
var siteURLInfo = serverURL + "/info";
var siteURLContact = serverURL + "/contact";



function navigateTo(route) {
    window.location = siteURLHome + route;
}