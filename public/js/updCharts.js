window.chartColors = {
    red: 'rgb(255, 69, 0)',
    orange: 'rgb(255, 159, 64)',
    yellow: 'rgb(255, 205, 86)',
    green: 'rgb(34, 139, 34)',
    blue: 'rgb(30,144, 255)',
    purple: 'rgb(153, 102, 255)',
    grey: 'rgb(201, 203, 207)'
}
    


var _xvalues;
var _yvalues1;
var _yvalues2;
var _yvalues3;

var _SysInfo1;
var _SysInfo2;
var _SysInfo3;
var _SysInfo4;


var render = function(){

    var cHeight = window.innerHeight;
    var cWidth = window.innerWidth;
    var mobile;
    var fontSizeLegend;
    var fontColorLegend;
    var fontColorYAxes;
    var gridLinesColor;
    var zeroLineColor;
    var titleFontSize;
    var bodyFontSize;
    var nameInsideTemp, nameOutsideTemp, nameProcessorTemp;

    if(onMediaQuerryMobile ) {
        mobile= true;
        fontSizeLegend= 22;
        bodyFontSize= 20;
        titleFontSize= 20;
        fontColorLegend= 'rgb(250, 249, 249)';
        nameInsideTemp =   'Innen',
        nameOutsideTemp=    'Aussen',
        nameProcessorTemp= 'CPU';
        fontColorYAxes= 'rgb(255, 255, 255)';
        gridLinesColor= 'rgba(255, 255, 255,0.3)';
        zeroLineColor= 'rgba(255, 255, 255,0.6)';
        console.log("<=600:" + cWidth + onMediaQuerryMobile);
    }
    else {
        mobile= false;
        fontSizeLegend= 15;
        bodyFontSize= 12;
        titleFontSize= 12;
        fontColorLegend= '#666';
        nameInsideTemp =   'Innen';
        nameOutsideTemp=   'Aussen';
        nameProcessorTemp= 'CPU';
        fontColorYAxes= 'rgb(0, 0, 0)';
        console.log(">600:" + cWidth + onMediaQuerryMobile);
    };
    var config = {
        type: 'line',
        data: {
            labels: _xvalues,
            datasets: [{
                label: nameOutsideTemp,
                backgroundColor: window.chartColors.blue,
                borderColor: window.chartColors.blue,
                data: _yvalues1,
                fill: false,
                pointRadius: 0					
            }, {
                label: nameInsideTemp,
                fill: false,
                backgroundColor: window.chartColors.red,
                borderColor: window.chartColors.red,
                data: _yvalues2,
                pointRadius: 0					
            }, {
                label: nameProcessorTemp,
                fill: false,
                backgroundColor: window.chartColors.orange,
                borderColor: window.chartColors.orange,
                data: _yvalues3,
                pointRadius: 0
            }]
        },
        options: {
            layout: {
                padding: {
                    right: 15,
                    bottom: 20
                }
            },
            legend: {
                display: true,
                labels: {
                    fontSize: fontSizeLegend,
                    fontColor: fontColorLegend
                },
                fullWidth: mobile
                
            },
            responsive: true,
            maintainAspectRatio: false,
            aspectRatio: 0.75,
            title: {
                display: true,
                text: ''
            },
            tooltips: {
                mode: 'index',
                intersect: false,
                bodyFontSize: bodyFontSize,
                titleFontSize: titleFontSize
            },
            hover: {
                mode: 'nearest',
                intersect: true
            },
            scales: {
                xAxes: [{
                    display: !mobile,
                    scaleLabel: {
                        display: true,
                        labelString: '>>>> [ t ] >>>>'
                    }
                }],
                yAxes: [{
                    display: true,
                    gridLines: {
                            color: gridLinesColor,
                            lineWidth: 1,
                            zeroLineColor: zeroLineColor,
                            tickMarkLength: 3,
                            borderDash: [8,3]
                    },
                    ticks: {
                        fontColor: fontColorYAxes,
                        stepSize: 5,
                    },
                    scaleLabel: {
                        display: !mobile,
                        labelString: '>>>> [ \u00b0C ] >>>>'
                    },
                    
                }]
            }
        }
    };

    console.log("rendered");
    console.log(fontColorLegend + " - " + fontSizeLegend);
    console.log(config.options.legend.labels.fontColor);
    console.log(config.options.legend.labels.fontSize);
    return config;
}

var config = render();


