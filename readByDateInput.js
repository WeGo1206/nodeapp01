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
        var arrayOfTime = [];
        var arrayOfYvalue1 = [];
        var arrayOfYvalue2 = [];
        var arrayOfYvalue3 = [];
        var splitByValue = [];
        var arrayOfSeparatedValues = [];
        var avgOfYvalue1 = 0;
        var avgOfYvalue2 = 0;
        var avgOfYvalue3 = 0;
        var htmlTemplateFile;
        var responseHTML;

        for (d = sdate; d <= edate; d++) {

            fileName.push('Temperatur_Wohnung_' + d);
        };
        //console.log(fileName);
        //d = 0;
        for (d = 0; d < fileName.length; d++) {
	    try{
               dataTemp = fs.readFileSync('/home/pi/Documents/' + fileName[d] + '.txt', 'utf-8');
               data = data.concat(dataTemp);
	    }
	    catch(err){
               console.log('./' + fileName[d] + '.txt');
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
            if(arrayOfSeparatedValues[i][1]) {
                arrayOfYvalue2.push(Number(arrayOfSeparatedValues[i][1].replace(",",".")));
		
            };
            if(arrayOfSeparatedValues[i][2]) {
                arrayOfYvalue3.push(Number(arrayOfSeparatedValues[i][2].replace(",",".")));
		
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
        
        for(i=0; i< arrayOfYvalue3.length; i++) {
		    avgOfYvalue3 += arrayOfYvalue3[i];
	    };
	    avgOfYvalue3 = avgOfYvalue3/arrayOfYvalue3.length;

        responseHTML = htmlTemplateFile.replace("@xvalues", arrayOfTime);
        responseHTML = responseHTML.replace("@yvalues1", arrayOfYvalue1);
        responseHTML = responseHTML.replace("@yvalues2", arrayOfYvalue2);
        responseHTML = responseHTML.replace("@yvalues3", arrayOfYvalue3);
        responseHTML = responseHTML.replace("@num1", arrayOfYvalue1.length);
        responseHTML = responseHTML.replace("@num2", arrayOfYvalue2.length);
        responseHTML = responseHTML.replace("@num3", arrayOfYvalue3.length);
        responseHTML = responseHTML.replace("@min1", Math.min(...arrayOfYvalue1));
        responseHTML = responseHTML.replace("@min2", Math.min(...arrayOfYvalue2));
        responseHTML = responseHTML.replace("@min3", Math.min(...arrayOfYvalue3));
        responseHTML = responseHTML.replace("@max1", Math.max(...arrayOfYvalue1));
        responseHTML = responseHTML.replace("@max2", Math.max(...arrayOfYvalue2));
        responseHTML = responseHTML.replace("@max3", Math.max(...arrayOfYvalue3));
        responseHTML = responseHTML.replace("@avg1", avgOfYvalue1.toFixed(2));
        responseHTML = responseHTML.replace("@avg2", avgOfYvalue2.toFixed(2));
        responseHTML = responseHTML.replace("@avg3", avgOfYvalue3.toFixed(2));
        //console.log(responseHTML);
        return responseHTML;
    }
}

