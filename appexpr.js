var express = require('express');
var app = express();
var path    = require("path");
var readPV = require('./readPV');
var moment = require("moment");



console.log('start----------------------------------')
//var date = moment().subtract(10, 'days').calendar();
//var date = moment().subtract(28, 'days').format("YYYYMMDD");
//console.log(date);
console.log(readPV.readPV(10));
console.log('end----------------------------------')

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname+'/appexpr.html'));
  console.log(path.join(__dirname+'/appexpr.html'));
});

app.get('/1', function (req, res) {
  res.sendFile(path.join(__dirname+'/appexpr1.html'));
  console.log(path.join(__dirname+'/appexpr1.html'));
});

app.get('/2', function (req, res) {
  res.sendFile(path.join(__dirname+'/appexpr2.html'));
  console.log(path.join(__dirname+'/appexpr2.html'));
});

app.post('/menue1', function(req, res){   
  res.sendFile(path.join(__dirname+'/appexpr.html')); 
    console.log('menue1');
   res.redirect('/1');
});

app.post('/menue2', function(req, res){    
  res.sendFile(path.join(__dirname+'/appexpr.html'));
  console.log('menue2');
  res.redirect('/2');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});