var configHorizontalBar1 = {
    type: 'horizontalBar',
    data: {
        labels: ['HDD'],
        datasets: [{
            label: 'Verwendet',
            backgroundColor: [
                window.chartColors.blue
                ],
            data: [_SysInfo1]            
        },
        {
            label: 'Frei',
            backgroundColor: [
                window.chartColors.green
                ],
            data: [_SysInfo2]
        }]
    },
    options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
            rectangle: {
                borderWidth: 2,
            }
        },
        responsive: false,
        barPercentage: 0.5,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: '16 GB SD Card',
            position: 'bottom'
        },
        scales: {
            xAxes: [
                {
                    stacked: true	
            }], 
            yAxes: [
                {
                    stacked: true	
            }]
        }
    }
};

var configHorizontalBar2 = {
    type: 'horizontalBar',
    data: {
        labels: ['RAM'],
        datasets: [{
            label: 'Verwendet',
            backgroundColor: [
                window.chartColors.blue
                ],
            data: [_SysInfo3]
        },
        {
            label: 'Frei',
            backgroundColor: [
                window.chartColors.green
                ],
            data: [_SysInfo4]
           }]
    },
    options: {
        // Elements options apply to all of the options unless overridden in a dataset
        // In this case, we are setting the border of each horizontal bar to be 2px wide
        elements: {
            rectangle: {
                borderWidth: 2,
            }
        },
        responsive: false,
        barPercentage: 0.5,
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: '1 GB RAM',
            position: 'bottom'
        },
        scales: {
            xAxes: [{
                    stacked: true,	
                }],
            yAxes: [{
                    stacked: true,	
                }]
        }
    }
};

function updTrendData(objLineChart, days) {
    
    let _objLineChart= objLineChart;
    var xhttp;
    console.log("update trend data...");
                  
    xhttp = new XMLHttpRequest();
    xhttp.objLineChart= _objLineChart;
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.status);
            //console.log("empfange Trenddaten: " + this.responseText);
            var obj = JSON.parse(this.responseText);
            this.objLineChart.config.data.labels= obj.arrayOfTime;
            this.objLineChart.config.data.datasets[0].data = obj.arrayOfYvalue1;
            this.objLineChart.config.data.datasets[1].data = obj.arrayOfYvalue2;
            this.objLineChart.config.data.datasets[2].data = obj.arrayOfYvalue3;

            /* if(days>31) {
                this.objLineChart.config.options.animation.duration= 0;
            } 
            else {
                this.objLineChart.config.options.animation.duration= 1000;
            } */
            
            this.objLineChart.update();
                       

            document.getElementById("min1").innerHTML = obj.minValue1;
            document.getElementById("max1").innerHTML = obj.maxValue1;
            document.getElementById("num1").innerHTML = obj.numValue1;
            document.getElementById("avg1").innerHTML = obj.avgOfYvalue1;


            document.getElementById("min2").innerHTML = obj.minValue2;
            document.getElementById("max2").innerHTML = obj.maxValue2;
            document.getElementById("num2").innerHTML = obj.numValue2;
            document.getElementById("avg2").innerHTML = obj.avgOfYvalue2;

            document.getElementById("min3").innerHTML = obj.minValue3;
            document.getElementById("max3").innerHTML = obj.maxValue3;
            document.getElementById("num3").innerHTML = obj.numValue3;
            document.getElementById("avg3").innerHTML = obj.avgOfYvalue3;

            document.getElementById("tooltip-text-details").innerHTML = 
            "Aussen: "+"</br>"+"Min: "+ obj.minValue1 + "</br>"+"Max: "+obj.maxValue1+ "</br>"+"&Oslash;: "+obj.avgOfYvalue1+ "&#x2103;" + "</br>"+"n: "+obj.numValue1
            + "</br></br>"+"Innen: "+"</br>"+"Min: "+ obj.minValue2 + "</br>"+"Max: "+obj.maxValue2+ "</br>"+"&Oslash;: "+obj.avgOfYvalue2+ "&#x2103;" + "</br>"+"n: "+obj.numValue2
            + "</br></br>"+"CPU: "+"</br>"+"Min: "+ obj.minValue3 + "</br>"+"Max: "+obj.maxValue3+ "</br>"+"&Oslash;: "+obj.avgOfYvalue3+ "&#x2103;" + "</br>"+"n: "+obj.numValue3

            console.log(obj.arrayOfTime);
            console.log(obj.arrayOfYvalue1);
            console.log(obj.arrayOfYvalue2);
            console.log(obj.arrayOfYvalue3);
            console.log(obj.avgOfYvalue1);
            console.log(obj.avgOfYvalue2);
            console.log(obj.avgOfYvalue3);
           
            };
        };  
    var route= "/updtrendData/"+days
    xhttp.open("GET", route, true);
    xhttp.send();
};

