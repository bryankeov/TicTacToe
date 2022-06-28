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
  const playerForm = document.getElementById('player-form');
  const modal = document.getElementById('modal');
  const changePlayerButton = document.getElementsByClassName('change-player-details')[0];
  const closeButton = document.getElementsByClassName('close')[0];
  const submitButton = document.getElementById('player-submit');

  function player(name, symbol, turn) {
    return {name, symbol, turn};
  }

  function playerSubmitForm() {
    playerForm.addEventListener('submit', e => {
      const player1Name = document.getElementsByClassName('name')[0].value;
      const player1Symbol = document.getElementsByClassName('symbol')[0].value;
      const player2Name = document.getElementsByClassName('name')[1].value;
      const player2Symbol = document.getElementsByClassName('symbol')[1].value;
      
      console.log(player1Name)
      e.preventDefault();
      return {
        player1Name,
        player1Symbol,
        player2Name,
        player2Symbol
      }
    });
  }

  let player1 = player(playerSubmitForm.player1Name, playerSubmitForm.player1Symbol, true);
  let player2 = player(playerSubmitForm.player2Name, playerSubmitForm.player2Symbol, false);

  console.log(player1)
  

  submitButton.onclick = function() {
    modal.style.display = 'none';
    playerSubmitForm()
  }

  // When the user clicks the button, open the modal 
  changePlayerButton.onclick = function() {
    modal.style.display = 'block';
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
    playerSubmitForm,
    player1,
    player2
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
  let result = '';
  let squares = document.getElementsByClassName('square');

  for(let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', playMove, true);
  }

  let player1 = players.player1;
  let player2 = players.player2;

  if(player1.name == undefined) {
    player1.name = 'Player 1';
    player1.symbol = 'X';
  }

  if(player2.name == undefined) {
    player2.name = 'Player 2';
    player2.symbol = 'O';
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
          result = 'Player 1 Wins!';
          console.log(result);
          for(let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', playMove, true);
          }
        } else if(p2Win.length == 3) {
          result = 'Player 2 Wins!';
          for(let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', playMove, true);
          }
        }
      }
    } else if(playedTurns === 9) {
      result = 'Draw';
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
  result,
  newGame
};
})();






const displayController = (() => {
  const display = document.getElementsByClassName('result-display')[0];
  const player1Display = document.getElementsByClassName('player')[0];
  const player2Display = document.getElementsByClassName('player')[1];
  
  display.value = "gameFlow.result";
  player1Display.innerHTML = "players.player1";
  player2Display.textContent = "players.player2";

console.log(display, player1Display, player2Display)
});