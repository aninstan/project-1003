import { Application, Assets, Texture, Rectangle, Container, AnimatedSprite, Spritesheet } from 'pixi.js';
import Room from './room.js';
import Map from './map.js';
import Player from './player.js';

import dungeonTilesetPath from '../assets/terrain/Dungeon_Tileset.png';
import { addStatusBar, resizeStatusBar } from './statusbar.js';

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

        // Create rooms with the defined tile textures
        const room1 = new Room(20, 10);

        // Create a map and add rooms at specific positions
        const map = new Map(20, 20, tileTextures);
        map.addRoom(room1, 4, 4);  // Place room1 at position (3, 3)

        // Render the map on the PixiJS stage
        map.renderMap(app.stage, tileSize);

        const mapWidth = room1.width * tileSize * 2; // Room width in pixels (tiles * tileSize * scale)
        const mapHeight = room1.height * tileSize * 2;

        const playerTexture = spritesheet.textures.playerTexture; // Update with actual player sprite
        const player = new Player(playerTexture, 100, 100); // Start at (100, 100)
        player.addToStage(app.stage);

        app.ticker.add((delta) => {
            if (isNaN(delta) || delta <= 0) {
                delta = 1; // Force default delta if calculation fails
            }
            player.update(delta);
        });
               

    }

    setup();
    addStatusBar(app);
})();