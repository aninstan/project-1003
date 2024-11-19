import { BlurFilter, Text, TextStyle } from 'pixi.js';

export function gameOver(app) {
    const gameOverBlur = new BlurFilter();
    app.stage.filters = [gameOverBlur];

    // Game Over text
    const style = new TextStyle({
        fontFamily: 'Poppins',
        fontSize: app.screen.height / 4,
        fill: 'yellow',
    });

    const gameOverText = new Text('Game Over', style);
    gameOverText.x = app.screen.width / 2;
    gameOverText.y = app.screen.height / 9*4.5;
    gameOverText.anchor.set(0.5);

    app.stage.addChild(gameOverText);

    // Restart prompt text
    const style2 = new TextStyle({
        fontFamily: 'Poppins',
        fontSize: app.screen.height / 8,
        fill: 'white',
    });

    const restartText = new Text('Press Enter to restart game', style2);
    restartText.x = app.screen.width / 2;
    restartText.y = app.screen.height / 9*3;
    restartText.anchor.set(0.5);

    app.stage.addChild(restartText);

    let blurAmount = 0;
    const maxBlur = 20;

    // Gradual blur effect
    app.ticker.add(() => {
        if (blurAmount < maxBlur) {
            blurAmount += 0.5;
            gameOverBlur.strength = blurAmount;
        }
    });

    // Allow restart
    window.addEventListener(
        'keydown',
        function (event) {
            if (event.key === 'Enter') {
                restartGame(app);
            }
        },
        { once: true }
    );
}

function restartGame(app) {
    app.stage.filters = []; // Remove blur
    app.stage.removeChildren(); // Clear the stage
    window.location.reload(); // Reset game state by reloading
}

