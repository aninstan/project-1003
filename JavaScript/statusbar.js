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
        const statusBarHeight = app.screen.height / 15;

        const fontSize = statusBarHeight / 2;
        const style = new TextStyle({
            fontFamily: 'Arial',
            fontSize: fontSize,
            fill: 'white',
        });

        levelText.style = style;
        livesText.style = style;
        itemsText.style = style;

        // Lage ensfargig bakgrunn i form av rektangel
        background.rect(0, 0, app.screen.width, statusBarHeight);
        background.fill(0x333333);

        //Sett teksten i hver sin tredjedels boks med 0.05 skjermbredde "buffer"
        const textPositionY = (statusBarHeight - levelText.height) / 2;
        const sectionBuffer = app.screen.width * 0.05;
        const totalWidth = app.screen.width - 0 * sectionBuffer;
        const spacing = totalWidth / 3 + 40;

        levelText.x = sectionBuffer;
        levelText.y = textPositionY;

        livesText.x = sectionBuffer + spacing;
        livesText.y = textPositionY;

        itemsText.x = sectionBuffer + 2 * spacing;
        itemsText.y = textPositionY;

    }

    function nextLevel() {
        level += 1;
        levelText.text = `Level: ${level}`;
    }

    function loseLife() {
        lives -= 1;
        livesText.text = `Lives: ${lives}`;
    }

    function collectItem() {
        remainingItems -= 1;
        itemsText.text = `Remaining items: ${remainingItems}`;
    }

    function setLiveCount(count) {
        lives = count;
        livesText.text = `Lives: ${lives}`;
    }

    function setRemainingItems(count) {
        remainingItems = count;
        itemsText.text = `Remaining items: ${remainingItems}`;
    }
updateLayout();

window.addEventListener('resize', updateLayout);

return { nextLevel, loseLife, collectItem, setLiveCount, setRemainingItems };
}
