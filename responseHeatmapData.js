var fs = require('fs');
var moment = require('moment');
var config = require('./serverConfig');

module.exports = {
    responseHeatmapData: function(dataArray) {
        
        var i;
        var arrHeatmapData = [];
	arrHeatmapData.push(['Date', 'Time', 'Temperature']);
	for(i=0;i < dataArray.length;i++){
		//console.log(dataArray[i][3]);
		var dateTime= moment(dataArray[i][3], "DD.MM.YYYY hh:mm:ss");
		if(dateTime.minute() == 0){
			
			arrHeatmapData.push([dateTime.format("YYYY-MM-DD"),dateTime.hour(),Number(dataArray[i][0].replace(",","."))]);
			//console.log(arrHeatmapData);
		}
	}

        return {
	    arrHeatmapData
        };
    }
}

