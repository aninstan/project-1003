import { Application, Assets, Container, Spritesheet } from 'pixi.js';
import Room from './room.js';
import Map from './map.js';
import Player from './player.js';
import Treasure from './treasure.js';
import nextLevel from './nextLevel.js';
import Enemy from './enemy.js';


import dungeonTilesetPath from '../assets/terrain/0x72.png';
import { addStatusBar } from './statusbar.js';
import { gameOver } from './gameover.js';

(async () => {
    // Create a new application
    const app = new Application();

    await app.init({ background: '#241318', resizeTo: document.getElementById('gamecontent'), antialias: false });

    document.getElementById('gamecontent').appendChild(app.view);

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
            },
            e1_1: {
                frame: { x: 16*27, y: 16*7, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            e1_2: {
                frame: { x: 16*28, y: 16*7, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            e1_3: {
                frame: { x: 16*29, y: 16*7, w: 16, h: 16 },
                sourceSize: { w: 16, h: 16 },
                spriteSourceSize: { x: 0, y: 0, w: 16, h: 16 }
            },
            e1_4: {
                frame: { x: 16*30, y: 16*7, w: 16, h: 16 },
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

    const tileSize = 16;
    const tileTextures = [
        spritesheet.textures.wallTileTop,
        spritesheet.textures.wallTileLeft,
        spritesheet.textures.wallTileRight,
        spritesheet.textures.wallTileBottom,
        spritesheet.textures.wallTileBottomRight,
        spritesheet.textures.wallTileBottomLeft,
        spritesheet.textures.wallTileTopRight,
        spritesheet.textures.wallTileTopLeft
    ];
    const floorTiles = [
        spritesheet.textures.floorTile,
        spritesheet.textures.floorTile2,
        spritesheet.textures.floorTile3,
        spritesheet.textures.floorTile4
    ];
    const playerFrames = [
        spritesheet.textures.p1, spritesheet.textures.p2, spritesheet.textures.p3
    ];
    const treasureFrames = [
        spritesheet.textures.treasure1, spritesheet.textures.treasure2, spritesheet.textures.treasure3
    ];
    const enemyFrames = [
        spritesheet.textures.e1_1,
        spritesheet.textures.e1_2,
        spritesheet.textures.e1_3,
        spritesheet.textures.e1_4
    ];

    let treasures = [];
    let enemies = [];

    const gameLayer = new Container();
    const uiLayer = new Container();
    app.stage.addChild(gameLayer);
    app.stage.addChild(uiLayer);

    const statusBarMethods = addStatusBar(uiLayer, app);
    let levelGenerated = false;

    let player;

    function generateLevel() {
        gameLayer.removeChildren();
        const room = new Room(getRandomInt(15,50), getRandomInt(10,30));
        const map = new Map(60, 60, tileTextures, floorTiles);
        map.addRoom(room, 0, 2);
        map.renderMap(gameLayer, tileSize);
        treasures = [];
        enemies = [];
        
        const walkableTiles = room.generateRoomMatrix();
        player = new Player(playerFrames, room.width * tileSize / 2, room.height * tileSize / 2, map, statusBarMethods);
        gameLayer.addChild(player.container);

        const treasureCount = getRandomInt(3, 10);
        spawnTreasure(treasureCount, walkableTiles);

        statusBarMethods.setRemainingItems(treasureCount);
        let enCount = getRandomInt(3, 10);

        levelGenerated = true;

        function spawnEnemy(enCount, walkableTiles) {
            for (let i = 0; i < enCount; i++) {
                const { x, y } = getRandomPosition(walkableTiles);
                const enemy = new Enemy(enemyFrames, x, y, map, statusBarMethods.loseLife, player);
                //enemy.addToStage(gameLayer);
                enemies.push(enemy);
                gameLayer.addChild(enemy.container);
            }
        }

        function spawnTreasure(count, walkableTiles) {
            for (let i = 0; i < count; i++) {
                const { x, y } = getRandomPosition(walkableTiles);
                const treasure = new Treasure(treasureFrames, x, y, statusBarMethods.collectItem);
                treasures.push(treasure);
                treasure.addToStage(gameLayer);
            }
        }

        spawnEnemy(enCount, walkableTiles);
        
    }

    statusBarMethods.setLifeCount(3);
    


    function getRandomPosition(walkableTiles) {
        let x, y, overlaps, validTile;
        do {
            const col = Math.floor(Math.random() * walkableTiles[0].length);
            const row = Math.floor(Math.random() * (walkableTiles.length - 2)) + 2;
            x = col * tileSize + tileSize / 2;
            y = row * tileSize + tileSize / 2;
            validTile = walkableTiles[row] && walkableTiles[row][col] === 0;
            overlaps = treasures.some(
                treasure => Math.abs(treasure.container.x - x) < tileSize && Math.abs(treasure.container.y - y) < tileSize
            );
        } while (!validTile || overlaps);
        return { x, y };
    }

    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min) + min);
    }

    function centerOnPlayer() {
        gameLayer.pivot.set(player.container.x, player.container.y);
        gameLayer.position.set(app.screen.width / 2, app.screen.height / 2);
        gameLayer.scale.set(3);
    }

    let isTransitioning = false;

    app.ticker.add(delta => {
        if (isNaN(delta) || delta <= 0) {
            delta = 1; // Force default delta if calculation fails
        }
        if (statusBarMethods.getRemainingItems() === 0 && !isTransitioning) {
            isTransitioning = true;
            nextLevel(app, () => {
                statusBarMethods.nextLevel();
                generateLevel(); 
                isTransitioning = false;
            });
        }        

        if (statusBarMethods.getLifeCount() === 0) {
            gameOver(app);
            return;
        }

        if (!levelGenerated) return;

        player.update(delta);
        centerOnPlayer();
        treasures.forEach(treasure => treasure.checkCollision(player));
        // check for collision and console.log if collision is detected
        enemies.forEach(enemy => enemy.update(delta));
    });

    generateLevel(); // Start first level
})();
