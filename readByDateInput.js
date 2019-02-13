var fs = require('fs');
var moment = require('moment');
var path    = require("path");
var config = require('./serverConfig');

module.exports = {
    readByDateInput: function(sdate, edate) {
        //var date = moment().subtract(timeRangeByDays, 'days').format("YYYYMMDD");
        //console.log(date);
        var fileName = [];
        var d;
        var dataTemp = "";
        var data = "";
        var splitByRow;
        var splitByValue = [];
        var arrayOfSeparatedValues = [];
        

        for (d = sdate; d <= edate; d++) {

            fileName.push('Temperatur_Wohnung_' + d);
        };

        for (d = 0; d < fileName.length; d++) {
	    try{
            dataTemp = fs.readFileSync(config.filePathTempData + fileName[d] + '.txt', 'utf-8');
            data = data.concat(dataTemp);
	    }
	    catch(err){

	        };
        };

        splitByRow = data.split('\n')

        for (i = 0; i < splitByRow.length; i++) {
            splitByValue = splitByRow[i].split(';');
            arrayOfSeparatedValues.push(splitByValue);

        };
        return arrayOfSeparatedValues;
    }
}

