import { Container, Text, TextStyle, Graphics } from 'pixi.js';

export function addStatusBar(app) {

    let level = 1;
    let lives = 3;
    let remainingItems = 5;

    const statusBar = new Container();
    app.stage.addChild(statusBar);

    const background = new Graphics();

    // Lage tekst for level/liv/items
    const style = new TextStyle({
        fontFamily: 'Arial',
        fontSize: 24,
        fill: 'white',
    });

    const levelText = new Text({
        text: `Level: ${level}`,
        style,
    });

    const livesText = new Text({
        text: `Lives: ${lives}`,
        style,
    });
   
    const itemsText = new Text({
        text: `Remaining items: ${remainingItems}`,
        style,
    });
    
    //Legge til bakgrunn og tekst
    statusBar.addChild(background, levelText, livesText, itemsText);

    function updateLayout() {
        // Lage ensfargig bakgrunn i form av rektangel
        background.rect(0, 0, app.screen.width, app.screen.height/10);
        background.fill(0x333333);

        //Oppdate posisjonene til tekstene
        levelText.x = app.screen.width / 10;
        levelText.y = app.screen.height / 40;
        livesText.x = (app.screen.width / 10) *4;
        livesText.y = app.screen.height / 40;
        itemsText.x = (app.screen.width / 10) *7;
        itemsText.y = app.screen.height / 40;
    };
    
    updateLayout();

    window.addEventListener('resize', () => {
        updateLayout();
    })


}