var fs = require('fs');
var moment = require('moment');

module.exports = {
    readPV: function(timeRangeDays) {
        var date = moment().subtract(timeRangeDays, 'days').format("YYYYMMDD");
        //console.log(date);
        var fileName = [];
        var d;
        var dataTemp = "";
        var data = "";
        for (d = 1; d <= timeRangeDays; d++) {

            fileName.push('Temperatur_Wohnung_' + moment().subtract(timeRangeDays-d,"days").format('YYYYMMDD'));
        };
        console.log(fileName);
        d = 0;
        for (d = 0; d < fileName.length; d++) {
            dataTemp = fs.readFileSync('/home/pi/Documents/' + fileName[d] + '.txt', 'utf-8');
            data = data.concat(dataTemp);
        };
        //console.log(data);
        
        var htmlFile = fs.readFileSync('./TemplateChart.html', 'utf-8');
        //console.log(data);
        //console.log(htmlFile);
        
        var time = [];
        var dataset1 = [];
        var dataset2 = [];
       
        var split = data.split('\n')
        //console.log(split);
        var split2 = [];
        var normArr = [];
        var i = 0;
        for (i = 0; i < split.length; i++) {
            split2 = split[i].split(';');
            normArr.push(split2);
            //console.log(split2);
        };
        
        //console.log(normArr);
        
        i = 0;
        for (i = 0; i < normArr.length; i++) {
            if(normArr[i][3]) {
                normArr[i][3] = normArr[i][3].substring(0,19);
                time.push("\"" + normArr[i][3] + "\"");
            };
            if(normArr[i][0]) {
                dataset1.push(normArr[i][0].replace(",","."));
            };
            if(normArr[i][0]) {
                dataset2.push(normArr[i][1].replace(",","."));
            };
        };
       
        //console.log(time);
        //console.log(dataset1);
        //console.log(dataset2);
        
        var newHtmlFile;
        newHtmlFile = htmlFile.replace("@xvalues", time);
        newHtmlFile = newHtmlFile.replace("@yvalues1", dataset1);
        newHtmlFile = newHtmlFile.replace("@yvalues2", dataset2);
        //console.log(newHtmlFile);

        return newHtmlFile;
    }
}

