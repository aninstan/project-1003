class Waves {
  constructor(amplitude, speed, waves, color) {
    this.amplitude = amplitude;
    this.speed = speed;
    this.waves = waves;
    this.color = color;
    this.phase = 0; // Initialize phase
    this.points = 100; // Initialize the number of points for wave drawing
    this.colorShift = 0; // Initial color shift for dynamic effect
  }

  createCanvas() {
    this.canvas = document.createElement("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = 120;
    this.canvas.style.position = "fixed";
    this.canvas.style.bottom = 0;
    this.canvas.style.left = 0;
    this.canvas.style.zIndex = -1;
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext("2d");
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    const colorIntensity = 0.5 + Math.sin(this.colorShift) * 0.3; // Dynamic color intensity

    for (let i = 0; i < this.waves; i++) {
      this.ctx.beginPath();
      this.ctx.globalAlpha = 0.5 + i * 0.1; // Layered opacity effect
      for (let j = 0; j < this.points; j++) {
        let x = (j / this.points) * this.canvas.width;
        let y =
          Math.sin((x / this.canvas.width) * Math.PI * 2 + this.phase + i) *
            this.amplitude +
          this.canvas.height / 2;
        this.ctx.lineTo(x, y);
      }
      this.ctx.lineTo(this.canvas.width, this.canvas.height);
      this.ctx.lineTo(0, this.canvas.height);
      this.ctx.closePath();

      // Dynamic gradient effect
      const gradient = this.ctx.createLinearGradient(
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
      gradient.addColorStop(0, `rgba(34, 56, 35, ${colorIntensity})`);
      gradient.addColorStop(1, `rgba(24, 30, 54, ${colorIntensity * 0.8})`);
      this.ctx.fillStyle = gradient;
      this.ctx.fill();
    }
  }

  update() {
    this.phase += this.speed / 1000; // Increment phase by speed for smooth wave motion
    this.colorShift += 0.01; // Increment color shift for dynamic gradient effect
    this.draw();
    requestAnimationFrame(this.update.bind(this));
  }

  main() {
    this.createCanvas();
    this.update();
  }
}

let waves1 = new Waves(50, 10, 3, "rgba(34, 56, 35, 0.4)");
let waves2 = new Waves(35, 12, 3, "rgba(24, 30, 54, 0.3)");

waves1.main();
waves2.main();
waves3.main();
