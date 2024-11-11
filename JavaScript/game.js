import { Application, Assets, Texture, Rectangle, Container, AnimatedSprite, Spritesheet } from 'pixi.js';
import Room from './room.js';
import Map from './map.js';

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
            }

    
        },
        meta: {
            image: dungeonTilesetPath, // Update this path with the actual path to your tileset image
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
            spritesheet.textures.wallTileTopLeft
        ];

        // Create rooms with the defined tile textures
        const room1 = new Room(10, 6);
        const room2 = new Room(20, 14);

        // Create a map and add rooms at specific positions
        const map = new Map(20, 20, tileTextures);
        map.addRoom(room1, 1, 3);  // Place room1 at position (3, 3)
        map.addRoom(room2, 12*4, 3); // Place room2 at position (15, 10)

        // Render the map on the PixiJS stage
        map.renderMap(app.stage, tileSize);

    }

    setup();
})();