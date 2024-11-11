import { Container, Sprite } from 'pixi.js';

class Map {
    constructor(mapWidth, mapHeight, tileTextures) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.rooms = [];                // Array to hold Room instances
        this.tileTextures = tileTextures; // Reference to tile textures array

        // Verify that tileTextures is properly initialized
        if (!Array.isArray(tileTextures) || tileTextures.length < 9) {
            console.error("Error: tileTextures array must have at least 9 elements.");
            throw new Error("Invalid tileTextures array");
        }
    }

    // Add a room to the map at a specific position
    addRoom(room, x, y) {
        room.position = { x, y };  // Store room position
        this.rooms.push(room);
    }

    // Render the map by placing each room in its container on the PixiJS stage
    renderMap(stage, tileSize = 128) {
        for (const room of this.rooms) {
            const roomMatrix = room.generateRoomMatrix(); // Generate room layout matrix
            const roomContainer = new Container(); // Container for each room
            
            // Render each tile based on the matrix in the Room
            for (let row = 0; row < roomMatrix.length; row++) {
                for (let col = 0; col < roomMatrix[row].length; col++) {
                    const tileIndex = roomMatrix[row][col];

                    // Validate tileIndex to avoid accessing undefined elements in tileTextures
                    if (tileIndex < 0 || tileIndex >= this.tileTextures.length) {
                        console.error(`Invalid tileIndex ${tileIndex} at position (${row}, ${col}) in room.`);
                        continue; // Skip this tile if out of bounds
                    }

                    const tileTexture = this.tileTextures[tileIndex];

                    // Additional check to confirm tileTexture is defined
                    if (!tileTexture) {
                        console.error(`tileTexture is undefined for tileIndex ${tileIndex} at position (${row}, ${col})`);
                        continue; // Skip if undefined
                    }

                    // Create sprite with the correct texture
                    const tileSprite = new Sprite(tileTexture);
                    tileSprite.x = col * tileSize;
                    tileSprite.y = row * tileSize;
                    roomContainer.addChild(tileSprite);
                }
            }

            // Position the room within the map based on its position property
            roomContainer.x = room.position.x * tileSize;
            roomContainer.y = room.position.y * tileSize;
            roomContainer.scale.set(3)
            stage.addChild(roomContainer); // Add the room container to the stage
        }
    }
}

export default Map;
