import { BlurFilter, Text, TextStyle } from 'pixi.js';

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
    gameOverText.y = 0;
    gameOverText.anchor.set(0.5, 1);

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
    function startOver(){
        gameOverBlur.strength = 0;
        app.stage.removeChild(gameOverText);
        app.stage.addChild(restartText);

        window.addEventListener('keydown', function (event) {
            if (event.key === 'Enter') {
                restartText.visible = false;
                console.log("Enter trykket, restartText fjernet");
            };
        }, {once: true});
        //Mangler funksjonalitet slik at spillet starter på nytt når det trykkes Enter
    };

    //Lager funksjon som etter få sekunder begynner å blurre ut spillet
    let blurAmount = -10;
    let count = 0;
    const increment = 0.1;
    const maxBlur = 20;
    const maxY = app.screen.height / 2 + gameOverText.height /2

    app.ticker.add(() =>
        {
            //La game over-teksten "dette ned" gradvis
            if (gameOverText.y < maxY) {gameOverText.y += app.screen.height/100};

            //Legge til gradvis mer blurr
            count += increment;
            if (blurAmount <= maxBlur) {blurAmount += increment};
            if (blurAmount < 0) {gameOverBlur.strength = 0} else {gameOverBlur.strength = blurAmount};

            //Etter en stund kommer beskjed om å trykke enter for å starte spillet på nytt
            if (count >= 40) {startOver()};
        
        });
};