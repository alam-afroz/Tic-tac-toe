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

function gameController(player1, sign1, player2, sign2) {
  const gameBoard = playingBoard();

  let boardFull = false;
  isBoardFull = () => boardFull;

  const players = [
    {
      name: player1,
      sign: sign1,
      winStatus: false,
    },
    {
      name: player2,
      sign: sign2,
      winStatus: false,
    },
  ];

  let activePlayer = players[0];

  const switchPlayerTurn = () => {
    if (getActivePlayer().winStatus === true) return;

    if (isBoardFull === true) {
      return;
    }

    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const getActivePlayer = () => {
    if (activePlayer.winStatus === true) {
      return activePlayer;
    }

    return activePlayer;
  };
  const showNewRound = () => {
    if (boardFull === true) {
      return;
    }
    if (activePlayer.winStatus === true) {
      return;
    }
    console.log(gameBoard.getBoard());
    console.log(
      `${getActivePlayer().name}'s turn.`,
      `Sign:${getActivePlayer().sign}`,
    );
  };

  const playRound = (row, column) => {
    board = gameBoard.getBoard();
    // This code is no longer needed invalid turns were handled in using dom
    // const invalidTurns = (function () {
    //   //condition for Invalid turn
    //   if (row > 2 || column > 2) {
    //     activePlayer = getActivePlayer().sign === "X" ? players[0] : players[1];
    //     console.log("Invalid Turn - Row and column out of bound");
    //     console.log(`${getActivePlayer().name}'s turn.`);
    //     return false;
    //   }

    //   //condition for already marked block
    //   if (board[row][column] === "X" || board[row][column] === "O") {
    //     activePlayer = getActivePlayer().sign === "X" ? players[0] : players[1];
    //     console.log("Invalid Turn- block already marked");
    //     console.log(`${getActivePlayer().name}'s turn.`);
    //     return false;
    //   }
    //   return true;
    // })();
    // if (invalidTurns === false) return;

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
        boardFull === false
      ) {
        boardFull = true;
        console.log(gameBoard.getBoard());
        console.log("Grid Full");
        return;
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
          getActivePlayer().winStatus = true;

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

          activePlayer = {
            name: player1,
            sign: "X",
            winStatus: true,
          };

          return;
        }
      }
    };

    winner();
    isBoardFull();
    switchPlayerTurn();
    showNewRound();
  };
  //This is to log board
  showNewRound();

  return {
    playRound,
    getActivePlayer,
    isBoardFull,
  };
}

function restartGame(player1, sign1, player2, sign2) {
  const restart = document.querySelector(".restart");

  restart.addEventListener("click", () => {
    console.clear();
    document
      .querySelectorAll(".blocks_for_board")
      .forEach((block) => block.remove());
    showGame(player1, sign1, player2, sign2);
  });
}

function showGame(player1, sign1, player2, sign2) {
  const game = gameController(player1, sign1, player2, sign2);

  const displaySign = game.playRound;

  let count = true;

  const displayBoard = document.querySelector(".playing_board");

  const gameStatus = document.querySelector(".game_status");

  (function startingGameStatus() {
    gameStatus.style.fontWeight = "normal";
    gameStatus.style.color = "white";
    gameStatus.textContent = `${game.getActivePlayer().name}'s Turn , Sign : ${game.getActivePlayer().sign}`;
  })();

  function updateGameStatus() {
    gameStatus.style.color = "white";
    gameStatus.textContent = `${game.getActivePlayer().name}'s Turn , Sign : ${game.getActivePlayer().sign}`;
  }

  function markingDisplayBoard(block, i, j) {
    if (game.getActivePlayer().winStatus === true) {
      count = false;

      return;
    }
    if (block.textContent === "X" || block.textContent === "O") {
      gameStatus.style.color = "red";
      gameStatus.textContent = "box already filled";
      count = false;
      return;
    }
    block.textContent = game.getActivePlayer().sign;

    displaySign(i, j);
    updateGameStatus();
  }

  document.querySelector(".player1_info").textContent = `${player1} : ${sign1}`;

  document.querySelector(".player2_info").textContent = `${player2} : ${sign2}`;

  function showWinner() {
    if (game.getActivePlayer().winStatus === true) {
      gameStatus.style.color = "green";
      gameStatus.style.fontWeight = "bold";
      gameStatus.textContent = `${game.getActivePlayer().name} has won , Sign : ${game.getActivePlayer().sign}`;
    }
    return;
  }
  const container = document.querySelector(".container");

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const block = document.createElement("div");
      block.classList.add("blocks_for_board");

      displayBoard.appendChild(block);

      block.addEventListener("click", () => {
        markingDisplayBoard(block, i, j);

        showWinner();

        if (game.isBoardFull() === true) {
          gameStatus.style.color = "grey";
          gameStatus.textContent = "Board full - Game over,No one wins";
        }
      });
    }
  }

  restartGame(player1, sign1, player2, sign2);
}

