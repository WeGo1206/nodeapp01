var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    express = require('express'),
    readPV = require('./readPV');

const hostname = '192.168.1.114';
const port = 3000;
var requestCounter = 0;
var htmlFile;
var error;
//console.log(readPV.readPV(6));

const app = express();

app.get('/', function (req, res) {
res.send(readPV.readPV(1))});

app.get('/Heute', function (req, res) {
  res.send(readPV.readPV(1))});

app.get('/2t', function (req, res) {
  res.send(readPV.readPV(2))});

app.get('/3t', function (req, res) {
  res.send(readPV.readPV(3))});

app.get('/5t', function (req, res) {
  res.send(readPV.readPV(5))});

app.post('/2t', function(req, res){   
  res.redirect('/2t');});

app.post('/Heute', function(req, res){   
  res.redirect('/Heute');});

app.post('/3t', function(req, res){   
  res.redirect('/3t');});

app.post('/5t', function(req, res){   
  res.redirect('/5t');});

app.get('/About', function (req, res) {
res.send('Temperatur-Messung mit Raspberry PI und DS18B20 Sensor \n WeGo v0.0.4')});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});