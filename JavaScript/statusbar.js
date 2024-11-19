import { Container, Text, TextStyle, Graphics } from 'pixi.js';

export function addStatusBar(uiLayer, app) {
    let level = 1;
    let lives = 3;
    let remainingItems = 5;

    const statusBar = new Container();
    uiLayer.addChild(statusBar); // Add to UI layer, separate from game world

    const background = new Graphics();

    const levelText = new Text({text: `Level: ${level}`,});
    const livesText = new Text({text: `Lives: ${lives}`});
    const itemsText = new Text({text: `Remaining items: ${remainingItems}`});
    
    statusBar.addChild(background, levelText, livesText, itemsText);

    function updateLayout() {
        const statusBarHeight = app.screen.height / 10;

        // Set dynamic styles for text
        const fontSize = statusBarHeight / 2.5;
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: fontSize,
            fill: 'white',
        });

        levelText.style = style;
        livesText.style = style;
        itemsText.style = style;

        // Update background dimensions
        background.clear();
        background.beginFill(0x333333); // Dark background color
        background.drawRect(0, 0, app.screen.width, statusBarHeight); // Full-width rectangle
        background.endFill();

        // Position text elements properly within the status bar
        const textPositionY = (statusBarHeight - levelText.height) / 2;
        const sectionWidth = app.screen.width / 3;

        levelText.x = sectionWidth // Left section
        levelText.y = textPositionY;

        livesText.x = sectionWidth * 1.5 - (livesText.width / 2); // Center section
        livesText.y = textPositionY;

        itemsText.x = app.screen.width - sectionWidth * 0.5 - itemsText.width; // Right section
        itemsText.y = textPositionY;
    }

    updateLayout();

    window.addEventListener('resize', updateLayout);
}
