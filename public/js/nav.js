console.log("hello");

function changeView(i) {
    console.log(i);
    var xhttp;

    xhttp = new XMLHttpRequest();
    
    xhttp.onreadystatechange = function(i) {
      var homeURL =[];
        if (this.readyState == 4 && this.status == 200) {
          console.log(this.readyState, this.status, this.responseURL);
          document.getElementById("content").innerHTML = this.responseText;
          } else if(this.status == 401){
            console.log('--', this.readyState, this.status, this.responseURL);
            homeURL = this.responseURL.split('/');
            console.log(homeURL);
            window.location = homeURL[0]+'//'+homeURL[2]+'/LoginPage';
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

    var el;

    el= document.getElementById('nav-home');
    el.classList.remove('selected-menue-btn');
    el.classList.add('deselected-menue-btn');
    
    el= document.getElementById('nav-documentation');
    el.classList.remove('selected-menue-btn');
    el.classList.add('deselected-menue-btn');

    el= document.getElementById('nav-info');
    el.classList.remove('selected-menue-btn');
    el.classList.add('deselected-menue-btn');

    el= document.getElementById('nav-contact');
    el.classList.remove('selected-menue-btn');
    el.classList.add('deselected-menue-btn');
    
    switch (i) {
        case 1:
            el= document.getElementById('nav-home');
            el.classList.remove('deselected-menue-btn');
            el.classList.add('selected-menue-btn');
            console.log('case 1');
            console.log(el);
          break;
        case 2:
            el= document.getElementById('nav-documentation');
            el.classList.remove('deselected-menue-btn');
            el.classList.add('selected-menue-btn');
          break;
        case 3:
            el= document.getElementById('nav-info');
            el.classList.remove('deselected-menue-btn');
            el.classList.add('selected-menue-btn');
          break;
        case 4:
            el= document.getElementById('nav-contact');
            el.classList.remove('deselected-menue-btn');
            el.classList.add('selected-menue-btn');
    };
        
};