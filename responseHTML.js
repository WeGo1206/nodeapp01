var fs = require('fs');
var moment = require('moment');
var config = require('./serverConfig');

module.exports = {
    responseHTML: function(dataArray) {
        
        var i;
        var arrayOfTime = [];
        var arrayOfYvalue1 = [];
        var arrayOfYvalue2 = [];
        var arrayOfYvalue3 = [];
        var avgOfYvalue1 = 0;
        var avgOfYvalue2 = 0;
        var avgOfYvalue3 = 0;
        var htmlTemplateFile;
        var responseHTML;

        var htmlTemplateFile;
        var sysInfoFile;
        var singleValue;
        
        htmlTemplateFile = fs.readFileSync('./public/views/info-window.html', 'utf-8');
        sysInfoFile = fs.readFileSync(config.filePathSysInfo, 'utf-8');

        singleValue = sysInfoFile.split(';');



        htmlTemplateFile = fs.readFileSync('./TemplateChart.html', 'utf-8');
        //console.log(data);
        //console.log(htmlFile);
               
        
        for (i = 0; i < dataArray.length; i++) {
            if(dataArray[i][3]) {
                dataArray[i][3] = dataArray[i][3].substring(0,19);
                arrayOfTime.push("\"" + dataArray[i][3] + "\"");
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

        responseHTML = htmlTemplateFile.replace("_xvalues", arrayOfTime);
        responseHTML = responseHTML.replace("_yvalues1", arrayOfYvalue1);
        responseHTML = responseHTML.replace("_yvalues2", arrayOfYvalue2);
        responseHTML = responseHTML.replace("_yvalues3", arrayOfYvalue3);
        responseHTML = responseHTML.replace("_num1", arrayOfYvalue1.length);
        responseHTML = responseHTML.replace("_num2", arrayOfYvalue2.length);
        responseHTML = responseHTML.replace("_num3", arrayOfYvalue3.length);
        responseHTML = responseHTML.replace("_min1", Math.min(...arrayOfYvalue1).toFixed(1)+'  /  '+ 
        arrayOfTime[arrayOfYvalue1.indexOf(Math.min(...arrayOfYvalue1))].replace(/\"/g,""));
        responseHTML = responseHTML.replace("_min2", Math.min(...arrayOfYvalue2).toFixed(1)+'  /  '+ 
        arrayOfTime[arrayOfYvalue2.indexOf(Math.min(...arrayOfYvalue2))].replace(/\"/g,""));
        responseHTML = responseHTML.replace("_min3", Math.min(...arrayOfYvalue3).toFixed(1)+'  /  '+ 
        arrayOfTime[arrayOfYvalue3.indexOf(Math.min(...arrayOfYvalue3))].replace(/\"/g,""));
        responseHTML = responseHTML.replace("_max1", Math.max(...arrayOfYvalue1).toFixed(1)+'  /  '+ 
        arrayOfTime[arrayOfYvalue1.indexOf(Math.max(...arrayOfYvalue1))].replace(/\"/g,""));
        responseHTML = responseHTML.replace("_max2", Math.max(...arrayOfYvalue2).toFixed(1)+'  /  '+ 
        arrayOfTime[arrayOfYvalue2.indexOf(Math.max(...arrayOfYvalue2))].replace(/\"/g,""));
        responseHTML = responseHTML.replace("_max3", Math.max(...arrayOfYvalue3).toFixed(1)+'  /  '+ 
        arrayOfTime[arrayOfYvalue3.indexOf(Math.max(...arrayOfYvalue3))].replace(/\"/g,""));
        responseHTML = responseHTML.replace("_avg1", avgOfYvalue1.toFixed(1));
        responseHTML = responseHTML.replace("_avg2", avgOfYvalue2.toFixed(1));
        responseHTML = responseHTML.replace("_avg3", avgOfYvalue3.toFixed(1));
        responseHTML = responseHTML.replace("id=\"_sDate\"", "id=\"_sDate\"" + "value=\"" + moment().format("YYYY-MM-DD") + "\"");
        responseHTML = responseHTML.replace("id=\"_eDate\"", "id=\"_eDate\"" + "value=\"" + moment().format("YYYY-MM-DD") + "\"");
        responseHTML = responseHTML.replace("_SysInfo1", singleValue[1]);
        responseHTML = responseHTML.replace("_SysInfo2", singleValue[2]);
        responseHTML = responseHTML.replace("_SysInfo3", singleValue[4]);
        responseHTML = responseHTML.replace("_SysInfo4", singleValue[5]);
        
        //console.log(responseHTML);
        return responseHTML;
    }
}

