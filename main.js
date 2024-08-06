document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const boardSize = 4;
    let tiles = Array(boardSize * boardSize).fill(null);

    function initializeBoard() {
        gameBoard.innerHTML = '';
        tiles.forEach((tile, index) => {
            const tileElement = document.createElement('div');
            tileElement.classList.add('tile');
            tileElement.setAttribute('data-index', index);
            if (tile !== null) {
                tileElement.textContent = tile;
                tileElement.classList.add(`tile-${tile}`);
            }
            gameBoard.appendChild(tileElement);
        });
    }

    function generateTile() {
        const emptyTiles = tiles.map((tile, index) => tile === null ? index : null).filter(index => index !== null);
        if (emptyTiles.length > 0) {
            const randomIndex = emptyTiles[Math.floor(Math.random() * emptyTiles.length)];
            tiles[randomIndex] = Math.random() < 0.9 ? 2 : 4;
        }
        initializeBoard();
    }

    function handleKeyDown(event) {
        let moved = false;
        switch (event.key) {
            case 'ArrowUp':
                moved = moveUp();
                break;
            case 'ArrowDown':
                moved = moveDown();
                break;
            case 'ArrowLeft':
                moved = moveLeft();
                break;
            case 'ArrowRight':
                moved = moveRight();
                break;
            default:
                return;
        }
        if (moved) {
            generateTile();
        }
    }

    function moveUp() {
        let moved = false;
        for (let col = 0; col < boardSize; col++) {
            let merged = Array(boardSize).fill(false);
            for (let row = 1; row < boardSize; row++) {
                let index = row * boardSize + col;
                if (tiles[index] !== null) {
                    let targetRow = row;
                    while (targetRow > 0 && tiles[(targetRow - 1) * boardSize + col] === null) {
                        targetRow--;
                    }
                    if (targetRow > 0 && tiles[(targetRow - 1) * boardSize + col] === tiles[index] && !merged[targetRow - 1]) {
                        tiles[(targetRow - 1) * boardSize + col] *= 2;
                        tiles[index] = null;
                        merged[targetRow - 1] = true;
                        moved = true;
                    } else if (targetRow !== row) {
                        tiles[targetRow * boardSize + col] = tiles[index];
                        tiles[index] = null;
                        moved = true;
                    }
                }
            }
        }
        initializeBoard();
        return moved;
    }

    function moveDown() {
        let moved = false;
        for (let col = 0; col < boardSize; col++) {
            let merged = Array(boardSize).fill(false);
            for (let row = boardSize - 2; row >= 0; row--) {
                let index = row * boardSize + col;
                if (tiles[index] !== null) {
                    let targetRow = row;
                    while (targetRow < boardSize - 1 && tiles[(targetRow + 1) * boardSize + col] === null) {
                        targetRow++;
                    }
                    if (targetRow < boardSize - 1 && tiles[(targetRow + 1) * boardSize + col] === tiles[index] && !merged[targetRow + 1]) {
                        tiles[(targetRow + 1) * boardSize + col] *= 2;
                        tiles[index] = null;
                        merged[targetRow + 1] = true;
                        moved = true;
                    } else if (targetRow !== row) {
                        tiles[targetRow * boardSize + col] = tiles[index];
                        tiles[index] = null;
                        moved = true;
                    }
                }
            }
        }
        initializeBoard();
        return moved;
    }

    function moveLeft() {
        let moved = false;
        for (let row = 0; row < boardSize; row++) {
            let merged = Array(boardSize).fill(false);
            for (let col = 1; col < boardSize; col++) {
                let index = row * boardSize + col;
                if (tiles[index] !== null) {
                    let targetCol = col;
                    while (targetCol > 0 && tiles[row * boardSize + (targetCol - 1)] === null) {
                        targetCol--;
                    }
                    if (targetCol > 0 && tiles[row * boardSize + (targetCol - 1)] === tiles[index] && !merged[targetCol - 1]) {
                        tiles[row * boardSize + (targetCol - 1)] *= 2;
                        tiles[index] = null;
                        merged[targetCol - 1] = true;
                        moved = true;
                    } else if (targetCol !== col) {
                        tiles[row * boardSize + targetCol] = tiles[index];
                        tiles[index] = null;
                        moved = true;
                    }
                }
            }
        }
        initializeBoard();
        return moved;
    }

    function moveRight() {
        let moved = false;
        for (let row = 0; row < boardSize; row++) {
            let merged = Array(boardSize).fill(false);
            for (let col = boardSize - 2; col >= 0; col--) {
                let index = row * boardSize + col;
                if (tiles[index] !== null) {
                    let targetCol = col;
                    while (targetCol < boardSize - 1 && tiles[row * boardSize + (targetCol + 1)] === null) {
                        targetCol++;
                    }
                    if (targetCol < boardSize - 1 && tiles[row * boardSize + (targetCol + 1)] === tiles[index] && !merged[targetCol + 1]) {
                        tiles[row * boardSize + (targetCol + 1)] *= 2;
                        tiles[index] = null;
                        merged[targetCol + 1] = true;
                        moved = true;
                    } else if (targetCol !== col) {
                        tiles[row * boardSize + targetCol] = tiles[index];
                        tiles[index] = null;
                        moved = true;
                    }
                }
            }
        }
        initializeBoard();
        return moved;
    }

    document.addEventListener('keydown', handleKeyDown);

    // Start the game with two tiles
    generateTile();
    generateTile();
});
