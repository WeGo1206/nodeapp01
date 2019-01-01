var fadeInOut;
var init = false;

if(init === false) {
    var img = document.getElementById('value-overview');
    img.classList.remove('hide');
    img.classList.add('show');
    updActValues();
    init = true;
    window.document.body.style.zoom = 1.0;
}


function updActValues() {
    var xhttp;
    console.log("update actual values...");
    var img = document.getElementById('value-overview');
    img.classList.remove('show');
    img.classList.add('hide');
               
    xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.status);
          console.log("empfange: " + this.responseText);
          var obj = JSON.parse(this.responseText);
          console.log(obj.tempOutside);
          console.log(obj.tempInside);
          console.log(obj.tempProcessor);
          console.log(obj.timeStamp);
          document.getElementById("actValOutside").innerHTML = obj.tempOutside;
          document.getElementById("actValInside").innerHTML = obj.tempInside;
          document.getElementById("actValProcessor").innerHTML = obj.tempProcessor;
          document.getElementById("actValTimeStamp").innerHTML = obj.timeStamp;
          };
        };  

    xhttp.open("GET", "/updActValues", true);
    xhttp.send();
    fadeInOut = true;
    setTimeout(function(){fadingActValues()},100)
};

function fadingActValues() {
    if(fadeInOut === true) {
        console.log("fadein", fadeInOut)
        var img = document.getElementById('value-overview');
        img.classList.remove('hide');
        img.classList.add('show');
        fadeInOut = false;
    };
}

var updCycle = setInterval(function(){updActValues()}, 60000);
//var fadingCycle = setInterval(function(){fadingActValues()}, 2000);
