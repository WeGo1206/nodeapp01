var canvas = document.getElementById('collision-canvas');
var cHeight = window.innerHeight * 0.5;
var cWidth = window.innerWidth * 0.8;
var c = canvas.getContext('2d');
canvas.width = cWidth;
canvas.height = cHeight;

function rotate(velocity, angle) {
    const rotatedVelocities = {
        x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
        y: velocity.x * Math.sin(angle) + velocity.y * Math.cos(angle)
    };
    return rotatedVelocities;
}

function resolveCollision(particle, otherParticle) {
    const xVelocityDiff = particle.velocity.x - otherParticle.velocity.x;
    const yVelocityDiff = particle.velocity.y - otherParticle.velocity.y;

    const xDist = otherParticle.x - particle.x;
    const yDist = otherParticle.y - particle.y;

    if (xVelocityDiff * xDist + yVelocityDiff * yDist >= 0) {
        const angle = -Math.atan2(otherParticle.y - particle.y, otherParticle.x - particle.x);

        const m1 = particle.mass;
        const m2 = otherParticle.mass;

        const u1 = rotate(particle.velocity, angle);
        const u2 = rotate(otherParticle.velocity, angle);

        const v1 = { x: u1.x * (m1 - m2) / (m1 + m2) + u2.x * 2 * m2 / (m1 + m2), y: u1.y};
        const v2 = { x: u2.x * (m1 - m2) / (m1 + m2) + u1.x * 2 * m2 / (m1 + m2), y: u2.y};

        const vFinal1 = rotate(v1, -angle);
        const vFinal2 = rotate(v2, -angle);

        particle.velocity.x = vFinal1.x;
        particle.velocity.y = vFinal1.y;


        otherParticle.velocity.x = vFinal2.x;
        otherParticle.velocity.y = vFinal2.y;
        }
}


function distance(x1,y1,x2,y2) {
    const xDist = x2 - x1;
    const yDist = y2 - y1;

    return Math.sqrt(Math.pow(xDist, 2) + Math.pow(yDist, 2));
}

function randomIntFromRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function Particles(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.velocity = {
        x: Math.random() - 0.5,
        y: Math.random() - 0.5
    }
    this.radius = radius;
    this.color = color;
    this.mass = 1;

    this.update = particles => {
        this.draw();

        for (var i = 0; i < particles.length; i++) {
            if ( this === particles[i]) continue;

            if (distance(this.x, this.y, particles[i].x, particles[i].y) - this.radius * 2 < 0) {
                resolveCollision(this,particles[i]);
            }
        }

        if ( this.x - this.radius <= 0 || this.x + this.radius >= cWidth ) {
            this.velocity.x = -this.velocity.x
        }

        if ( this.y - this.radius <= 0 || this.y + this.radius >= cHeight ) {
            this.velocity.y = -this.velocity.y
        }

        this.x += this.velocity.x;
        this.y += this.velocity.y;
    };

    this.draw = () => {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        c.closePath;
    
    }
}

var particles;

function init() {
    particles = [];
    for (var i = 0; i < 100; i++) {
        const radius = 10;
        var x = randomIntFromRange(radius, cWidth - radius);
        var y = randomIntFromRange(radius, cHeight - radius);
        const color = 'blue';

        if (i!==0) {
            for (var j = 0; j < particles.length; j++) {
                if(distance(x, y, particles[j].x, particles[j].y) - radius * 2 < 0 ) {
                    x = randomIntFromRange(radius, cWidth - radius);
                    y = randomIntFromRange(radius, cHeight - radius);
                    j = -1;
                }
                
            }
        }
        particles.push(new Particles(x, y, radius, color));

    }
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,cWidth,cHeight);

    particles.forEach(particle => {
        particle.update(particles);
    })

    
}

init();
animate();
console.log('end canvas')