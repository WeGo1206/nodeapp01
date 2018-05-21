var http = require('http'),
    fileSystem = require('fs'),
    path = require('path');

const hostname = '192.168.1.106';
const port = 3000;

const server = http.createServer(function(request, response) {
    var filePath = path.join('/home/pi/Documents', 'Temperatur_Wohnung_20180521.txt');
    var stat = fileSystem.statSync(filePath);

    response.writeHead(200, {
        'Content-Type': 'text/txt',
        'Content-Length': stat.size
    });

    var readStream = fileSystem.createReadStream(filePath);
    // We replaced all the event handlers with a simple call to readStream.pipe()
    readStream.pipe(response);
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});