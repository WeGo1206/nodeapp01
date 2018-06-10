var fs = require('fs');
var moment = require('moment');
var path    = require("path");

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
               dataTemp = fs.readFileSync('/home/pi/Documents/' + fileName[d] + '.txt', 'utf-8');
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
        

        for (i = 0; i < arrayOfSeparatedValues.length; i++) {
            if(arrayOfSeparatedValues[i][3]) {
                arrayOfSeparatedValues[i][3] = arrayOfSeparatedValues[i][3].substring(0,19);
                arrayOfTime.push("\"" + arrayOfSeparatedValues[i][3] + "\"");
            };
            if(arrayOfSeparatedValues[i][0]) {
		                arrayOfYvalue1.push(Number(arrayOfSeparatedValues[i][0].replace(",",".")));
		
            };
            if(arrayOfSeparatedValues[i][1]) {
                arrayOfYvalue2.push(Number(arrayOfSeparatedValues[i][1].replace(",",".")));
		
            };
            if(arrayOfSeparatedValues[i][2]) {
                arrayOfYvalue3.push(Number(arrayOfSeparatedValues[i][2].replace(",",".")));
		
            };
        };
       
        return arrayOfSeparatedValues;
    }
}

