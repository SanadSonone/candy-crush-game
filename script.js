const candies = ["Blue", "Orange", "Green", "Yellow", "Red", "Purple"];
const board = [];
const rows = 9;
const columns = 9;
let score = 0;

let currTile;
let otherTile;

window.onload = function () {
    startGame();
    window.setInterval(function () {
        crushCandy();
        slideCandy();
        generateCandy();
    }, 100);
};

function randomCandy() {
    return candies[Math.floor(Math.random() * candies.length)];
}

function startGame() {
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < columns; c++) {
            const tile = document.createElement("img");
            tile.id = `${r}-${c}`;
            tile.src = `./${randomCandy()}.png`; // Adjusted path

            // Drag functionality
            tile.addEventListener("dragstart", dragStart);
            tile.addEventListener("dragover", dragOver);
            tile.addEventListener("dragenter", dragEnter);
            tile.addEventListener("dragleave", dragLeave);
            tile.addEventListener("drop", dragDrop);
            tile.addEventListener("dragend", dragEnd);

            tile.onerror = function() {
                this.src = "./blank.png"; // Fallback to blank image
                console.error("Image not found:", this.src);
            };

            document.getElementById("board").append(tile);
            row.push(tile);
        }
        board.push(row);
    }
}

function dragStart() {
    currTile = this;
}

function dragOver(e) {
    e.preventDefault();
}

function dragEnter(e) {
    e.preventDefault();
}

function dragLeave() {
    // Optional: Add styles to indicate leaving
}

function dragDrop() {
    otherTile = this;
}

function dragEnd() {
    if (currTile.src.includes("blank") || otherTile.src.includes("blank")) {
        return;
    }

    let currCoords = currTile.id.split("-");
    let r = parseInt(currCoords[0]);
    let c = parseInt(currCoords[1]);

    let otherCoords = otherTile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let isAdjacent = (Math.abs(r - r2) === 1 && c === c2) || (Math.abs(c - c2) === 1 && r === r2);

    if (isAdjacent) {
        let currImg = currTile.src;
        let otherImg = otherTile.src;
        currTile.src = otherImg;
        otherTile.src = currImg;

        let validMove = checkValid();
        if (!validMove) {
            currTile.src = otherImg;
            otherTile.src = currImg;
        }
    }
}

function crushCandy() {
    crushThree();
    document.getElementById("score").innerText = score;
}

function crushThree() {
    // Check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./blank.png";
                candy2.src = "./blank.png";
                candy3.src = "./blank.png";
                score += 30;
            }
        }
    }

    // Check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                candy1.src = "./blank.png";
                candy2.src = "./blank.png";
                candy3.src = "./blank.png";
                score += 30;
            }
        }
    }
}

function checkValid() {
    // Check rows
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 2; c++) {
            let candy1 = board[r][c];
            let candy2 = board[r][c + 1];
            let candy3 = board[r][c + 2];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    // Check columns
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 2; r++) {
            let candy1 = board[r][c];
            let candy2 = board[r + 1][c];
            let candy3 = board[r + 2][c];
            if (candy1.src === candy2.src && candy2.src === candy3.src && !candy1.src.includes("blank")) {
                return true;
            }
        }
    }

    return false;
}

function slideCandy() {
    for (let c = 0; c < columns; c++) {
        let ind = rows - 1;
        for (let r = rows - 1; r >= 0; r--) {
            if (!board[r][c].src.includes("blank")) {
                board[ind][c].src = board[r][c].src;
                ind -= 1;
            }
        }
        for (let r = ind; r >= 0; r--) {
            board[r][c].src = "./blank.png";
        }
    }
}

function generateCandy() {
    for (let c = 0; c < columns; c++) {
        if (board[0][c].src.includes("blank")) {
            board[0][c].src = `./${randomCandy()}.png`;
        }
    }
}
