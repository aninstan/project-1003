import { Application, Assets, Texture, Rectangle, Container, AnimatedSprite, Spritesheet } from 'pixi.js';
import Room from './room.js';
import Map from './map.js';
import Player from './player.js';

import dungeonTilesetPath from '../assets/terrain/Dungeon_Tileset.png';
import { addStatusBar } from './statusbar.js';

(async () =>
{
    // Create a new application
    const app = new Application();

    // Initialize the application
    await app.init({ background: '#241318', resizeTo: document.getElementById('gamecontent')});

    // Append the application canvas to the document body
    document.getElementById('gamecontent').appendChild(app.canvas);

    const imageTexture = await Assets.load(dungeonTilesetPath);

    const atlasData = {
        frames: {
            floorTile: {
                frame: { x: 16*7, y: 16*0, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            wallTileTop: {
                frame: { x: 16, y: 0, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            wallTileLeft: {
                frame: { x: 0, y: 16, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            wallTileRight: {
                frame: { x: 16*5, y: 16, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            wallTileBottom: {
                frame: { x: 16, y: 16*5, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            }, 
            wallTileBottomRight: {
                frame: { x: 16*5, y: 16*4, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            }, 
            wallTileBottomLeft: {
                frame: { x: 0, y: 16*4, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            }, 
            wallTileTopRight: {
                frame: { x: 16*5, y: 0, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            }, 
            wallTileTopLeft: {
                frame: { x: 0, y: 0, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            playerTexture: {
                frame: { x: 0, y: 16*9, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            }
    
        },
        meta: {
            image: "/assets/terrain/Dungeon_Tileset.png", // Update this path with the actual path to your tileset image
            format: 'RGBA8888',
            size: { w: 160, h: 160 },
            scale: 1
        }
    };

    const spritesheet = new Spritesheet(imageTexture, atlasData);

    await spritesheet.parse();

    function setup() {
        const tileSize = 16;

        // Define textures for different tile types
        const tileTextures = [
            spritesheet.textures.floorTile,
            spritesheet.textures.wallTileTop,
            spritesheet.textures.wallTileLeft,
            spritesheet.textures.wallTileRight,
            spritesheet.textures.wallTileBottom,
            spritesheet.textures.wallTileBottomRight,
            spritesheet.textures.wallTileBottomLeft,
            spritesheet.textures.wallTileTopRight,
            spritesheet.textures.wallTileTopLeft,
            spritesheet.textures.playerTexture
        ];

        const room1 = new Room(20, 10);
        const map = new Map(20, 20, tileTextures);
        map.addRoom(room1, 0, 2);

        const gameLayer = new Container();
        const uiLayer = new Container();

        app.stage.addChild(gameLayer);
        app.stage.addChild(uiLayer);

        map.renderMap(gameLayer, tileSize);

        // Add player to gameLayer
        const playerTexture = spritesheet.textures.playerTexture;
        const player = new Player(playerTexture, 100, 100, map);
        gameLayer.addChild(player.container);

        // Add status bar to UI layer
        addStatusBar(uiLayer, app);

        const zoomLevel = 4; // Adjust this value for zoom level

        function centerOnPlayer() {
            gameLayer.pivot.set(player.container.x, player.container.y);
            gameLayer.position.set(app.screen.width / 2, app.screen.height / 2);

            // Apply zoom
            gameLayer.scale.set(zoomLevel);
        }

        app.ticker.add((delta) => {
            if (isNaN(delta) || delta <= 0) {
                delta = 1; // Force default delta if calculation fails
            }
            player.update(delta);
            centerOnPlayer();
        });

    }

    setup();
})();