const takeUserNames = function () {
  const dialogBox = document.querySelector("dialog");
  dialogBox.showModal();

  const form = document.getElementById("user_form");
  const inputPlayerOne = document.getElementById("player_one");

  const inputPlayerTwo = document.getElementById("player_two");
  const disableRadios = (function (e) {
    const radioForPlayerOneSignX = document.querySelector("#player_one_sign_X");
    const radioForPlayerTwoSignX = document.querySelector("#player_two_sign_X");
    const radioForPlayerOneSignO = document.querySelector("#player_one_sign_O");
    const radioForPlayerTwoSignO = document.querySelector("#player_two_sign_O");
    radioForPlayerOneSignX.addEventListener("change", (e) => {
      radioForPlayerTwoSignO.disabled = true;

      radioForPlayerOneSignO.checked = false;
      radioForPlayerTwoSignX.disabled = true;
      radioForPlayerTwoSignO.checked = true;
    });
    radioForPlayerTwoSignX.addEventListener("change", (e) => {
      radioForPlayerOneSignO.disabled = false;
      radioForPlayerOneSignX.disabled = true;
      radioForPlayerOneSignO.checked = true;
      radioForPlayerTwoSignO.checked = false;
    });
    radioForPlayerOneSignO.addEventListener("change", (e) => {
      radioForPlayerTwoSignX.disabled = false;
      radioForPlayerOneSignX.checked = false;
      radioForPlayerTwoSignX.checked = true;
      radioForPlayerTwoSignO.disabled = true;
    });
    radioForPlayerTwoSignO.addEventListener("change", (e) => {
      radioForPlayerOneSignX.disabled = false;

      radioForPlayerOneSignX.checked = true;
      radioForPlayerOneSignO.disabled = true;
      radioForPlayerTwoSignX.checked = false;
    });
  })();

  const playWithoutFilling = document.getElementById("play_without_filling");

  playWithoutFilling.addEventListener("click", () => {
    document.getElementById("player_one").required = false;

    document.getElementById("player_one_sign_X").required = false;

    document.getElementById("player_one_sign_O").required = false;

    document.getElementById("player_two").required = false;

    document.getElementById("player_two_sign_X").required = false;

    document.getElementById("player_two_sign_O").required = false;

    showGame("Player one", "X", "Player Two", "O");
    form.reset();
    dialogBox.close();
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const userData = new FormData(event.target);
    const inputSignPlayerOne = userData.get("player_one_sign");
    const inputSignPlayerTwo = userData.get("player_two_sign");

    let signPlayerOne = " ";
    let signPlayerTwo = " ";

    signPlayerOne = inputSignPlayerOne === "X" ? "X" : "O";
    signPlayerTwo = inputSignPlayerTwo === "X" ? "X" : "O";

    playerOneName = document.getElementById("player_one").value;
    playerTwoName = document.getElementById("player_two").value;

    showGame(playerOneName, signPlayerOne, playerTwoName, signPlayerTwo);

    dialogBox.close();
  });
};

restartGame();

const resetGame = (function () {
  const reset = document.querySelector(".reset");
  reset.addEventListener("click", () => {
    takeUserNames();
    console.clear();
    document
      .querySelectorAll(".blocks_for_board")
      .forEach((block) => block.remove());
  });
})();
takeUserNames();
