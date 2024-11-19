import { Graphics } from 'pixi.js';

function nextLevel(app, onComplete) {
    // Create a full-screen overlay for the animation
    const overlay = new Graphics();
    overlay.fill({color: 0x000000}); // Black color
    overlay.rect(0, 0, app.screen.width, app.screen.height);
    overlay.alpha = 0; // Start fully transparent

    app.stage.addChild(overlay);

    // Animation parameters
    let fadeDirection = 1; // 1 for fade-in, -1 for fade-out
    const fadeSpeed = 0.05; // Adjust fade speed as needed

    app.ticker.add(function fadeAnimation() {
        overlay.alpha += fadeDirection * fadeSpeed;

        if (fadeDirection === 1 && overlay.alpha >= 1) {
            // Fully faded in
            fadeDirection = -1; // Start fade-out
            if (onComplete) onComplete(); // Call the level generation logic
        } else if (fadeDirection === -1 && overlay.alpha <= 0) {
            // Fully faded out
            app.ticker.remove(fadeAnimation); // Stop animation
            app.stage.removeChild(overlay); // Remove overlay
        }
    });
}

export default nextLevel;