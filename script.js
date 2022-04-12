// Complete:
// - a player one
//     - name + turnOrder = 1
// - a player two (or computer)
//     - name + turnOrder = 2
// - a board object
// - a way to display the board object
// - a way to make changes to the board object (i.e., make a legal move)
// - a way to check for win conditions
//     - might need a winConditions object to refer to

// Pregame fun:

const colorList = ['rgb(0, 155, 72)', 'rgb(255, 255, 255)', 'rgb(183, 18, 52)', 'rgb(255, 213, 0)', 'rgb(0, 70, 173)', 'rgb(255, 88, 0)']
const randomColor = (e) => {
  if (!e.target.style.backgroundColor) {
    return colorList[Math.floor(Math.random() * colorList.length)];
  } else {
    let currBgColor = e.target.style.backgroundColor;
    let tempColorList = colorList.filter(color => color !== currBgColor);
    return tempColorList[Math.floor(Math.random() * tempColorList.length)];
  }
}
const pregameSquares = document.querySelectorAll('.pregame');
pregameSquares.forEach(btn => {
  btn.addEventListener('mouseenter', (e) => {
    e.target.style.backgroundColor = randomColor(e);
  })
})


const boardContainer = document.querySelector('.board');
const playerOneInput = document.querySelector('#player-one');
const playerTwoInput = document.querySelector('#player-two');
const startBtn = document.querySelector('#start-btn');
const restartBtn = document.querySelector('#restart-btn');

const Game = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];
  let playerList = [];
  let playerOneSymbol = 'x';
  let playerTwoSymbol = 'o';
  let gameOngoing = false;
  let turn = 0;
  let winner;

  // const Player = (name, order, symbol) => {
  //   return { name, order, symbol };
  // }

  class Player {
    constructor(name, order, symbol) {
      this.name = name;
      this.order = order;
      this.symbol = symbol;
    }
  }

  const setPlayer = name => {
    playerList.push(new Player(playerOneInput.value, 1, playerOneSymbol));
    playerList.push(new Player(playerTwoInput.value, 2, playerTwoSymbol));
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
        winner = playerList[turn].name;
        endGame();
      } else if (checkForTie()) {
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

  const checkForTie = () => {
    let row1 = board.slice(0, 3).includes(playerList[0].symbol) && board.slice(0, 3).includes(playerList[1].symbol);
    let row2 = board.slice(3, 6).includes(playerList[0].symbol) && board.slice(0, 3).includes(playerList[1].symbol);
    let row3 = board.slice(6).includes(playerList[0].symbol) && board.slice(0, 3).includes(playerList[1].symbol);
    let col1 = [board[0], board[3], board[6]].includes(playerList[0].symbol) && board.slice(0, 3).includes(playerList[1].symbol);
    let col2 = [board[1], board[4], board[7]].includes(playerList[0].symbol) && board.slice(0, 3).includes(playerList[1].symbol);
    let col3 = [board[2], board[5], board[8]].includes(playerList[0].symbol) && board.slice(0, 3).includes(playerList[1].symbol);
    let diag1 = [board[0], board[4], board[8]].includes(playerList[0].symbol) && board.slice(0, 3).includes(playerList[1].symbol);
    let diag2 = [board[2], board[4], board[6]].includes(playerList[0].symbol) && board.slice(0, 3).includes(playerList[1].symbol);
    if (row1 && row2 && row3 && col1 && col2 && col3 && diag1 && diag2) {
      return true;
    } else {
      return false;
    }
  }

  const populateBoard = () => {
    if (!gameOngoing) {
      boardContainer.innerHTML = '';
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
    if (winner) {
      console.log(`${winner} won the game!!`);
    } else {
      console.log("It's a dang old tie!");
    }
    gameOngoing = false;
    startBtn.setAttribute('hidden', true);
    restartBtn.removeAttribute('hidden');
    restartBtn.addEventListener('click', resetGame);
  }

  const resetGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    playerList = [];
    playerOneSymbol = 'x';
    playerTwoSymbol = 'o';
    gameOngoing = false;
    turn = 0;
    winner;
    console.log(board);
    populateBoard();
  }

  const deletePlayers = () => {
    playerOne
  }

  return {
    setPlayer,
    getPlayers,
    getBoard,
    endGame,
    populateBoard,
    board,
    checkForWin,
    checkForTie,
    winner,
    resetGame,
    playerList,
    deletePlayers
  };
})();

