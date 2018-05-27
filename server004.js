var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    moment = require('moment'),
    express = require('express');

const hostname = '192.168.1.106';
const port = 80;
var requestCounter = 0;
var htmlFile;
var error;
const app = express();

app.get('/', function (req, res) {
res.send('Chart Temperatur-Messung mit Raspberry PI und DS18B20 Sensor \n WeGo v0.0.4')});

app.get('/About', function (req, res) {
res.send('Temperatur-Messung mit Raspberry PI und DS18B20 Sensor \n WeGo v0.0.4')});

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});