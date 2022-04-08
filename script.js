// Complete:
// - a player one
//     - name + turnOrder = 1
// - a player two (or computer)
//     - name + turnOrder = 2
// - a board object
// - a way to display the board object

// Need:
// - a way to make changes to the board object (i.e., make a legal move)
// - a way to check for win conditions
//     - might need a winConditions object to refer to

const boardContainer = document.querySelector('.board');

const Game = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  const playerList = [];
  const playerOneSymbol = 'X';
  const playerTwoSymbol = 'O';
  let turn = 0;

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

  const updateBoard = (e) => {
    if (playerList.length === 2) {
      let squares = document.querySelectorAll('.square');
      if (!squares[Array.from(squares).indexOf(e.target)].textContent) {
        squares[Array.from(squares).indexOf(e.target)].textContent = playerList[turn].symbol;
        board[Array.from(squares).indexOf(e.target)] = playerList[turn].symbol;
        console.log(squares);
        turn++;
        if (turn > 1) {
          turn = 0;
        }
      }
    }
  }

  const populateBoard = (() => {
    board.forEach(square => {
      let newSquare = document.createElement('div');
      newSquare.classList.add('square');
      boardContainer.appendChild(newSquare);
    });
    // console.log(boardContainer);
    let squares = Array.from(document.querySelectorAll('.square'));
    squares.forEach(child => {
      child.addEventListener('click', updateBoard);
    });
  })();

  const endGame = () => {
    let squares = Array.from(document.querySelectorAll('.square'));
    squares.forEach(child => {
      child.removeEventListener('click', updateBoard);
    })
  }

  return {
    setPlayer,
    getPlayers,
    getBoard,
    endGame
  };

})();

