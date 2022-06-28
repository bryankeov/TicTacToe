  //Gameboard object
const gameBoard = (() => {
  let board = []; //game board array
  for(let i = 0; i < 9; i++) {
    board.push('');
  }
  const boardContainer = document.getElementsByClassName('container')[0];
  for(let j = 0; j < board.length; j++) {
    const square = document.createElement('div');
    square.className = 'square';
    square.dataset.index = j;
    boardContainer.appendChild(square);
  };
  return {board};
})();

//Players object
const players = (() => {
  const modal = document.getElementById('modal');
  const closeButton = document.getElementsByClassName('close')[0];
  const submitButton = document.getElementById('player-submit');

  function player(name, symbol, turn) {
    return {name, symbol, turn};
  }
  
  const player1Name = document.getElementsByClassName('name')[0].value;
  const player2Name = document.getElementsByClassName('name')[1].value;

  submitButton.onclick = function() {
    modal.style.display = 'none';
    let player1Display = document.getElementsByClassName('player')[0];
    let player2Display = document.getElementsByClassName('player')[1];
    player1Display.innerHTML = player1Name;
    player2Display.innerHTML = player2Name;
  }

  // When the user clicks on <span> (x), close the modal
  closeButton.onclick = function() {
    modal.style.display = "none";
  }

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
  return {
    player,
    player1Name,
    player2Name
  }
})();

//Game flow object
const gameFlow = (() => {
  const winSquares = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
  ];

  let p1Moves = [];
  let p2Moves = [];
  let playedTurns = 0;
  let previousWinner = null;
  let display = document.getElementsByClassName('result-display')[0].innerText;
  let squares = document.getElementsByClassName('square');

  for(let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', playMove, true);
  }

  let player1 = players.player(players.player1Name, 'X', true);
  let player2 = players.player(players.player2Name, 'X', false);
  console.log(player1, player1.name)


  if(player1.name == undefined) {
    player1.name = 'Player 1';
  }

  if(player2.name == undefined) {
    player2.name = 'Player 2';
  }

  function playMove() {
    let tempIndex = event.target.getAttribute('data-index');
    let index = parseInt(tempIndex);


    if(player1.turn === true  //Check whose turn
      && previousWinner === null
      && event.target.innerHTML == '') { //Check if square is empty
        event.target.innerHTML = player1.symbol; //Place player move
        player1.turn = false;
        player2.turn = true;
        p1Moves.push(index);
        p1Moves.sort(function(a, b){return a - b});
        playedTurns += 1;

    } else if(player2.turn === true
      && previousWinner === null
      && event.target.innerHTML == '') {
        event.target.innerHTML = player2.symbol;
        player1.turn = true;
        player2.turn = false;
        p2Moves.push(index);
        p2Moves.sort(function(a, b){return a - b});
        playedTurns += 1;
    }

    if(playedTurns >= 5 && playedTurns < 9) {
      let p1Win = []
      let p2Win = []
      for(let i = 0; i < winSquares.length; i++) {
        p1Win = winSquares[i].filter(item => p1Moves.includes(item));
        p2Win = winSquares[i].filter(item => p2Moves.includes(item));
        if(p1Win.length == 3) {
          display = 'Player 1 Wins!';
          console.log('Player 1 Wins!');
          for(let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', playMove, true);
          }
        } else if(p2Win.length == 3) {
          display = 'Player 2 Wins!';
          console.log('Player 2 Wins!');
          for(let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', playMove, true);
          }
        }
      }
    } else if(playedTurns === 9) {
      display = 'Draw';
      console.log('Draw');
      for(let i = 0; i < squares.length; i++) {
        squares[i].removeEventListener('click', playMove, true);
      }
    }
}

const resetButton = document.getElementsByClassName('reset')[0];
resetButton.onclick = function() {
  newGame();
}

function newGame() {
    playedTurns = 0;
    p1Win = [];
    p2Win = [];
    player1.turn = true;
    player2.turn = false;
    result = '';
    for(let i = 0; i < squares.length; i++) {
      squares[i].textContent= '';
    }
}
return {
  display,
  newGame,
};
})();