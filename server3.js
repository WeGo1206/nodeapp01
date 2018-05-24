var http = require('http'),
    fs = require('fs'),
    path = require('path'),
    moment = require('moment');

const hostname = '192.168.1.106';
const port = 3000;
var requestCounter = 0;
var htmlFile;

const server = http.createServer(function(request, response) {
	requestCounter++;
	var date = moment().format('YYYYMMDD');
    	var fileName = '/home/pi/Documents/Temperatur_Wohnung_' + date + '.txt';
	      

	console.log('Requested: ' + ' [' + requestCounter + ']');

	var data = fs.readFileSync(fileName, 'utf-8');
	var htmlFile = fs.readFileSync('./TemplateChart.html', 'utf-8');

	console.log(data);
	console.log(htmlFile);

	var time = [];
	var dataset1 = [];
	var dataset2 = [];

	var split = data.split('\n')
	console.log(split);
	var split2 = [];
	var normArr = [];
	var i = 0;
	for (i = 0; i < split.length; i++) {
    		split2 = split[i].split(';');
    		normArr.push(split2);
    		console.log(split2);
	};

console.log(normArr);

i = 0;
for (i = 0; i < normArr.length; i++) {
    if(normArr[i][3]) {
        time.push("\"" + normArr[i][3] + "\"");
    };
    if(normArr[i][0]) {
        dataset1.push(normArr[i][0].replace(",","."));
    };
    if(normArr[i][0]) {
        dataset2.push(normArr[i][1].replace(",","."));
    };
};
console.log(time);
console.log(dataset1);
console.log(dataset2);


var newHtmlFile;
newHtmlFile = htmlFile.replace("@xvalues", time);
newHtmlFile = newHtmlFile.replace("@yvalues1", dataset1);
newHtmlFile = newHtmlFile.replace("@yvalues2", dataset2);
console.log(newHtmlFile);

var fs2 = fs.writeFileSync('./TempChart.html', newHtmlFile, 'utf-8');


	
        response.writeHead(200, {
        'Content-Type': 'text/html'});
	response.write(newHtmlFile);
	response.end();
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});