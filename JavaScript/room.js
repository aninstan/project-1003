class Room {
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.matrix = this.generateRoomMatrix();
    }

    // Generate room layout as a matrix without requiring `tileMapping` as a parameter
    generateRoomMatrix() {
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
    

        const matrix = [];
        for (let y = 0; y < this.height; y++) {
            const row = [];
            for (let x = 0; x < this.width; x++) {
                if (y === 0 && x === 0) {
                    row.push(tileMapping["tl"]);  // Top-left corner
                } else if (y === 0 && x === this.width - 1) {
                    row.push(tileMapping["tr"]);  // Top-right corner
                } else if (y === this.height - 1 && x === 0) {
                    row.push(tileMapping["bl"]);  // Bottom-left corner
                } else if (y === this.height - 1 && x === this.width - 1) {
                    row.push(tileMapping["br"]);  // Bottom-right corner
                } else if (y === 0) {
                    row.push(tileMapping["t"]);   // Top wall
                } else if (x === 0) {
                    row.push(tileMapping["l"]);   // Left wall
                } else if (x === this.width - 1) {
                    row.push(tileMapping["r"]);   // Right wall
                } else if (y === this.height - 1) {
                    row.push(tileMapping["b"]);   // Bottom wall
                } else {
                    row.push(tileMapping["f"]);   // Floor
                }
            }
            matrix.push(row);
        }
        return matrix;
    }


    getMatrix() {
        return this.matrix;
    }

}

export default Room;
