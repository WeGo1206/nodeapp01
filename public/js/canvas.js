var canvas = document.getElementById('animation-canvas');
var cHeight = document.getElementById('animation-canvas').clientHeight;
var cWidth = document.getElementById('animation-canvas').clientWidth;
var offsets = document.getElementById('animation-canvas').getBoundingClientRect();
var cTop = offsets.top;
var cLeft = offsets.left;
var cRight = offsets.right;
var cBottom = offsets.bottom;


var c = canvas.getContext('2d');
console.log('start canvas',cTop, cLeft, cRight, cBottom, cHeight, cWidth );
console.log('start canvas',cTop - cBottom, cLeft - cRight );
// c.fillRect(100, 100, 100, 100);



var x = 5;
var y = 5;
var dx = 1;
var dy = 1;
var radius = 5;

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,cWidth,cHeight);
    c.beginPath();
    c.arc(x,y,radius,0,Math.PI * 2, false);
    c.strokeStyle = 'blue';
    c.stroke();
    console.log(x,y);
    
    if ( x + radius > 100 || x - radius < 0) {
        dx = -dx;
        console.log(x);
    }
    if ( y + radius > 100 || y - radius < 0) {
        dy = -dy;
        console.log(y);
    }
    x += dx;
    y += dy;
}

animate();
console.log('end canvas')