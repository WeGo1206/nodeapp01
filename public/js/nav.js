console.log("hello");

function changeView(i) {
    console.log(i);
    var xhttp;

    xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function(i) {
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.status);
          document.getElementById("content").innerHTML = this.responseText;
          };
        };  

    if (i===2){
        xhttp.open("GET", "http://192.168.1.114:3000/service", true);
    } else if (i===3){
        xhttp.open("GET", "http://192.168.1.114:3000/about", true);
    } else if (i===4){
        xhttp.open("GET", "http://192.168.1.114:3000/contact", true);
    }
    
    xhttp.send();
};