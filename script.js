const playingBoard = () => {
  gameBoard = [];
  row = 3;
  column = 3;

  for (let i = 0; i < row; i++) {
    gameBoard[i] = [];
    for (let j = 0; j < column; j++) {
      gameBoard[i].push(block());
    }
  }

  const getBoard = () => gameBoard;

  function block() {
    let value = " ";
    return value;
  }

  const addSign = (row, column, sign) => {
    gameBoard[row][column] = sign;
  };

  const showBoard = () => {
    const updatedBoard = gameBoard.filter((element) => element != " ");
    //showBoard is of no use , getBoard will also do the work
    return updatedBoard;
  };
  return { addSign, block, getBoard, showBoard };
};

function gameController(player1 = "Player One", player2 = "Player two") {
  const gameBoard = playingBoard();

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
    if (activePlayer === null) return;

    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => activePlayer;
  const showNewRound = () => {
    if (activePlayer === null) return;
    console.log(gameBoard.showBoard());

    console.log(
      `${getActivePlayer().name}'s turn.`,
      `Sign:${getActivePlayer().sign}`,
    );
  };

  const playRound = (row, column) => {
    board = gameBoard.getBoard();
    //boardFull

    if (row > 2 || column > 2) {
      activePlayer = getActivePlayer().sign === "X" ? players[0] : players[1];
      console.log("Invalid Turn - Row and column out of bound");
      console.log(`${getActivePlayer().name}'s turn.`);
      return;
    }
    if (board[row][column] === "X" || board[row][column] === "O") {
      activePlayer = getActivePlayer().sign === "X" ? players[0] : players[1];
      console.log("Invalid Turn- block already marked");
      console.log(`${getActivePlayer().name}'s turn.`);
      return;
    }
    if (board[row][column] != "X" || board[row][column] != "O") {
      forSign = getActivePlayer().sign;
      gameBoard.addSign(row, column, forSign);
    }
    //grid full
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
        activePlayer != null
      ) {
        activePlayer = null;
        console.log(gameBoard.showBoard());
        console.log("Grid Full");
      }
    };
    //win logic
    const winner = () => {
      const newBoard = gameBoard.showBoard();

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
          (newBoard[0][i] === "O" && // newBoard[0][i],newBoard[1][i],newBoard[2][i]will also work
            newBoard[1][i] === "O" &&
            newBoard[2][i] === "O")
          // ||
          // (newBoard[i][1] === "O" &&
          //   newBoard[i + 1][1] === "O" &&
          //   newBoard[i + 2][1] === "O") ||
          // (newBoard[i][2] === "O" &&
          //   newBoard[i + 1][2] === "O" &&
          //   newBoard[i + 2][2] === "O")
        ) {
          activePlayer = null;
          console.log(gameBoard.showBoard());
          console.log("Player 2 won");
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
          (newBoard[0][i] === "X" && // newBoard[0][i],newBoard[1][i],newBoard[2][i]will also work
            newBoard[1][i] === "X" &&
            newBoard[2][i] === "X")
          //||
          // (newBoard[0][i] === "X" &&
          //   newBoard[1][i] === "X" &&
          //   newBoard[2][i] === "X") ||
          // (newBoard[0][i] === "X" &&
          //   newBoard[1][i] === "X" &&
          //   newBoard[2][i] === "X")
        ) {
          activePlayer = null;
          console.log(gameBoard.showBoard());
          console.log("Player 1 won");
          return;
        }
      }
    };
    //win logic
    winner();
    isBoardFull();
    switchPlayerTurn();
    showNewRound();
  };
  showNewRound();

  return {
    playRound,
    getActivePlayer,
  };
}

const game = gameController();
