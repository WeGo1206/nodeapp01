var http = require('http'),
    fileSystem = require('fs'),
    path = require('path'),
    moment = require('moment');

const hostname = '192.168.1.106';
const port = 3000;
var requestCounter = 0;

const server = http.createServer(function(request, response) {
    requestCounter++;
    var date = moment().format('YYYYMMDD');
    var fileName = 'Temperatur_Wohnung_' + date + '.txt'
    console.log('Requested: ' + fileName + ' [' + requestCounter + ']');	
    var filePath = path.join('/home/pi/Documents', fileName);
    var stat = fileSystem.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'text/txt',
        'Content-Length': stat.size
    });
    		
    var readStream = fileSystem.createReadStream(filePath);
    readStream.pipe(response);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});