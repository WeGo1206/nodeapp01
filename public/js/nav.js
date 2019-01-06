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
        xhttp.open("GET", siteURLDocu, true);
    } else if (i===3){
        xhttp.open("GET", siteURLInfo, true);
    } else if (i===4){
        xhttp.open("GET", siteURLContact, true);
    }
    
    xhttp.send();

    var c;
    for(c=1; c<=4; c++) {

        elId= c+'-menue-btn';
        el= document.getElementByClass(elId);
        el.classList.remove('selected-menue-btn');
        el.classList.add('deselected-menue-btn');
        console.log(el);
    }
    
    switch (i) {
        case 1:
            el= document.getElementByClass('1-menue-btn');
            el.classList.remove('deselected-menue-btn');
            el.classList.add('selected-menue-btn');
            console.log('case 1');
            console.log(el);
          break;
        case 2:
            el= document.getElementByClass('2-menue-btn');
            el.classList.remove('deselected-menue-btn');
            el.classList.add('selected-menue-btn');
          break;
        case 3:
            el= document.getElementByClass('3-menue-btn');
            el.classList.remove('deselected-menue-btn');
            el.classList.add('selected-menue-btn');
          break;
        case 4:
            el= document.getElementByClass('4-menue-btn');
            el.classList.remove('deselected-menue-btn');
            el.classList.add('selected-menue-btn');
    };
        
};