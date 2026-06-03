const playingBoard = () => {
  gameBoard = [];
  row = 3;
  column = 3;

  for (let i = 0; i < row; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < column; j++) {
      gameBoard[i].push(" ");
    }
  }

  const getBoard = () => gameBoard;

  const addSign = (row, column, sign) => {
    gameBoard[row][column] = sign;
  };

  return { addSign, getBoard };
};

function gameController(player1 = "Player One", player2 = "Player two") {
  const gameBoard = playingBoard();
  let count = true;

  const players = [
    {
      name: player1,
      sign: "X",
    },
    {
      name: player2,
      sign: "O",
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    if (count === false) return;

    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => {
    if (count === false) return;
    return activePlayer;
  };
  const showNewRound = () => {
    if (count === false) return;

    console.log(gameBoard.getBoard());
    console.log(
      `${getActivePlayer().name}'s turn.`,
      `Sign:${getActivePlayer().sign}`,
    );
  };

  const playRound = (row, column) => {
    board = gameBoard.getBoard();
    const invalidTurns = (function () {
      //condition for Invalid turn
      if (row > 2 || column > 2) {
        activePlayer = getActivePlayer().sign === "X" ? players[0] : players[1];
        console.log("Invalid Turn - Row and column out of bound");
        console.log(`${getActivePlayer().name}'s turn.`);
        return false;
      }

      //condition for already marked block
      if (board[row][column] === "X" || board[row][column] === "O") {
        activePlayer = getActivePlayer().sign === "X" ? players[0] : players[1];
        console.log("Invalid Turn- block already marked");
        console.log(`${getActivePlayer().name}'s turn.`);
        return false;
      }
      return true;
    })();
    if (invalidTurns === false) return;

    //adding sign to desired place
    if (board[row][column] != "X" || board[row][column] != "O") {
      gameBoard.addSign(row, column, getActivePlayer().sign);
    }

    isBoardFull = () => {
      if (
        board[0][0] != " " &&
        board[0][1] != " " &&
        board[0][2] != " " &&
        board[1][0] != " " &&
        board[1][1] != " " &&
        board[1][2] != " " &&
        board[2][0] != " " &&
        board[2][1] != " " &&
        board[2][2] != " " &&
        count != false
      ) {
        count = false;
        console.log(gameBoard.getBoard());
        console.log("Grid Full");
      }
    };

    const winner = () => {
      const newBoard = gameBoard.getBoard();

      for (let i = 0; i < 3; i++) {
        if (
          (newBoard[i][0] === "O" &&
            newBoard[i][1] === "O" &&
            newBoard[i][2] === "O") ||
          (newBoard[0][0] === "O" &&
            newBoard[1][1] === "O" &&
            newBoard[2][2] === "O") ||
          (newBoard[0][2] === "O" &&
            newBoard[1][1] === "O" &&
            newBoard[2][0] === "O") ||
          (newBoard[0][i] === "O" &&
            newBoard[1][i] === "O" &&
            newBoard[2][i] === "O")
        ) {
          console.log(gameBoard.getBoard());
          console.log("Player 2 won");
          count = false;

          return;
        }
      }
      for (let i = 0; i < 3; i++) {
        if (
          (newBoard[i][0] === "X" &&
            newBoard[i][1] === "X" &&
            newBoard[i][2] === "X") ||
          (newBoard[0][0] === "X" &&
            newBoard[1][1] === "X" &&
            newBoard[2][2] === "X") ||
          (newBoard[0][2] === "X" &&
            newBoard[1][1] === "X" &&
            newBoard[2][0] === "X") ||
          (newBoard[0][i] === "X" &&
            newBoard[1][i] === "X" &&
            newBoard[2][i] === "X")
        ) {
          console.log(gameBoard.getBoard());
          console.log("Player 1 won");

          count = false;

          return;
        }
      }
    };

    winner();
    isBoardFull();
    switchPlayerTurn();
    showNewRound();
    return;
  };
  //This is to print starting board
  showNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = gameController();
const displaySign = game.playRound;

const displayBoard = document.querySelector(".playing_board");

// const board = playingBoard.gameBoard;
for (let i = 0; i < 3; i++) {
  for (let j = 0; j < 3; j++) {
    const block = document.createElement("div");
    block.classList.add("blocks_for_board");
    displayBoard.appendChild(block);
    block.addEventListener("click", () => {
      if (block.textContent === "X" || block.textContent === "O") {
        alert("Invalid input");
        return;
      }
      block.textContent = game.getActivePlayer().sign;
      displaySign(i, j);
    });
  }
}

function showGame() {}
