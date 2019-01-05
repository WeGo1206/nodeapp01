var fs = require('fs');
var moment = require('moment');
var config = require('./serverConfig');

module.exports = {
    responseTimeseriesData: function(dataArray) {
        
        var i;
        var arrayOfTime = [];
        var arrayOfYvalue1 = [];
        var arrayOfYvalue2 = [];
        var arrayOfYvalue3 = [];
        var avgOfYvalue1 = 0;
        var avgOfYvalue2 = 0;
        var avgOfYvalue3 = 0;
        var minValue1;
        var maxValue1;
        var numValue1;
        var minValue2;
        var maxValue2;
        var numValue2;
        var minValue3;
        var maxValue3;
        var numValue3;
      
        for (i = 0; i < dataArray.length; i++) {
            if(dataArray[i][3]) {
                dataArray[i][3] = dataArray[i][3].substring(0,19);
                //arrayOfTime.push("\"" + dataArray[i][3] + "\"");
                arrayOfTime.push(dataArray[i][3]);
            };
            if(dataArray[i][0]) {
		                arrayOfYvalue1.push(Number(dataArray[i][0].replace(",",".")));
		
            };
            if(dataArray[i][1]) {
                arrayOfYvalue2.push(Number(dataArray[i][1].replace(",",".")));
		
            };
            if(dataArray[i][2]) {
                arrayOfYvalue3.push(Number(dataArray[i][2].replace(",",".")));
		
            };
        };
       
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

        numValue1= arrayOfYvalue1.length;
        numValue2= arrayOfYvalue2.length;
        numValue3= arrayOfYvalue3.length;

        minValue1= Math.min(...arrayOfYvalue1).toFixed(1)+'  /  '+ 
        arrayOfTime[arrayOfYvalue1.indexOf(Math.min(...arrayOfYvalue1))].replace(/\"/g,"");
        minValue2= Math.min(...arrayOfYvalue2).toFixed(1)+'  /  '+ 
        arrayOfTime[arrayOfYvalue2.indexOf(Math.min(...arrayOfYvalue2))].replace(/\"/g,"");
        minValue3= Math.min(...arrayOfYvalue3).toFixed(1)+'  /  '+ 
        arrayOfTime[arrayOfYvalue3.indexOf(Math.min(...arrayOfYvalue3))].replace(/\"/g,"");

        maxValue1= Math.max(...arrayOfYvalue1).toFixed(1)+'  /  '+ 
        arrayOfTime[arrayOfYvalue1.indexOf(Math.max(...arrayOfYvalue1))].replace(/\"/g,"");
        maxValue2= Math.max(...arrayOfYvalue2).toFixed(1)+'  /  '+ 
        arrayOfTime[arrayOfYvalue2.indexOf(Math.max(...arrayOfYvalue2))].replace(/\"/g,"");
        maxValue3= Math.max(...arrayOfYvalue3).toFixed(1)+'  /  '+ 
        arrayOfTime[arrayOfYvalue3.indexOf(Math.max(...arrayOfYvalue3))].replace(/\"/g,"");
        

        return {
            arrayOfTime,
            arrayOfYvalue1, 
            arrayOfYvalue2, 
            arrayOfYvalue3, 
            avgOfYvalue1, 
            avgOfYvalue2, 
            avgOfYvalue3,
            minValue1,
            maxValue1,
            numValue1,
            minValue2,
            maxValue2,
            numValue2,
            minValue3,
            maxValue3,
            numValue3,
        };
    }
}

