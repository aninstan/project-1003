import { Container, Graphics, AnimatedSprite } from 'pixi.js';

class Enemy {
    constructor(enemyTexture, x, y, map, onCrash, player) {
        this.sprite = new AnimatedSprite(enemyTexture);
        this.sprite.anchor.set(0.5);
        this.sprite.animationSpeed = 0.1; 
        this.sprite.play();

        this.onCrash = onCrash;
        this.container = new Container();

        this.sprite.scale.set(1); 

        this.container.x = x;
        this.container.y = y;

        this.map = map;
        this.player = player;

        // Enemy speed
        this.speed = Math.random() * 0.5 + 0.2; // Ensure a minimum positive speed

        // Hitbox for collision
        this.hitbox = new Graphics();
        this.hitbox.fill({ color: 0x00ff00, alpha: 0.3 }); 
        this.hitbox.rect(-this.sprite.width / 2, -this.sprite.height / 2, this.sprite.width, this.sprite.height);

        this.container.addChild(this.sprite);
        this.container.addChild(this.hitbox);

        this.hasCollided = false;
    }

    update(delta) {
        if (!this.player || !this.player.container) return;

        const dx = this.player.container.x - this.container.x;
        const dy = this.player.container.y - this.container.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            const moveX = (dx / distance) * this.speed * delta;
            const moveY = (dy / distance) * this.speed * delta;

            const newX = this.container.x + moveX;
            const newY = this.container.y + moveY;

            if (this.map.isWalkableTile(newX, newY)) {
                this.container.x = newX;
                this.container.y = newY;
            }
        }

        if (this.checkCollision(this.player)) {
            if (!this.hasCollided) {
                console.log("Collision detected!");
                this.onCrash();
                this.hasCollided = true;
            }
        } else {
            this.hasCollided = false; 
        }
    }

    checkCollision(player) {
        const playerBounds = player.hitbox.getBounds(true); 
        const enemyBounds = this.hitbox.getBounds(true);

        return (
            playerBounds.x + playerBounds.width > enemyBounds.x &&
            playerBounds.x < enemyBounds.x + enemyBounds.width &&
            playerBounds.y + playerBounds.height > enemyBounds.y &&
            playerBounds.y < enemyBounds.y + enemyBounds.height
        );
    }

    addToStage(stage) {
        stage.addChild(this.container);
    }
}

export default Enemy;
