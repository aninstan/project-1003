import { Container, Graphics, AnimatedSprite } from 'pixi.js';

class Enemy {
    constructor(enemyTexture, x, y, map, statusBarMethods, player) {
        this.sprite = new AnimatedSprite(enemyTexture);
        this.sprite.anchor.set(0.5);
        this.sprite.animationSpeed = 0.1; // Speed of animation
        this.sprite.play();

        this.container = new Container();
        this.container.addChild(this.sprite);
        this.container.x = x;
        this.container.y = y;

        this.map = map;
        this.statusBar = statusBarMethods;
        this.player = player;

        // Enemy speed
        this.speed = Math.random() -0.1;

        // Hitbox for collision
        this.hitbox = new Graphics();
        this.hitbox.fill({color: 0xff0000, alias: 0}); // Invisible hitbox
        this.hitbox.rect(-this.sprite.width / 2, -this.sprite.height / 2, this.sprite.width, this.sprite.height);
        this.container.addChild(this.hitbox);
    }

    update(delta) {
        // Get vector towards player
        const dx = this.player.container.x - this.container.x;
        const dy = this.player.container.y - this.container.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            const moveX = (dx / distance) * this.speed * delta;
            const moveY = (dy / distance) * this.speed * delta;

            const newX = this.container.x + moveX;
            const newY = this.container.y + moveY;

            // Check valid floor tiles
            if (this.map.isWalkableTile(newX, newY)) {
                this.container.x = newX;
                this.container.y = newY;
            }
        }

        // Collision detection with the player
        if (this.checkCollision(this.player)) {
            this.statusBar.loseLife(); // Deduct a life
        }
    }

    checkCollision(player) {
        const playerHitbox = player.hitbox.getBounds();
        const enemyHitbox = this.hitbox.getBounds();

        return (
            playerHitbox.x + playerHitbox.width > enemyHitbox.x &&
            playerHitbox.x < enemyHitbox.x + enemyHitbox.width &&
            playerHitbox.y + playerHitbox.height > enemyHitbox.y &&
            playerHitbox.y < enemyHitbox.y + enemyHitbox.height
        );
    }

    addToStage(stage) {
        stage.addChild(this.container);
    }
}

export default Enemy;
