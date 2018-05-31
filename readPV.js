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
        var arrayOfTime = [];
        var arrayOfYvalue1 = [];
        var arrayOfYvalue2 = [];
        var splitByValue = [];
        var arrayOfSeparatedValues = [];
        var avgOfYvalue1 = 0;
        var avgOfYvalue2 = 0;
        var htmlTemplateFile;
        var responseHTML;

        for (d = 1; d <= timeRangeByDays; d++) {

            fileName.push('Temperatur_Wohnung_' + moment().subtract(timeRangeByDays-d,"days").format('YYYYMMDD'));
        };
        //console.log(fileName);
        //d = 0;
        for (d = 0; d < fileName.length; d++) {
	    try{
               dataTemp = fs.readFileSync('/home/pi/Documents/' + fileName[d] + '.txt', 'utf-8');
               data = data.concat(dataTemp);
	    }
	    catch(err){
               //console.log(err);
	    };
        };
        //console.log(data);
        
        htmlTemplateFile = fs.readFileSync('./TemplateChart.html', 'utf-8');
        //console.log(data);
        //console.log(htmlFile);
               
        splitByRow = data.split('\n')
        //console.log(split);
        //var i = 0;
        for (i = 0; i < splitByRow.length; i++) {
            splitByValue = splitByRow[i].split(';');
            arrayOfSeparatedValues.push(splitByValue);
            //console.log(split2);
        };
        
        //console.log(normArr);

       // i = 0;
        for (i = 0; i < arrayOfSeparatedValues.length; i++) {
            if(arrayOfSeparatedValues[i][3]) {
                arrayOfSeparatedValues[i][3] = arrayOfSeparatedValues[i][3].substring(0,19);
                arrayOfTime.push("\"" + arrayOfSeparatedValues[i][3] + "\"");
            };
            if(arrayOfSeparatedValues[i][0]) {
                arrayOfYvalue1.push(Number(arrayOfSeparatedValues[i][0].replace(",",".")));
		
            };
            if(arrayOfSeparatedValues[i][0]) {
                arrayOfYvalue2.push(Number(arrayOfSeparatedValues[i][1].replace(",",".")));
		
            };
        };
       
        //console.log(time);
        //console.log(dataset1);
        //console.log(dataset2);

        for(i=0; i< arrayOfYvalue1.length; i++) {
		avgOfYvalue1 += arrayOfYvalue1[i];
    };
    
	avgOfYvalue1 = avgOfYvalue1/arrayOfYvalue1.length;
 
	for(i=0; i< arrayOfYvalue2.length; i++) {
		avgOfYvalue2 += arrayOfYvalue2[i];
	};
	avgOfYvalue2 = avgOfYvalue2/arrayOfYvalue2.length;

        responseHTML = htmlTemplateFile.replace("@xvalues", arrayOfTime);
        responseHTML = responseHTML.replace("@yvalues1", arrayOfYvalue1);
        responseHTML = responseHTML.replace("@yvalues2", arrayOfYvalue2);
        responseHTML = responseHTML.replace("@num1", arrayOfYvalue1.length);
        responseHTML = responseHTML.replace("@num2", arrayOfYvalue2.length);
        responseHTML = responseHTML.replace("@min1", Math.min(...arrayOfYvalue1));
        responseHTML = responseHTML.replace("@min2", Math.min(...arrayOfYvalue2));
        responseHTML = responseHTML.replace("@max1", Math.max(...arrayOfYvalue1));
        responseHTML = responseHTML.replace("@max2", Math.max(...arrayOfYvalue2));
        responseHTML = responseHTML.replace("@avg1", avgOfYvalue1.toFixed(2));
        responseHTML = responseHTML.replace("@avg2", avgOfYvalue2.toFixed(2));
        //console.log(newHtmlFile);
        return responseHTML;
    }
}

