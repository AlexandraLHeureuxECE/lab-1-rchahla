const cells = document.querySelectorAll(".cell");
const statusText = document.getElementById("status");
const restartBtn = document.getElementById("restart");
const boardElement = document.getElementById("board");

let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function updatePlayableCells() {
  cells.forEach((cell, index) => {
    if (board[index] === "" && gameActive) {
      cell.classList.add("playable");
      cell.dataset.preview = currentPlayer;
    } else {
      cell.classList.remove("playable");
      cell.dataset.preview = "";
    }
  });
}

function handleCellClick(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  checkResult();
  updatePlayableCells();
}

function checkResult() {
  for (let combo of winningCombos) {
    const [a, b, c] = combo;

    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      // Highlight winning cells
      cells[a].classList.add("win");
      cells[b].classList.add("win");
      cells[c].classList.add("win");

      statusText.textContent = `Player ${currentPlayer} wins!`;
      gameActive = false;
      boardElement.classList.add("disabled");
      updatePlayableCells();
      return;
    }
  }

  // Draw check
  if (!board.includes("")) {
    statusText.textContent = "It's a draw!";
    gameActive = false;
    boardElement.classList.add("disabled");
    updatePlayableCells();
    return;
  }

  // Switch player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Player X's turn";

  cells.forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("win"); // 👈 clear highlights
  });
  boardElement.classList.remove("disabled");
  updatePlayableCells();
}

cells.forEach((cell) => cell.addEventListener("click", handleCellClick));
restartBtn.addEventListener("click", restartGame);
updatePlayableCells();
