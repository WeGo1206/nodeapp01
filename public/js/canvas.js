var canvas = document.getElementById('animation-canvas');
var c = canvas.getContext('2d');

console.log('start canvas')
// c.fillRect(100, 100, 100, 100);



var x = 20;
var y = 20;
var dx = 4;
var dy = 4;
var radius = 30;

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    c.beginPath();
    c.arc(x,y,radius,0,Math.PI * 2, false);
    c.strokeStyle = 'blue';
    c.stroke();

    if ( x + radius > innerWidth || y - radius < 0) {
        dx = -dx;
    }
    if ( x + radius > innerHeight || y - radius < 0) {
        dy = -dy;
    }
}

animate();
console.log('end canvas')