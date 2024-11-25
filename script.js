const winningPositions = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7],
];
const playerX = []; //player X moves
const playerO = []; //player O moves

const cellValue = document.getElementById("cell-3").dataset.cellValue; //get cell value
const cells = document.querySelectorAll(".cell");
let currentPlayer = "X";
let gameStatus = null;
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const currentplayerElement = document.getElementById("currentplayer");
const restartbtn = document.querySelectorAll(".reset-button");

const toastbox = document.getElementById("toastbox");
const ai = document.getElementById(" playai");

cells.forEach((cell) => {
  cell.addEventListener("click", () => {
    // Check if cell is already filled
    if (cell.textContent === "") {
      cell.textContent = currentPlayer; // Update cell content
      // Switch player for the next turn
      cell.classList.add(currentPlayer === "X" ? "cell-x" : "cell-o");

      currentPlayer = currentPlayer === "X" ? "O" : "X"; //determine current player

      cell.style.content = "X";
      currentplayerElement.innerHTML = `Current player  ${currentPlayer}`;

      // save player moves
      if (currentPlayer === "X") {
        playerO.push(parseInt(cell.dataset.cellValue));
      } else {
        playerX.push(parseInt(cell.dataset.cellValue));
      }

      // Check for a winning condition
      checkforWin();
    } else {
      showToast("Cell is already filled!");
      cell.removeEventListener("click", this); // Prevent further clicks on the cell
    }
  });
});

const checkforWin = () => {
  const playerXwin = winningPositions.some((position) =>
    position.every((value) => playerX.includes(value))
  );
  const playerOwin = winningPositions.some((position) =>
    position.every((value) => playerO.includes(value))
  );

  if (playerXwin) {
    gameStatus = "X won";
  } else if (playerOwin) {
    gameStatus = "O won";
  } else if (playerX.length >= 5) {
    gameStatus = "Draw";
  }

  if (gameStatus !== null) {
    winningMessageTextElement.innerText = `${gameStatus}`;
    winningMessageElement.classList.add("show");
  }
};

const showToast = (message) => {
  let toast = document.createElement("div");
  toast.classList.add("toast");
  toast.innerText = `${message}`;
  toastbox.appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 2000);
};

const restartGame = () => {
  playerX.length = 0;
  playerO.length = 0;
  currentPlayer = "X";
  gameStatus = null;
  winningMessageElement.classList.remove("show");
  cells.forEach((cell) => {
    cell.textContent = "";
  });
};

restartbtn.forEach((button) => {
  button.addEventListener("click", restartGame);
});
