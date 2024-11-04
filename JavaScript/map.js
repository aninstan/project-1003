import { Container, Sprite } from 'pixi.js';

const tileMapping = {
    "f": 0,  // Floor
    "t": 1,  // Top wall
    "l": 2,  // Left wall
    "r": 3,  // Right wall
    "b": 4,  // Bottom wall
    "br": 5, // Bottom-right corner
    "bl": 6, // Bottom-left corner
    "tr": 7, // Top-right corner
    "tl": 8  // Top-left corner
};

class Map {
    constructor(mapWidth, mapHeight, tileTextures) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.rooms = [];         // Array to hold Room instances
        this.tileTextures = tileTextures; // Reference to tile textures array
    }
    
    // Add a room to the map at a specific position
    addRoom(room, x, y) {
        room.position = { x, y };  // Store room position
        this.rooms.push(room);
    }

    // Render the map by placing each room in its container on the PixiJS stage
    renderMap(stage, tileSize = 32) {
        for (const room of this.rooms) {
            const roomMatrix = room.generateRoomMatrix(); // Generate matrix without passing tileMapping
            const roomContainer = new Container(); // Container for each room
            
            // Render each tile based on the matrix in the Room
            for (let row = 0; row < roomMatrix.length; row++) {
                for (let col = 0; col < roomMatrix[row].length; col++) {
                    const tileIndex = roomMatrix[row][col];
                    const tileTexture = this.tileTextures[tileIndex];
                    const tileSprite = new Sprite(tileTexture);
                    
                    // Position each tile within the room container
                    tileSprite.x = col * tileSize;
                    tileSprite.y = row * tileSize;
                    roomContainer.addChild(tileSprite);
                }
            }

            // Set the room's position within the map based on its position property
            roomContainer.x = room.position.x * tileSize;
            roomContainer.y = room.position.y * tileSize;
            stage.addChild(roomContainer); // Add the room container to the stage
        }
    }
}

export default Map;
