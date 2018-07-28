var express = require('express');
var path    = require("path");
var bodyParser = require('body-parser');
var piFixedValue = require('./readPV');
var piSelectValue = require('./readByDateInput');
var resHTML = require('./responseHTML');
var resSysInfo = require('./responseSysInfo');

var app = express();

const hostname = '192.168.1.106';
const port = 80;

app.use(express.static('public'));
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


app.get('/', function (req, res) {
  //this corresponds to URL query parameters after '?' combined with '&'
  //console.log('get2: ' + req.query.sdate);
  //console.log('get2: ' + req.query.edate);
  
  //this corresponds to route parameters directly the path separeted by '/'
  //console.log('get2: ' + req.params.sdate);
  //console.log('get2: ' + req.params.edate);
  res.send(resHTML.responseHTML(piFixedValue.readPV(1)));
});

app.get('/documentation', function (req, res) {
  res.sendFile(__dirname + "/public/views/documentation-window.html");
});

app.get('/info', function (req, res) {
  res.send(resSysInfo.responseSysInfo());
});

app.get('/contact', function (req, res) {
  res.sendFile(__dirname + "/public/views/contact-window.html");
});

app.get('/demo', function (req, res) {
  res.sendFile(__dirname + "/canvas.html");
});

app.get('/fixedTimeRange', function (req, res) {
  res.send(resHTML.responseHTML(piFixedValue.readPV(req.query.timeRange)));
});

app.get('/selectedTimeRange', function (req, res) {
  res.send(resHTML.responseHTML(piSelectValue.readByDateInput(req.query.sdate, req.query.edate)));
});

app.post('/pi', function(req, res){ 
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

app.post('/pi/2', function(req, res){ 
  res.redirect('/fixedTimeRange/?timeRange='+req.body.Zeitbereiche);
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});