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
	    var arrTime = [];
        var arrY1 = [];
        var arrY2 = [];
        var arrY3 = [];
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
        var inc = 1;
	

        if(dataArray.length >= (3*24*90)) { inc= 12; };

        for (i = 0; i < dataArray.length; i += inc) {
            if(dataArray[i][3]) {
                dataArray[i][3] = dataArray[i][3].substring(0,19);
                //arrayOfTime.push("\"" + dataArray[i][3] + "\"");
                arrayOfTime.push(dataArray[i][3]);
            };
            if(dataArray[i][0]) {
				var maxVal;
		                arrayOfYvalue1.push(Number(dataArray[i][0].replace(",",".")));
				if(arrayOfYvalue1[i/inc]>=50.0) {arrayOfYvalue1[i/inc]=50.0;};
            };
            if(dataArray[i][1]) {
                arrayOfYvalue2.push(Number(dataArray[i][1].replace(",",".")));
		
            };
            if(dataArray[i][2]) {
                arrayOfYvalue3.push(Number(dataArray[i][2].replace(",",".")));
		
            };
        };
       
/*         for(i=0; i< dataArray[i].length; i++) {
		    avgOfYvalue1 += dataArray[i][0];
        };
    
	    avgOfYvalue1 = avgOfYvalue1/dataArray[i].length;
 
	    for(i=0; i< dataArray[i].length; i++) {
            avgOfYvalue2 += dataArray[i][0];
            };
        
        avgOfYvalue2 = avgOfYvalue2/dataArray[i].length;
        
        for(i=0; i< dataArray[i].length; i++) {
            avgOfYvalue3 += dataArray[i][0];
            };
        
        avgOfYvalue3 = avgOfYvalue3/dataArray[i].length; */


        arrTime = dataArray.map((val) => {return val[3].substring(0,19)});
        //console.log(arrTime);
        arrY1 = dataArray.map((val)=>{return Number(val[0].replace(",","."))});
        //console.log(arrY1);
        arrY2 = dataArray.map((val)=>{return Number(val[1].replace(",","."))});
        //console.log(arrY2);
        arrY3 = dataArray.map((val)=>{return Number(val[2].replace(",","."))});
        //console.log(arrY3);

        var avgOfYvalue1 = arrY1.reduce((a,b) => a + b, 0) / arrY1.length
        avgOfYvalue1 = avgOfYvalue1.toFixed(1);
        //console.log("avg1" +avgOfYvalue1);

        var avgOfYvalue2 = arrY2.reduce((a,b) => a + b, 0) / arrY2.length
        avgOfYvalue2 = avgOfYvalue2.toFixed(1);
        //console.log("avg2" +avgOfYvalue2);

        var avgOfYvalue3 = arrY3.reduce((a,b) => a + b, 0) / arrY3.length
        avgOfYvalue3 = avgOfYvalue3.toFixed(1);
        //console.log("avg3" +avgOfYvalue3);

        numValue1= dataArray.length;
        numValue2= dataArray.length;
        numValue3= dataArray.length;


        minValue1= Math.min(...arrY1).toFixed(1)+'&#x2103;  -  '+ arrTime[arrY1.indexOf(Math.min(...arrY1))].replace(/\"/g,"");
        minValue2= Math.min(...arrY2).toFixed(1)+'&#x2103;  -  '+ arrTime[arrY2.indexOf(Math.min(...arrY2))].replace(/\"/g,"");
        minValue3= Math.min(...arrY3).toFixed(1)+'&#x2103;  -  '+ arrTime[arrY3.indexOf(Math.min(...arrY3))].replace(/\"/g,"");

        maxValue1= Math.max(...arrY1).toFixed(1)+'&#x2103;  -  '+ arrTime[arrY1.indexOf(Math.max(...arrY1))].replace(/\"/g,"");
        maxValue2= Math.max(...arrY2).toFixed(1)+'&#x2103;  -  '+ arrTime[arrY2.indexOf(Math.max(...arrY2))].replace(/\"/g,"");
        maxValue3= Math.max(...arrY3).toFixed(1)+'&#x2103;  -  '+ arrTime[arrY3.indexOf(Math.max(...arrY3))].replace(/\"/g,"");

	
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
            numValue3
	    
        };
    }
}