function updBarChartData() {
    var xhttp;
    console.log("update bar chart data...");
                  
    xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.status);
            console.log("empfange: " + this.responseText);
            var obj = JSON.parse(this.responseText);
            _SysInfo1= obj.SysInfo1;
            _SysInfo2= obj.SysInfo2;
            _SysInfo3= obj.SysInfo3;
            _SysInfo4= obj.SysInfo4;
          };
        };  
    xhttp.open("GET", "/updBarChartData", true);
    xhttp.send();
};


var buildLineChart= function() {
    var ctx1 = document.getElementById('canvas').getContext('2d');
    window.myLine = new Chart(ctx1, config);
    console.log(window.myLine);
    return window.myLine;
}

var buildHorizBar1= function() {
    var ctx2 = document.getElementById('info-hdd-canvas').getContext('2d');
    window.myHorizontalBar1 = new Chart(ctx2, configHorizontalBar1);
}

var buildHorizBar2= function() {
    var ctx3 = document.getElementById('info-ram-canvas').getContext('2d');
    window.myHorizontalBar2 = new Chart(ctx3, configHorizontalBar2);
}

var objLineChart;

//window.onload = function() {
    objLineChart = buildLineChart();
    console.log(objLineChart);
    //buildHorizBar1();
    //buildHorizBar2();
//};

/* console.log(objLineChart);
objLineChart.config.data.labels=["05.01.2019 00:00:03","05.01.2019 00:20:03","05.01.2019 00:40:03","05.01.2019 01:00:03","05.01.2019 01:20:03","05.01.2019 01:40:04","05.01.2019 02:00:03","05.01.2019 02:20:03","05.01.2019 02:40:03","05.01.2019 03:00:03","05.01.2019 03:20:04","05.01.2019 03:40:04","05.01.2019 04:00:03","05.01.2019 04:20:03","05.01.2019 04:40:03","05.01.2019 05:00:03","05.01.2019 05:20:04","05.01.2019 05:40:03","05.01.2019 06:00:03","05.01.2019 06:20:03","05.01.2019 06:40:03","05.01.2019 07:00:04","05.01.2019 07:20:03","05.01.2019 07:40:04","05.01.2019 08:00:04","05.01.2019 08:20:03","05.01.2019 08:40:03","05.01.2019 09:00:03","05.01.2019 09:20:03","05.01.2019 09:40:03","05.01.2019 10:00:04","05.01.2019 10:20:03","05.01.2019 10:40:03","05.01.2019 11:00:03","05.01.2019 11:20:04","05.01.2019 11:40:03","05.01.2019 12:00:03","05.01.2019 12:20:03","05.01.2019 12:40:03","05.01.2019 13:00:03","05.01.2019 13:20:03","05.01.2019 13:40:04","05.01.2019 14:00:03","05.01.2019 14:20:04","05.01.2019 14:40:04","05.01.2019 15:00:03","05.01.2019 15:20:03","05.01.2019 15:40:03","05.01.2019 16:00:03","05.01.2019 16:20:04","05.01.2019 16:40:04","05.01.2019 17:00:04","05.01.2019 17:20:04"];

objLineChart.config.data.datasets[0].data= [2,1.6,1.8,2.4,2.7,2.8,2.8,2.8,2.9,2.6,2.9,3,2.8,2.9,2.9,2.9,2.4,2.9,2.9,2.9,2.7,2.8,3,3.2,2.9,3.1,3,3,2.8,2.8,2.8,3.2,3.3,3.7,3.8,4.1,4.4,4.6,4.8,4.7,4.7,4.6,4.8,4.6,4.8,4.9,4.8,4.9,4.5,4.4,3.9,4.1,4.2];

objLineChart.config.data.datasets[1].data= [2,1.6,1.8,2.4,2.7,2.8,2.8,2.8,2.9,2.6,2.9,3,2.8,2.9,2.9,2.9,2.4,2.9,2.9,2.9,2.7,2.8,3,3.2,2.9,3.1,3,3,2.8,2.8,2.8,3.2,3.3,3.7,3.8,4.1,4.4,4.6,4.8,4.7,4.7,4.6,4.8,4.6,4.8,4.9,4.8,4.9,4.5,4.4,3.9,4.1,4.2];

objLineChart.config.data.datasets[2].data= [2,1.6,1.8,2.4,2.7,2.8,2.8,2.8,2.9,2.6,2.9,3,2.8,2.9,2.9,2.9,2.4,2.9,2.9,2.9,2.7,2.8,3,3.2,2.9,3.1,3,3,2.8,2.8,2.8,3.2,3.3,3.7,3.8,4.1,4.4,4.6,4.8,4.7,4.7,4.6,4.8,4.6,4.8,4.9,4.8,4.9,4.5,4.4,3.9,4.1,4.2];
 */
updTrendData(objLineChart,1);

//setInterval(function(){updTrendData(objLineChart)}, 30000)





