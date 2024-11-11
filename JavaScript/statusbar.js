import { Container, Text, TextStyle, Graphics } from 'pixi.js';

export function addStatusBar(app) {

    let level = 1;
    let lives = 3;
    let remainingItems = 5;

    const statusBar = new Container();
    app.stage.addChild(statusBar);

    const background = new Graphics();

    // Lage tekst for level/liv/items

    const levelText = new Text({text: `Level: ${level}`,});
    const livesText = new Text({text: `Lives: ${lives}`});
    const itemsText = new Text({text: `Remaining items: ${remainingItems}`});
    
    //Legge til bakgrunn og tekst
    statusBar.addChild(background, levelText, livesText, itemsText);

    function updateLayout() {

        const statusBarHeight = app.screen.height / 10;

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
        background.rect(0, 0, app.screen.width*1.2, statusBarHeight);
        background.fill(0x333333);

        //Sett teksten i hver sin tredjedels boks med 0.05 skjermbredde "buffer"
        const textPositionY = (statusBarHeight - levelText.height) / 2;
        const sectionWidth = (app.screen.width * 0.9) / 3;
        const sectionBuffer = app.screen.width * 0.05;

        //Oppdate posisjonene til tekstene
        levelText.x = sectionBuffer;
        levelText.y = textPositionY;
        livesText.x = sectionBuffer + sectionWidth + (livesText.width/2) ;
        livesText.y = textPositionY;
        itemsText.x = app.screen.width - sectionBuffer - itemsText.width;
        itemsText.y = textPositionY;
    };
    
    updateLayout();

    window.addEventListener('resize', () => {
        updateLayout();
    })


}