import { Container, Sprite } from 'pixi.js';

class Map {
    constructor(mapWidth, mapHeight, tileTextures) {
        this.mapWidth = mapWidth;
        this.mapHeight = mapHeight;
        this.rooms = []; // Array to hold Room instances
        this.tileTextures = tileTextures;

        if (!Array.isArray(tileTextures) || tileTextures.length < 9) {
            console.error("Error: tileTextures array must have at least 9 elements.");
            throw new Error("Invalid tileTextures array");
        }
    }

    addRoom(room, x, y) {
        room.position = { x, y }; // Store room position
        this.rooms.push(room);
    }

    renderMap(stage, tileSize = 128) {
        for (const room of this.rooms) {
            const roomMatrix = room.generateRoomMatrix();
            const roomContainer = new Container();

            for (let row = 0; row < roomMatrix.length; row++) {
                for (let col = 0; col < roomMatrix[row].length; col++) {
                    const tileIndex = roomMatrix[row][col];
                    const tileTexture = this.tileTextures[tileIndex];
                    const tileSprite = new Sprite(tileTexture);
                    tileSprite.x = col * tileSize;
                    tileSprite.y = row * tileSize;
                    roomContainer.addChild(tileSprite);
                }
            }

            roomContainer.x = room.position.x * tileSize;
            roomContainer.y = room.position.y * tileSize;
            roomContainer.scale.set(1);
            stage.addChild(roomContainer);
        }
    }

    // New Method: Check if a tile is walkable (floor tile)
    isWalkableTile(x, y, tileSize = 16) {
        for (const room of this.rooms) {
            const localX = Math.floor((x - room.position.x * tileSize) / tileSize);
            const localY = Math.floor((y - room.position.y * tileSize) / tileSize);

            if (
                localX >= 0 &&
                localX < room.width &&
                localY >= 0 &&
                localY < room.height
            ) {
                const tileIndex = room.matrix[localY][localX];
                return tileIndex === 0; // Only floor tiles (value 0) are walkable
            }
        }
        return false; // If not in any room, it's not walkable
    }
}

export default Map;
