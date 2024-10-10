// makes waves roll on the bottom of the screen

// create a canvas element

var canvas = document.createElement('canvas');
canvas.width = window.innerWidth + 20;
canvas.height = 100;
canvas.style.position = 'fixed';
canvas.style.bottom = 0;
canvas.style.left = 0;
canvas.style.zIndex = -1;
document.body.appendChild(canvas);

// get the context of the canvas
var ctx = canvas.getContext('2d');

// set the number of waves
var waves = 4;

// set the number of points in each wave
var points = 100;

// set the amplitude of the waves
var amplitude = 20;

// set the speed of the waves
var speed = 0.05;

// set the color of the waves
var color = 'rgba(255, 255, 255, 0.15)';
ctx.fillStyle = color;

// set the initial phase of the waves
var phase = 0;

// set the initial time
var time = 0;

// set the initial position of the waves
var y = 0;

// draw the waves

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (var i = 0; i < waves; i++) {
        ctx.beginPath();
        for (var j = 0; j < points; j++) {
            var x = j / points * canvas.width;
            var y = Math.sin(x / canvas.width * Math.PI * 2 + phase) * amplitude + canvas.height / 2;
            ctx.lineTo(x, y);
        }
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
    }

    // Draw the overlay wave
    ctx.beginPath();
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Change the color for the overlay wave
    for (var j = 0; j < points; j++) {
        var x = j / points * canvas.width;
        var y = Math.sin(x / canvas.width * Math.PI * 2 + phase + Math.PI) * (amplitude / 2) + canvas.height / 2; // Different phase and amplitude
        ctx.lineTo(x, y);
    }
    ctx.lineTo(canvas.width, canvas.height);
    ctx.lineTo(0, canvas.height);
    ctx.closePath();
    ctx.fill();
}

// update the waves

function update() {
    phase += speed;
    time += 1;
    draw();
    requestAnimationFrame(update);
}

// start the waves

update();
