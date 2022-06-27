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
  let squares = document.getElementsByClassName('square');

  for(let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', event => {
      playMove()
  })};

  function playMove() {
    let tempIndex = event.target.getAttribute('data-index');
    let index = parseInt(tempIndex);
    
    if(players.player1.turn === true  //Check whose turn
      && previousWinner === null
      && event.target.innerHTML == '') { //Check if square is empty
        event.target.innerHTML = players.player1.symbol; //Place player move
        players.player1.turn = false;
        players.player2.turn = true;
        p1Moves.push(index);
        p1Moves.sort(function(a, b){return a - b});
        playedTurns += 1;

      } else if(players.player2.turn === true
        && previousWinner === null
        && event.target.innerHTML == '') {
          event.target.innerHTML = players.player2.symbol;
          players.player1.turn = true;
          players.player2.turn = false;
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
              console.log('P1 Wins');
            } else if(p2Win.length == 3) {
              console.log('P2 Wins');
            }
          }
        } else if(playedTurns === 9) {
          console.log('Draw');
        }
  }
})();

function player(name, symbol, turn) {
  return {name, symbol, turn};
}


const players = (() => {   //Players object
  const playerForm = document.getElementById('player-form');
  const modal = document.getElementById('modal');
  const changePlayerButton = document.getElementsByClassName('change-player-details')[0];
  const closeButton = document.getElementsByClassName('close')[0];
  const submitButton = document.getElementById('player-submit');


  function playerSubmitForm() {
    playerForm.addEventListener('submit', event => {
      const player1Name = document.getElementsByClassName('name')[0].value;
      const player1Symbol = document.getElementsByClassName('symbol')[0].value;
      const player2Name = document.getElementsByClassName('name')[1].value;
      const player2Symbol = document.getElementsByClassName('symbol')[1].value;
      event.preventDefault();
      return {player1Name, player1Symbol, player2Name, player2Symbol};
    });
  }

  let player1 = player(playerSubmitForm.player1Name, playerSubmitForm.player1Symbol, true);
  let player2 = player(playerSubmitForm.player2Name, playerSubmitForm.player2Symbol, false);

console.log(player1)

  
  submitButton.onclick = function() {
    modal.style.display = 'none';
    playerSubmitForm();
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
  return {player1, player2}
})();