var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    moment = require('moment');

const hostname = '192.168.1.106';
const port = 3000;
var requestCounter = 0;
var htmlFile;

fs.readFile('./view/line.html', function(err, data) {
	if(err) {
		throw err;
	}
	htmlFile = data;
});

const server = http.createServer(function(request, response) {
	requestCounter++;
        console.log('Requested: ' + ' [' + requestCounter + ']');	
        response.writeHead(200, {
        'Content-Type': 'text/html'});
	response.write(htmlFile);
	response.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});