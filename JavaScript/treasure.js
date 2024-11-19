import { AnimatedSprite, Container, Graphics } from 'pixi.js';

class Treasure {
    constructor(treasureFrames, x, y, onCollect) {
        this.sprite = new AnimatedSprite(treasureFrames);
        this.sprite.anchor.set(0.5);
        this.sprite.animationSpeed = 0.1;
        this.sprite.gotoAndStop(0);

        this.container = new Container();
        this.container.addChild(this.sprite);
        this.container.x = x;
        this.container.y = y;

        // Hitbox for collision detection
        this.hitbox = new Graphics();
        this.hitbox.fill({color:0xff0000, alias:0}); 
        this.hitbox.rect(
            -this.sprite.width / 2,
            -this.sprite.height / 2,
            this.sprite.width,
            this.sprite.height
        );
        this.container.addChild(this.hitbox);

        this.onCollect = onCollect;
        this.collected = false;
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
            this.sprite.play(); // Start animation when player touches the treasure
            this.sprite.loop = false; // Play animation only once

            this.sprite.onComplete = () => {
                this.container.visible = false; // Hide treasure after animation
                this.onCollect(); // Call collectItem
            };
        }
    }

    addToStage(stage) {
        stage.addChild(this.container);
    }
}

export default Treasure;