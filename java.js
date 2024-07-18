const board = document.getElementById('board');
const diceResult = document.getElementById('diceResult');
const rollDiceBtn = document.getElementById('rollDiceBtn');

const COLORS = ['red', 'green', 'blue', 'yellow'];
const SQUARES_PER_SIDE = 5;
const SQUARE_SIZE = 20;

let currentPlayer = 0;
let playerPositions = [0, 0, 0, 0];

                                        //     Initialize the board 
function initBoard() {
    const totalSquares = SQUARES_PER_SIDE * SQUARES_PER_SIDE;
    for (let i = 0; i < totalSquares; i++) {
        const square = document.createElement('div');
        square.className = 'square';
        square.style.width = `${SQUARE_SIZE}%`;
        square.style.height = `${SQUARE_SIZE}%`;

        square.style.backgroundColor = (i < 6 || i > 28) ? '#ffebcd' : '#8b4513';
        if (i >= 6 && i <= 28) square.style.color = 'white';

        board.appendChild(square);
    }
}

                                              // Function to roll the dice
function rollDice() {
    const diceNumber = Math.floor(Math.random() * 6) + 1;
    diceResult.textContent = `Player ${currentPlayer + 1} rolled a ${diceNumber}`;
    movePiece(currentPlayer, diceNumber);
}

                                               // Function to move a player's piece
function movePiece(player, steps) {
    const currentPosition = playerPositions[player];
    const newPosition = currentPosition + steps;

    if (newPosition >= 30) {
        alert(`Player ${player + 1} has won!`);
        return;
    }

                                 // Remove existing piece from the board if present
    const oldSquare = board.children[currentPosition];
    if (oldSquare.firstChild) oldSquare.removeChild(oldSquare.firstChild);

    // Create and place the new piece
    const playerPiece = document.createElement('div');
    playerPiece.className = 'piece';
    playerPiece.style.backgroundColor = COLORS[player];

    const newSquare = board.children[newPosition];
    newSquare.appendChild(playerPiece);

    playerPositions[player] = newPosition;
    currentPlayer = (currentPlayer + 1) % 4;
}

                                // Initialize the board when the page loads
window.onload = initBoard;
rollDiceBtn.addEventListener('click', rollDice);
