  //Gameboard object
const gameBoard = (() => {
  let board = []; //game board array
  for(let i = 0; i < 9; i++) {
    board.push('');
  }
  const boardContainer = document.getElementsByClassName('container')[0];
  board.forEach(item => {
    const square = document.createElement('div');
    square.className = 'square';
    // square.addEventListener('click', event => {
    //   event.target.innerHTML = 'X';
    // })
    boardContainer.appendChild(square);
  });

  //Players object
  function player(name, symbol, turn) {
    return {name, symbol, turn};
  }

  const player1 = player('player1', 'X', true)
  const player2 = player('player2', 'O', false)
  return {board, player1, player2};
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

  let playedTurns = 0;
  let previousWinner = null;
  let squares = document.getElementsByClassName('square');

  for(let i = 0; i < squares.length; i++) {
    squares[i].addEventListener('click', event => {
      playTurn()
  })};

  function playTurn() {
    if(gameBoard.player1.turn === true  //Check whose turn
      && previousWinner === null
      && event.target.innerHTML == '') { //Check if square is empty
        event.target.innerHTML = gameBoard.player1.symbol; //Place player move
        gameBoard.player1.turn = false;
        gameBoard.player2.turn = true;
        playedTurns += 1;
      } else if(gameBoard.player2.turn === true
        && previousWinner === null
        && event.target.innerHTML == '') {
          event.target.innerHTML = gameBoard.player2.symbol;
          gameBoard.player1.turn = true;
          gameBoard.player2.turn = false;
          playedTurns += 1;
        }
  }
})();