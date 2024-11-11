import { Application, Assets, Container, Sprite } from 'pixi.js';
import { addStatusBar, resizeStatusBar } from './statusbar.js';

(async () =>
{
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ background: '#1099bb', resizeTo: document.getElementById('gamecontent'),
     });

    // Append the application canvas to the document body
    document.getElementById('gamecontent').appendChild(app.canvas);

    //Add status bar
    addStatusBar(app);
    

    // Listen for animate update
    app.ticker.add((time) =>
    {
      
    });
})();
