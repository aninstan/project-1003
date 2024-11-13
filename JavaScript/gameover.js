import { BlurFilter, Container, Text, TextStyle, Graphics } from 'pixi.js';

export function gameOver(app) {
    // Opprette blurfilter og legge til stage
    const gameOverBlur = new BlurFilter();
    app.stage.filters = [gameOverBlur];
    
    // Legge til game over-skrift
    const style = new TextStyle({
        fontFamily:'Arial',
        fontSize: app.screen.height / 4,
        fill: 'red'
    });

    const gameOverText = new Text({
        text: 'Game over',
        style,
    });

    //Legge til game over-tekst midt på skjermen
    gameOverText.x = app.screen.width / 2;
    gameOverText.y = app.screen.height / 2;
    gameOverText.anchor.set(0.5);

    app.stage.addChild(gameOverText);

    //Opprette tekst for restartknapp
    const style2 = new TextStyle({
        fontFamily:'Arial',
        fontSize: app.screen.height / 8,
        fill: 'white'
    });
    
    const restartText = new Text({
        text: 'Press Enter to restart game',
        style: style2,
    });
    
    restartText.x = app.screen.width / 2;
    restartText.y = app.screen.height / 2;
    restartText.anchor.set(0.5);

    //Lage funksjon som oppretter knapp for å starte spillet på nytt
    function startOverButton(){
        gameOverBlur.blur = 0;
        app.stage.removeChild(gameOverText);
        app.stage.addChild(restartText);
        //Mangler funksjonalitet slik at spillet starter på nytt når det trykkes Enter
    };

    //Lager funksjon som etter få sekunder begynner å blurre ut spillet
    let blurAmount = -10;
    let count = 0;
    const increment = 0.1;
    const maxBlur = 20;

    app.ticker.add(() =>
        {
            count += increment;
            if (blurAmount <= maxBlur) {blurAmount += increment};
            if (blurAmount < 0) {gameOverBlur.blur = 0} else {gameOverBlur.blur = blurAmount};

            if (count >= 40) {startOverButton()};
        
        });
};