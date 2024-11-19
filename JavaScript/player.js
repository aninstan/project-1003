import { Sprite, Container, Graphics } from 'pixi.js';

class Player {
    constructor(texture, x, y, map) {
        if (isNaN(x) || isNaN(y)) {
            console.error("Player initialized with invalid position:", x, y);
            x = 0; // Fallback to prevent NaN
            y = 0;
        }
    
        this.sprite = new Sprite(texture);
        this.sprite.anchor.set(0.5);
        this.container = new Container();

        this.sprite.scale.set(1); 
    
        this.container.x = x;
        this.container.y = y;

        this.map = map;
    
        console.log(`Player initialized at x=${x}, y=${y}`); // Ensure valid initialization
    
        // Hitbox setup
        this.hitbox = new Graphics();
        this.hitbox.rect(-this.sprite.width / 2, -this.sprite.height / 2, this.sprite.width, this.sprite.height);
        this.hitbox.fill({color: 0xFF0000, alpha: 0});
    
        this.container.addChild(this.sprite);
        this.container.addChild(this.hitbox);
    
        this.speed = 1.5;
        this.keys = {};
        this.initInput();
    }
    

    initInput() {
        window.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });
    }

    update(delta) {
        if (isNaN(delta) || delta === undefined || delta === null) {
            console.error("Invalid delta value:", delta);
            return;
        }
    
        let dx = 0;
        let dy = 0;
    
        if (this.keys['ArrowUp'] || this.keys['w']) dy -= this.speed * delta;
        if (this.keys['ArrowDown'] || this.keys['s']) dy += this.speed * delta;
        if (this.keys['ArrowLeft'] || this.keys['a']) dx -= this.speed * delta;
        if (this.keys['ArrowRight'] || this.keys['d']) dx += this.speed * delta;

        const newX = this.container.x + dx;
        const newY = this.container.y + dy;

        if (this.map.isWalkableTile(newX, newY)) {
            this.container.x = newX;
            this.container.y = newY;
        }
    }
    

    addToStage(stage) {
        stage.addChild(this.container);
    }
}

export default Player;
