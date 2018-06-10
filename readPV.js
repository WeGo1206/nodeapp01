var fs = require('fs');
var moment = require('moment');

module.exports = {
    readPV: function(timeRangeByDays) {
        var date = moment().subtract(timeRangeByDays, 'days').format("YYYYMMDD");
        //console.log(date);
        var fileName = [];
        var d;
        var dataTemp = "";
        var data = "";
        var splitByRow;
        var splitByValue = [];
        var arrayOfSeparatedValues = [];
        
        for (d = 1; d <= timeRangeByDays; d++) {

            fileName.push('Temperatur_Wohnung_' + moment().subtract(timeRangeByDays-d,"days").format('YYYYMMDD'));
        };
        //console.log(fileName);
        for (d = 0; d < fileName.length; d++) {
	    try{
               dataTemp = fs.readFileSync('/home/pi/Documents/' + fileName[d] + '.txt', 'utf-8');
               data = data.concat(dataTemp);
	    }
	    catch(err){
               //console.log(err);
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

