import { AnimatedSprite, Container, Graphics } from 'pixi.js';

class Treasure {
    constructor(treasureFrames, x, y, onCollect) {
        this.sprite = new AnimatedSprite(treasureFrames);
        this.sprite.anchor.set(0.5);
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();

        this.container = new Container();
        this.container.addChild(this.sprite);
        this.container.x = x;
        this.container.y = y;

        // Hitbox for collision detection
        this.hitbox = new Graphics();
        this.hitbox.fill({color: 0xff0000, alpha: 0}); // Invisible hitbox
        this.hitbox.rect(
            -this.sprite.width / 2,
            -this.sprite.height / 2,
            this.sprite.width,
            this.sprite.height
        );
        this.container.addChild(this.hitbox);

        this.onCollect = onCollect;
        this.collected = false; // Ensure it disappears only once
    }

    checkCollision(player) {
        if (
            !this.collected &&
            player.container.x + player.hitbox.width / 2 > this.container.x - this.sprite.width / 2 &&
            player.container.x - player.hitbox.width / 2 < this.container.x + this.sprite.width / 2 &&
            player.container.y + player.hitbox.height / 2 > this.container.y - this.sprite.height / 2 &&
            player.container.y - player.hitbox.height / 2 < this.container.y + this.sprite.height / 2
        ) {
            this.collected = true;
            this.container.visible = false;
            this.onCollect(); // Call the collectItem method
        }
    }

    addToStage(stage) {
        stage.addChild(this.container);
    }
}

export default Treasure;
