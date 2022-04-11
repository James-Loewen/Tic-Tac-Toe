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
const playerOneInput = document.querySelector('#player-one');
const playerTwoInput = document.querySelector('#player-two');
const startBtn = document.querySelector('#start-btn');


const Game = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];
  const playerList = [];
  const playerOneSymbol = 'x';
  const playerTwoSymbol = 'o';
  let gameOngoing = false;
  let turn = 0;

  const Player = (name, order, symbol) => {
    return { name, order, symbol };
  }

  const setPlayer = name => {
    playerList.push(Player(playerOneInput.value, 1, playerOneSymbol));
    playerList.push(Player(playerTwoInput.value, 2, playerTwoSymbol));
  }

  const getPlayers = () => {
    return playerList;
  }

  const getBoard = () => board;

  const updateBoard = (e) => {
    let squares = document.querySelectorAll('.square');
    if (!squares[Array.from(squares).indexOf(e.target)].textContent) {
      squares[Array.from(squares).indexOf(e.target)].textContent = playerList[turn].symbol;
      board[Array.from(squares).indexOf(e.target)] = playerList[turn].symbol;
      if (checkForWin()) {
        endGame();
      } else {
        turn++;
        if (turn > 1) {
          turn = 0;
        }
      }
    }
  }

  const checkForWin = () => {
    let row1 = board.slice(0, 3).every((symbol, index) => symbol === playerList[turn].symbol);
    let row2 = board.slice(3, 6).every((symbol, index) => symbol === playerList[turn].symbol);
    let row3 = board.slice(6).every((symbol, index) => symbol === playerList[turn].symbol);
    let col1 = [board[0], board[3], board[6]].every((symbol, index) => symbol === playerList[turn].symbol);
    let col2 = [board[1], board[4], board[7]].every((symbol, index) => symbol === playerList[turn].symbol);
    let col3 = [board[2], board[5], board[8]].every((symbol, index) => symbol === playerList[turn].symbol);
    let diag1 = [board[0], board[4], board[8]].every((symbol, index) => symbol === playerList[turn].symbol);
    let diag2 = [board[2], board[4], board[6]].every((symbol, index) => symbol === playerList[turn].symbol);
    if (row1 || row2 || row3 || col1 || col2 || col3 || diag1 || diag2) {
      return true;
    } else {
      return false;
    }
  }

  const populateBoard = () => {
    if (!gameOngoing) {
      setPlayer();
      board.forEach(square => {
        let newSquare = document.createElement('div');
        newSquare.classList.add('square');
        boardContainer.appendChild(newSquare);
      });
      let squares = Array.from(document.querySelectorAll('.square'));
      squares.forEach(child => {
        child.addEventListener('click', updateBoard);
      });
      gameOngoing = true;
    }
  };

  const endGame = () => {
    let squares = Array.from(document.querySelectorAll('.square'));
    squares.forEach(child => {
      child.removeEventListener('click', updateBoard);
    })
    console.log(`${playerList[turn].name} won the game!!`);
    gameOngoing = false;

  }

  return {
    setPlayer,
    getPlayers,
    getBoard,
    endGame,
    populateBoard,
    board,
    checkForWin
  };

})();

