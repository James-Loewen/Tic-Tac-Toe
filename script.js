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
    e.target.style.backgroundColor = colorList[Math.floor(Math.random() * colorList.length)];
  } else {
    let currBgColor = e.target.style.backgroundColor;
    let tempColorList = colorList.filter(color => color !== currBgColor);
    e.target.style.backgroundColor = tempColorList[Math.floor(Math.random() * tempColorList.length)];
  }
  if (e.target.style.backgroundColor === 'rgb(0, 70, 173)') {
    e.target.style.color = 'rgb(255, 250, 240)';
  } else {
    e.target.style.color = '#444';
  }
}
const pregameSquares = document.querySelectorAll('.pregame');
pregameSquares.forEach(btn => {
  btn.addEventListener('mouseover', randomColor);
})

const boardContainer = document.querySelector('.board');
const playerOneInput = document.querySelector('#player-one');
const playerTwoInput = document.querySelector('#player-two');
const startBtn = document.querySelector('#start-btn');
const restartBtn = document.querySelector('#restart-btn');
const resultsDisplay = document.querySelector('.game-results');

const Player = (name, order, symbol) => {
  return {
    name,
    order,
    symbol
  };
}

const Game = (() => {
  let board = ['', '', '', '', '', '', '', '', ''];
  let playerList = [];
  let playerOneSymbol = 'x';
  let playerTwoSymbol = 'o';
  let gameOngoing = false;
  let turn = 0;

  const setPlayer = name => {
    playerList.push(Player(playerOneInput.value, 1, playerOneSymbol));
    playerList.push(Player(playerTwoInput.value, 2, playerTwoSymbol));
  }

  const updateBoard = (e) => {
    let squares = document.querySelectorAll('.square');
    if (!squares[Array.from(squares).indexOf(e.target)].textContent) {
      squares[Array.from(squares).indexOf(e.target)].textContent = playerList[turn].symbol;
      board[Array.from(squares).indexOf(e.target)] = playerList[turn].symbol;
      if (checkForWin()) {
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
    let indicies;
    if (board.slice(0, 3).every((symbol, index) => symbol === playerList[turn].symbol)) {
      indicies = [0, 1, 2];
    } else if (board.slice(3, 6).every((symbol, index) => symbol === playerList[turn].symbol)) {
      indicies = [3, 4, 5];
    } else if (board.slice(6).every((symbol, index) => symbol === playerList[turn].symbol)) {
      indicies = [6, 7, 8];
    } else if ([board[0], board[3], board[6]].every((symbol, index) => symbol === playerList[turn].symbol)) {
      indicies = [0, 3, 6];
    } else if ([board[1], board[4], board[7]].every((symbol, index) => symbol === playerList[turn].symbol)) {
      indicies = [1, 4, 7];
    } else if ([board[2], board[5], board[8]].every((symbol, index) => symbol === playerList[turn].symbol)) {
      indicies = [2, 5, 8];
    } else if ([board[0], board[4], board[8]].every((symbol, index) => symbol === playerList[turn].symbol)) {
      indicies = [0, 4, 8];
    } else if ([board[2], board[4], board[6]].every((symbol, index) => symbol === playerList[turn].symbol)) {
      indicies = 2, 4, 6;
    } else {
      indicies = false;
    }
    return indicies
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
      setPlayer();
      Array.from(boardContainer.children).forEach(square => {
        square.textContent = '';
        square.classList.add('square');
        square.removeEventListener('mouseover', randomColor);
        square.style = "";
      })
      let squares = Array.from(document.querySelectorAll('.square'));
      squares.forEach(child => {
        child.addEventListener('click', updateBoard);
      });
      gameOngoing = true;
      startBtn.style.visibility = 'hidden';
      playerOneInput.setAttribute('readonly', true);
      playerTwoInput.setAttribute('readonly', true);
    }
  };

  const endGame = () => {
    let squares = Array.from(document.querySelectorAll('.square'));
    squares.forEach(child => {
      child.removeEventListener('click', updateBoard);
    })
    if (checkForWin()) {
      // console.log(playerList[turn].name, checkForWin());
      Array.from(boardContainer.children).forEach((item, index) => {
        if (checkForWin().includes(index)) {
          item.style.backgroundColor = colorList[Math.floor(Math.random() * colorList.length)];
          if (item.style.backgroundColor === 'rgb(0, 70, 173)') {
            item.style.color = 'rgb(255, 250, 240)';
          }
          item.addEventListener('mouseover', randomColor);
          console.log(item);
        }
      });
      resultsDisplay.innerHTML = `The winner is <span id="winner">${playerList[turn].name}</span>!`;
      resultsDisplay.removeAttribute('hidden');
    } else {
      console.log("It's a dang old tie!");
      resultsDisplay.innerHTML = `It's a <span id="winner">tie</span>!`;
      resultsDisplay.removeAttribute('hidden');
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
    resultsDisplay.innerHTML = '';
    resultsDisplay.setAttribute('hidden', true);
    restartBtn.setAttribute('hidden', true);
    populateBoard();
  }

  return {
    setPlayer,
    endGame,
    populateBoard,
    board,
    checkForWin,
    checkForTie,
    resetGame,
    playerList,
  };
})();

