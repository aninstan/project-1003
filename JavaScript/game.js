import { Application, Assets, Container, Spritesheet } from 'pixi.js';
import Room from './room.js';
import Map from './map.js';
import Player from './player.js';
import Treasure from './treasure.js';

import dungeonTilesetPath from '../assets/terrain/0x72.png';
import { addStatusBar } from './statusbar.js';

(async () =>
    {
    // Create a new application
    const app = new Application();
    

    // Initialize the application
    await app.init({ background: '#241318', resizeTo: document.getElementById('gamecontent'), antialias: false });


    // Append the application canvas to the document body
    document.getElementById('gamecontent').appendChild(app.canvas);

    const imageTexture = await Assets.load(dungeonTilesetPath);

    const atlasData = {
        frames: {
            floorTile: {
                frame: { x: 16*2, y: 16*4, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            floorTile2: {
                frame: { x: 16*1, y: 16*4, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            floorTile3: {
                frame: { x: 16*3, y: 16*4, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            floorTile4: {
                frame: { x: 16*2, y: 16*5, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            wallTileTop: {
                frame: { x: 16*2, y: 16 -4, w: 16, h: 20 },
                sourceSize: { w: 16, h: 20 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 20 }
            },
            wallTileLeft: {
                frame: { x: 16*3, y: 16*10, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            wallTileRight: {
                frame: { x: 16*2, y: 16*10, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            wallTileBottom: {
                frame: { x: 16*2+4, y: 16*11 + 4, w: 16, h: 5 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            }, 
            wallTileBottomRight: {
                frame: { x: 16*0, y: 16*4, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            }, 
            wallTileBottomLeft: {
                frame: { x: 0, y: 16*4, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            }, 
            wallTileTopRight: {
                frame: { x: 16*2, y: 16*10, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            }, 
            wallTileTopLeft: {
                frame: { x: 16*3, y: 16*10, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            p1: {
                frame: { x: 16*9, y: 16*11, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            p2: {
                frame: { x: 16*10, y: 16*11, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            p3: {
                frame: { x: 16*11, y: 16*11, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            p4: {
                frame: { x: 16*12, y: 16*11, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            p5: {
                frame: { x: 16*13, y: 16*11, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            p6: {
                frame: { x: 16*14, y: 16*11, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            p7: {
                frame: { x: 16*15, y: 16*11, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            treasure1: {
                frame: { x: 16*19, y: 16*26, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            treasure2: {
                frame: { x: 16*20, y: 16*26, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            treasure3: {
                frame: { x: 16*21, y: 16*26, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            }
        },
        meta: {
            image: "/assets/terrain/0x72.png", // Update this path with the actual path to your tileset image
            format: 'RGBA8888',
            size: { w: 160, h: 160 },
            scale: 1
        }
    };

    const spritesheet = new Spritesheet(imageTexture, atlasData);

    await spritesheet.parse();

    function setup() {
        const tileSize = 16;

        const tileTextures = [
            spritesheet.textures.wallTileTop,
            spritesheet.textures.wallTileLeft,
            spritesheet.textures.wallTileRight,
            spritesheet.textures.wallTileBottom,
            spritesheet.textures.wallTileBottomRight,
            spritesheet.textures.wallTileBottomLeft,
            spritesheet.textures.wallTileTopRight,
            spritesheet.textures.wallTileTopLeft,
        ];

        const floorTiles = [
            spritesheet.textures.floorTile,
            spritesheet.textures.floorTile2,
            spritesheet.textures.floorTile3,
            spritesheet.textures.floorTile4
        ];

        const playerFrames = [
            spritesheet.textures.p1,
            spritesheet.textures.p2,
            spritesheet.textures.p3,
            spritesheet.textures.p4,
            spritesheet.textures.p5,
            spritesheet.textures.p6
        ];

        const treasureFrames = [
            spritesheet.textures.treasure1,
            spritesheet.textures.treasure2,
            spritesheet.textures.treasure3
        ];

        const room1 = new Room(30, 15);
        const map = new Map(40, 40, tileTextures, floorTiles);
        map.addRoom(room1, 0, 2);

        const gameLayer = new Container();
        const uiLayer = new Container();

        app.stage.addChild(gameLayer);
        app.stage.addChild(uiLayer);

        map.renderMap(gameLayer, tileSize);

        const statusBarMethods = addStatusBar(uiLayer, app);

        // Add player to gameLayer
        const player = new Player(playerFrames, room1.width * tileSize / 2, room1.height * tileSize / 2, map, statusBarMethods);
        gameLayer.addChild(player.container);

        const treasures = [];
        const spawnTreasure = (count) => {
            for (let i = 0; i < count; i++) {
                const { x, y } = getRandomPosition(room1, tileSize, treasures);
                const treasure = new Treasure(treasureFrames, x, y, statusBarMethods.collectItem);
                treasures.push(treasure);
                treasure.addToStage(gameLayer);
            }
        };

        spawnTreasure(5);

        const zoomLevel = 3; // Adjust this value for zoom level

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

            treasures.forEach((treasure) => {
                treasure.checkCollision(player);
            });
        });
    }

    function getRandomPosition(room, tileSize, existingTreasures) {
        let x, y, overlaps;
        do {
            x = Math.floor(Math.random() * (room.width - 1)) * tileSize + tileSize / 2;
            y = Math.floor(Math.random() * (room.height - 1)) * tileSize + tileSize / 2;
            overlaps = existingTreasures.some(
                (treasure) =>
                    Math.abs(treasure.container.x - x) < tileSize &&
                    Math.abs(treasure.container.y - y) < tileSize
            );
        } while (overlaps);
        return { x, y };
    }

    setup();
})();