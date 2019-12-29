var express = require('express');
var session = require('express-session');
var path    = require("path");
var bodyParser = require('body-parser');
var piFixedValue = require('./readPV');
var piSelectValue = require('./readByDateInput');
var resHTML = require('./responseHTML');
var resSysInfo = require('./responseSysInfo');
var resLogin = require('./responseLogin');
var config = require('./serverConfig');
var readActValues = require('./readActValues');
var resTimeseriesData = require('./responseTimeseriesData');
var resHeatmapData = require('./responseHeatmapData');
var app = express();

var sessionOptions = session({
  secret: "haelhdhdkfgr",
  resave: false,
  saveUninitialized: false,
  cookie: {maxAge: 1000 * 60 * 60, httpOnly: true}
});

app.use(sessionOptions);

//const hostname = '192.168.1.106';
//const port = 80;

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

var mustBeLoggedIn = function(req, res, next){
  if(req.session.user){
    next();
  } else {
    req.session.save(function(){
      res.redirect('/LoginPage');
    })
  }
}

app.get('/', function (req, res) {
  
  res.redirect('/LoginPage');
});

app.get('/LoginPage', function (req, res) {
  
  res.send(resLogin.responseLogin());
});

app.post('/login', function (req, res) {
  console.log(req.body);
  if(req.body.username=="admin" && req.body.password=="@ct3mium") {
    req.session.user = {favColor: "blue", username: req.body.username}
    res.redirect('/Messung');
  }
  else {
    res.redirect('/LoginPage');
  }
});

app.get('/Messung', mustBeLoggedIn, function (req, res) {
  //this corresponds to URL query parameters after '?' combined with '&'
  //console.log('get2: ' + req.query.sdate);
  //console.log('get2: ' + req.query.edate);
  
  //this corresponds to route parameters directly the path separeted by '/'
  //console.log('get2: ' + req.params.sdate);
  //console.log('get2: ' + req.params.edate);
  res.send(resHTML.responseHTML(piFixedValue.readPV(1)));
});

app.get('/documentation', mustBeLoggedIn, function (req, res) {
  res.sendFile(__dirname + "/public/views/documentation-window.html");
});

app.get('/info', mustBeLoggedIn, function (req, res) {
  res.send(resSysInfo.responseSysInfo());
});

app.get('/contact', mustBeLoggedIn, function (req, res) {
  res.sendFile(__dirname + "/public/views/contact-window.html");
});

app.get('/demo', mustBeLoggedIn, function (req, res) {
  res.sendFile(__dirname + "/canvas.html");
});

app.get('/collision', mustBeLoggedIn, function (req, res) {
  res.sendFile(__dirname + "/col-canvas.html");
});

app.get('/fixedTimeRange', mustBeLoggedIn, function (req, res) {
  res.send(resHTML.responseHTML(piFixedValue.readPV(req.query.timeRange)));
});

app.get('/selectedTimeRange', mustBeLoggedIn, function (req, res) {
  res.send(resHTML.responseHTML(piSelectValue.readByDateInput(req.query.sdate, req.query.edate)));
});

app.get('/updActValues', mustBeLoggedIn, function (req, res) {
  var actTempValues = readActValues.readActValues();
  var actValues = {
    tempOutside: actTempValues[0] + " °C",
    tempInside: actTempValues[1] + " °C",
    tempProcessor: actTempValues[2] + " °C",
    timeStamp:  actTempValues[3]
  };
  res.send(actValues);
});

app.get('/updTrendData/1', mustBeLoggedIn, function (req, res) {
  res.send(resTimeseriesData.responseTimeseriesData(piFixedValue.readPV(1)));
});

app.get('/updTrendData/3', mustBeLoggedIn, function (req, res) {
  res.send(resTimeseriesData.responseTimeseriesData(piFixedValue.readPV(3)));
});

app.get('/updTrendData/7', mustBeLoggedIn, function (req, res) {
  res.send(resTimeseriesData.responseTimeseriesData(piFixedValue.readPV(7)));
});

app.get('/updTrendData/14', mustBeLoggedIn, function (req, res) {
  res.send(resTimeseriesData.responseTimeseriesData(piFixedValue.readPV(14)));
});

app.get('/updTrendData/31', mustBeLoggedIn, function (req, res) {
  res.send(resTimeseriesData.responseTimeseriesData(piFixedValue.readPV(31)));
});

app.get('/updTrendData/183', mustBeLoggedIn, function (req, res) {
  res.send(resTimeseriesData.responseTimeseriesData(piFixedValue.readPV(183)));
});

app.get('/updTrendData/365', mustBeLoggedIn, function (req, res) {
  res.send(resTimeseriesData.responseTimeseriesData(piFixedValue.readPV(365)));
});

app.get('/updTrendData/730', mustBeLoggedIn, function (req, res) {
  res.send(resTimeseriesData.responseTimeseriesData(piFixedValue.readPV(3*365)));
});

app.get('/reqHeatmapData/730', mustBeLoggedIn, function (req, res) {
  res.send(resHeatmapData.responseHeatmapData(piFixedValue.readPV(730)));
});

app.post('/pi', mustBeLoggedIn, function(req, res){ 
  //console.log('post: ' + req.body.sdate);
  //console.log('post: ' + req.body.edate);
  //this corrsponds to req.query.xxxx in get route
  //res.redirect('/page/1/?sdate='+ req.body.sdate+ '&edate='+ req.body.edate);

  //this corresponds to req.params.xxxx in get route
  //res.redirect('/page/1/'+ req.body.sdate+ '/'+ req.body.edate);
  var sDateF = req.body.sdate;
  var eDateF = req.body.edate;
  sDateF = sDateF.replace(/-/g,"");
  eDateF = eDateF.replace(/-/g,"");  
  res.redirect('/selectedTimeRange/?sdate='+ sDateF+ '&edate='+ eDateF);
});

app.post('/pi/2', mustBeLoggedIn, function(req, res){ 
  res.redirect('/fixedTimeRange/?timeRange='+req.body.Zeitbereiche);
});

app.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});