var express = require('express');
var path    = require("path");
var bodyParser = require('body-parser');
var piFixedValue = require('./readPV');
var piSelectValue = require('./readByDateInput');

var app = express();

const hostname = '192.168.1.106';
const port = 80;

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

app.get('/', function (req, res) {
  //this corresponds to URL query parameters after '?' combined with '&'
  //console.log('get2: ' + req.query.sdate);
  //console.log('get2: ' + req.query.edate);
  
  //this corresponds to route parameters directly the path separeted by '/'
  console.log('get2: ' + req.params.sdate);
  console.log('get2: ' + req.params.edate);
  res.send(piFixedValue.readPV(1));
});

app.post('/pi', function(req, res){ 
  console.log('post: ' + req.body.sdate);
  console.log('post: ' + req.body.edate);
  //this corrsponds to req.query.xxxx in get route
  //res.redirect('/page/1/?sdate='+ req.body.sdate+ '&edate='+ req.body.edate);

  //this corresponds to req.params.xxxx in get route
  //res.redirect('/page/1/'+ req.body.sdate+ '/'+ req.body.edate);
  var sDateF = req.body.sdate;
  var eDateF = req.body.edate;
  sDateF = sDateF.replace(/-/g,"");
  eDateF = eDateF.replace(/-/g,"");  
  res.send(piSelectValue.readByDateInput(sDateF, eDateF));
});

app.post('/pi/2', function(req, res){ 
  console.log('post2: ' + JSON.stringify(req.body));
  //console.log('post: ' + req.body.edate);
  //this corrsponds to req.query.xxxx in get route
  //res.redirect('/page/1/?sdate='+ req.body.sdate+ '&edate='+ req.body.edate);

  //this corresponds to req.params.xxxx in get route
  //res.redirect('/page/1/'+ req.body.sdate+ '/'+ req.body.edate);
  /* var sDateF = req.body.sdate;
  var eDateF = req.body.edate;
  sDateF = sDateF.replace(/-/g,"");
  eDateF = eDateF.replace(/-/g,"");   */
  //res.send(piSelectValue.readByDateInput(sDateF, eDateF));
  res.send(piFixedValue.readPV(1));
});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});