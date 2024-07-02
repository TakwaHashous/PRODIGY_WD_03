const cells = document.querySelectorAll('.cell');
const gameTitle = document.getElementById('game-title');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'x'; 
let gameOver = false;
let gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ']; 

function handleCellClick(event) {
  const cell = event.target;
  const cellIndex = parseInt(cell.dataset.cellIndex);

  
  if (gameOver || gameBoard[cellIndex] !== ' ') {
    return;
  }

  
  gameBoard[cellIndex] = currentPlayer;
  cell.textContent = currentPlayer
  if (checkForWin(currentPlayer)) {
    gameOver = true;
    gameTitle.textContent = `Player ${currentPlayer.toUpperCase()} Wins!`;
  } else if (checkDraw()) {
    gameOver = true;
    gameTitle.textContent = "It's a Draw!";
  } else {
    currentPlayer = currentPlayer === 'x' ? 'o' : 'x';
    gameTitle.textContent = `Player ${currentPlayer.toUpperCase()}'s Turn`;
  }
}

function checkForWin(player) {
  const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < winningConditions.length; i++) {
    const condition = winningConditions[i];
    if (gameBoard[condition[0]] === player &&
        gameBoard[condition[1]] === player &&
        gameBoard[condition[2]] === player) {
      return true;
    }
  }
  return false;
}

function checkDraw() {
  
  return gameBoard.every(cell => cell !== ' ');
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);

function resetGame() {
  currentPlayer = 'x';
  gameOver = false;
  gameBoard = [' ', ' ', ' ', ' ', ' ', ' ', ' ', ' ', ' '];
  cells.forEach(cell => cell.textContent = '');
  gameTitle.textContent = 'Tic-Tac-Toe';
}