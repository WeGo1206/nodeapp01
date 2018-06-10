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
               //console.log('./' + fileName[d] + '.txt');
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

        responseHTML = htmlTemplateFile.replace("_xvalues", arrayOfTime);
        responseHTML = responseHTML.replace("_yvalues1", arrayOfYvalue1);
        responseHTML = responseHTML.replace("_yvalues2", arrayOfYvalue2);
        responseHTML = responseHTML.replace("_yvalues3", arrayOfYvalue3);
        responseHTML = responseHTML.replace("_num1", arrayOfYvalue1.length);
        responseHTML = responseHTML.replace("_num2", arrayOfYvalue2.length);
        responseHTML = responseHTML.replace("_num3", arrayOfYvalue3.length);
        responseHTML = responseHTML.replace("_min1", Math.min(...arrayOfYvalue1)+'  /  '+ 
        arrayOfTime[arrayOfYvalue1.indexOf(Math.min(...arrayOfYvalue1))].replace(/\"/g,""));
        responseHTML = responseHTML.replace("_min2", Math.min(...arrayOfYvalue2)+'  /  '+ 
        arrayOfTime[arrayOfYvalue2.indexOf(Math.min(...arrayOfYvalue2))].replace(/\"/g,""));
        responseHTML = responseHTML.replace("_min3", Math.min(...arrayOfYvalue3)+'  /  '+ 
        arrayOfTime[arrayOfYvalue3.indexOf(Math.min(...arrayOfYvalue3))].replace(/\"/g,""));
        responseHTML = responseHTML.replace("_max1", Math.max(...arrayOfYvalue1)+'  /  '+ 
        arrayOfTime[arrayOfYvalue1.indexOf(Math.max(...arrayOfYvalue1))].replace(/\"/g,""));
        responseHTML = responseHTML.replace("_max2", Math.max(...arrayOfYvalue2)+'  /  '+ 
        arrayOfTime[arrayOfYvalue2.indexOf(Math.max(...arrayOfYvalue2))].replace(/\"/g,""));
        responseHTML = responseHTML.replace("_max3", Math.max(...arrayOfYvalue3)+'  /  '+ 
        arrayOfTime[arrayOfYvalue3.indexOf(Math.max(...arrayOfYvalue3))].replace(/\"/g,""));
        responseHTML = responseHTML.replace("_avg1", avgOfYvalue1.toFixed(2));
        responseHTML = responseHTML.replace("_avg2", avgOfYvalue2.toFixed(2));
        responseHTML = responseHTML.replace("_avg3", avgOfYvalue3.toFixed(2));
        responseHTML = responseHTML.replace("id=\"_sDate\"", "id=\"_sDate\"" + "value=\"" + moment(sdate).format("YYYY-MM-DD") + "\"");
        responseHTML = responseHTML.replace("id=\"_eDate\"", "id=\"_eDate\"" + "value=\"" + moment(edate).format("YYYY-MM-DD") + "\"");
        //console.log(responseHTML);
        return responseHTML;
    }
}

