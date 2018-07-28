var canvas = document.getElementById('animation-canvas');
var cHeight = window.innerHeight;
var cWidth = window.innerWidth;
var offsets = document.getElementById('animation-canvas').getBoundingClientRect();
var cTop = offsets.top;
var cLeft = offsets.left;
var cRight = offsets.right;
var cBottom = offsets.bottom;


var c = canvas.getContext('2d');
console.log('start canvas',cTop, cLeft, cRight, cBottom, cHeight, cWidth );
console.log('start canvas',cTop - cBottom, cLeft - cRight );
// c.fillRect(100, 100, 100, 100);

c.width = cWidth;
c.height = cHeight * 0.5;

c.strokeStyle = 'black';
c.lineWidth = '1';
c.strokeRect(0, 0, c.width, c.height);

var x = 15;
var y = 15;
var dx = 1;
var dy = 1;
var radius = 10;

var x2 = 120;
var y2 = 15;
var dx2 = 5;
var dy2 = 1;
var radius2 = 10;

var bRightBorder = false;
var bLeftBorder = false;

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,c.width+100,c.height+100);
    // Ball1
    c.fillStyle = 'red';
    c.beginPath();
    c.arc(x,y,radius,0,Math.PI * 2, false);
    c.strokeStyle = 'red';
    c.stroke();
    c.closePath();
    c.fill();
    // console.log(x,y);
    
    if ( x + radius > c.width || x - radius < 0) {
        dx = -dx;
        //console.log(x);
    }
    if ( y + radius > c.height || y - radius < 0) {
        dy = -dy;
        //console.log(y);
    }
    x += dx;
    y += dy;

    // Ball2
    c.fillStyle = 'blue';
    c.beginPath();
    c.arc(x2,y2,radius2,0,Math.PI * 2, false);
    c.strokeStyle = 'blue';
    c.stroke();
    c.closePath();
    c.fill();
    // console.log(x,y);
    
    

    if ( x2 + radius2 > 300) {
        
        if ( bRightBorder === false) {
        dx2 = (-dx2 * 0.7);
        bRightBorder = true;
        bLeftBorder = false;
        console.log(dx2);
        if ( Math.abs(dx2) <= 0.15 ) { dx2 = 0;}
        }
    }
    if ( x2 - radius2 < 0) {
        
        if ( bLeftBorder === false) {
        dx2 = (-dx2 * 0.7);
        bLeftBorder = true;
        bRightBorder = false;
        console.log(dx2);
        if ( Math.abs(dx2) <= 0.15 ) { dx2 = 0;}
        }
    }
    if ( y2 + radius2 > 150) {
        dy2 = (dy2 * -0.99);
        //console.log(dy2);
        //console.log(y2);
    }
    else {
        dy2 += 1;
        //console.log(dy2);
    }
    x2 += dx2;
    //console.log(dy2);
    //console.log(y2 + radius2);
    y2 += dy2;
}

animate();
console.log('end canvas')