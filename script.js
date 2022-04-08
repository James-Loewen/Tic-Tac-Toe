// Need:
// - a player one
//     - name + turnOrder = 1
// - a player two (or computer)
//     - name + turnOrder = 2
// - a board object
// - a way to display the board object
// - a way to make changes to the board object (i.e., make a legal move)
// - a way to check for win conditions
//     - might need a winConditions object to refer to

const boardContainer = document.querySelector('.board');

const Game = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  const playerList = [];
  const playerOneSymbol = 'X';
  const playerTwoSymbol = 'Y';
  const turn = 0;

  const Player = (name, order, symbol) => {
    return { name, order, symbol };
  }

  const setPlayer = name => {
    if (playerList.length < 2) {
      order = playerList.length + 1;
      if (order === 1) {
        playerList.push(Player(name, order, playerOneSymbol));
      } else {
        playerList.push(Player(name, order, playerTwoSymbol));
      }
    }
  }

  const getPlayers = () => {
    return playerList;
  }

  const getBoard = () => board;

  const updateBoard = (turn, index) => {
    if (playerList === 2) {
      board[index] = playerList[turn].symbol;
    }
  }

  const populateBoard = (() => {
    board.forEach(square => {
      let newSquare = document.createElement('div');
      newSquare.classList.add('square');
      boardContainer.appendChild(newSquare);
    });
  })();

  return {
    // makeMove,
    // turn,
    setPlayer,
    getPlayers,
    getBoard,
    // populateBoard
  };
})();

