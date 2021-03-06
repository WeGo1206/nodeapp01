var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    express = require('express'),
    readPV = require('./readPV');

const hostname = '192.168.1.106';
const port = 80;
var requestCounter = 0;
var htmlFile;
var error;
//console.log(readPV.readPV(6));

const app = express();

app.get('/', function (req, res) {
res.send(readPV.readPV(1));
console.log('Request: ' + moment().format());});

app.get('/Heute', function (req, res) {
  res.send(readPV.readPV(1));
console.log('Request: ' + moment().format());});

app.get('/2t', function (req, res) {
  res.send(readPV.readPV(2));
console.log('Request: ' + moment().format());});

app.get('/3t', function (req, res) {
  res.send(readPV.readPV(3));
console.log('Request: ' + moment().format());});

app.get('/5t', function (req, res) {
  res.send(readPV.readPV(5));
console.log('Request: ' + moment().format());});

app.get('/10t', function (req, res) {
  res.send(readPV.readPV(10));
console.log('Request: ' + moment().format());});

app.get('/31t', function (req, res) {
  res.send(readPV.readPV(31));
console.log('Request: ' + moment().format());});

app.get('/93t', function (req, res) {
  res.send(readPV.readPV(93));
console.log('Request: ' + moment().format());});

app.get('/183t', function (req, res) {
  res.send(readPV.readPV(183));
console.log('Request: ' + moment().format());});

app.get('/365t', function (req, res) {
  res.send(readPV.readPV(365));
console.log('Request: ' + moment().format());});

app.get('/730t', function (req, res) {
  res.send(readPV.readPV(730));
console.log('Request: ' + moment().format());});

app.post('/Heute', function(req, res){   
  res.redirect('/Heute');});

app.post('/2t', function(req, res){   
  res.redirect('/2t');});

app.post('/3t', function(req, res){   
  res.redirect('/3t');});

app.post('/5t', function(req, res){   
  res.redirect('/5t');});

app.post('/10t', function(req, res){   
  res.redirect('/10t');});

app.post('/31t', function(req, res){   
  res.redirect('/31t');});

app.post('/93t', function(req, res){   
  res.redirect('/93t');});

app.post('/183t', function(req, res){   
  res.redirect('/183t');});

app.post('/365t', function(req, res){   
  res.redirect('/365t');});

app.post('/730t', function(req, res){   
  res.redirect('/730t');});

app.get('/info', function (req, res) {
res.send('Temperatur-Messung mit Raspberry PI und DS18B20 Sensor \n WeGo v0.0.4')});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});