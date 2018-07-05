console.log("hello");

function changeView(i) {
    console.log(i);
    var xhttp;

    xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function(i) {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.status);
          document.getElementById("content").innerHTML = this.responseText;
          if(i===3) {
              window.myHorizontalBar.update();
          };
          };
        };  

    if (i===2){
        xhttp.open("GET", "http://wego67.internet-box.ch/documentation", true);
    } else if (i===3){
        xhttp.open("GET", "http://wego67.internet-box.ch/info", true);
    } else if (i===4){
        xhttp.open("GET", "http://wego67.internet-box.ch/contact", true);
    }
    
    xhttp.send();
};