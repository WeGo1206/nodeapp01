function reqHeatmapData(days) {
    
    var xhttp;
    console.log("request heatmap data...");
                  
    xhttp = new XMLHttpRequest();
        
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.status);
            //console.log("empfange Heatmap-Daten: " + this.responseText);
            var obj = JSON.parse(this.responseText);
            console.log(obj.arrHeatmapData);
	    createHeatmap(obj.arrHeatmapData);
     	    var x= document.getElementById("calc-heatmap");
    	    x.style.display= 'none';
            };
    };  
    var route= "/reqHeatmapData/"+days
    xhttp.open("GET", route, true);
    xhttp.send();
};

var createHeatmap = function(arrHeatmapData){
var currDate = new Date();
var currYear = currDate.getFullYear();
var currMonth = currDate.getMonth();
var currDay = currDate.getDate();

Highcharts.chart('heatmap-container', {

    data: {
        rows: arrHeatmapData
    },

    chart: {
        type: 'heatmap',
        borderRadius: 7,
        margin: [60, 5, 80, 50]
    },

    boost: {
        useGPUTranslations: true
    },

    title: {
        text: 'Aussen-Temperatur °C',
        align: 'left',
        x: 10
    },

    subtitle: {
        text: 'seit Mai 2018',
        align: 'left',
        x: 10
    },

    exporting: { 
	enabled: false 
    },

    xAxis: {
        type: 'datetime',
        min: Date.UTC(2018, 4, 22),
        max: Date.UTC(currYear, currMonth, currDay),
        labels: {
            align: 'center',
            x: 0,
            y: 14,
            format: '{value:%m/%y}' // long month
        },
        showLastLabel: true,
        tickLength: 5,
	tickWidth: 2,
	startOnTick: false,
        endOnTick: true,
	tickInterval: 24 * 3600 * 1000 *60 //in milliseconds

    },

    yAxis: {
        title: {
            text: null
        },
        labels: {
	    format: '{value}:00'
        },
        minPadding: 0,
        maxPadding: 0,
        startOnTick: true,
        endOnTick: true,
        tickPositions: [0, 6, 12, 18, 23],
        tickWidth: 2,
	tickLength: 5,
        min: 0,
        max: 23,
        reversed: true
    },

    colorAxis: {
        stops: [
            [0, '#3060cf'],
            [0.5, '#fffbbc'],
            [0.9, '#c4463a'],
            [1, '#c4463a']
        ],
        min: -15,
        max: 35,
        startOnTick: true,
        endOnTick: true,
	tickPositions: [-20, -10, 0, 10, 20, 30, 40],
        labels: {
            format: '{value}'
        }
    },

    
    series: [{
        boostThreshold: 100,
        borderWidth: 0,
        nullColor: '#EFEFEF',
        colsize: 24 * 36e5, // one day
        tooltip: {
            headerFormat: 'Temperature<br/>',
            pointFormat: '{point.x:%e %b, %Y} {point.y}:00: <b>{point.value} ℃</b>'
        },
        turboThreshold: Number.MAX_VALUE // #3404, remove after 4.0.5 release
    }]

});
}