class Waves {
    constructor(amplitude, speed, waves, color) {
        this.amplitude = amplitude;
        this.speed = speed;
        this.waves = waves;
        this.color = color;
        this.phase = 0; // Initialize phase
        this.points = 100; // Initialize the number of points for wave drawing
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.width = window.innerWidth + 20;
        this.canvas.height = 100;
        this.canvas.style.position = 'fixed';
        this.canvas.style.bottom = 0;
        this.canvas.style.left = 0;
        this.canvas.style.zIndex = -1;
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d'); // Assign canvas context to a class property
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        for (var i = 0; i < this.waves; i++) {
            this.ctx.beginPath();
            for (var j = 0; j < this.points; j++) {
                var x = (j / this.points) * this.canvas.width;
                var y = Math.sin((x / this.canvas.width) * Math.PI * 2 + this.phase) * this.amplitude + this.canvas.height / 2;
                this.ctx.lineTo(x, y);
            }
            this.ctx.lineTo(this.canvas.width, this.canvas.height);
            this.ctx.lineTo(0, this.canvas.height);
            this.ctx.closePath();
            this.ctx.fillStyle = this.color; // Set fill color
            this.ctx.fill();
        }

        // Draw overlay wave with a different color and phase
        this.ctx.beginPath();
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)'; // Change the color for the overlay wave
        for (var j = 0; j < this.points; j++) {
            var x = (j / this.points) * this.canvas.width;
            var y = Math.sin((x / this.canvas.width) * Math.PI * 2 + this.phase + Math.PI) * (this.amplitude / 2) + this.canvas.height / 2; // Different phase and amplitude
            this.ctx.lineTo(x, y);
        }

        this.ctx.lineTo(this.canvas.width, this.canvas.height);
        this.ctx.lineTo(0, this.canvas.height);
        this.ctx.closePath();
        this.ctx.fill();
    }

    update() {
        this.phase += this.speed / 1000; // Increment phase by speed (adjusted for smoothness)
        this.draw(); // Call draw method to render the updated waves
        requestAnimationFrame(this.update.bind(this)); // Use requestAnimationFrame for smooth animation
    }

    main() {
        this.createCanvas(); // Initialize canvas first
        this.update(); // Start the update loop
    }
};

let waves = new Waves(50, 10, 1, "rgba(255, 255, 255, 0.2)"); 
let waves2 = new Waves(40, 15, 1, "rgba(255, 255, 255, 0.1)"); 
waves.main();
waves2.main();
