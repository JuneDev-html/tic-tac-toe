  //  CHANGE CHANGE CHANGE 
  // CHANGE CHANGE CHANGE
  var botMove = function () {
    var score = 0;
    var bestScore = 0;
    var bestMove;

    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        board[i] = 'O';
        score = minimax(board, 0, true);
        board[i] = '';
        bestScore = max(score, bestScore);
      }
    }
    board[bestMove] = 'O';
    setTimeout(() => {
      document.querySelector(`[data-value="${bestMove}"`).innerHTML = 'O';
      botMoving = false; // add this in here so player cant move before bot
    }, 400);
    console.log(board)
  }


function emptyIndexies(board){
  return  board.filter(s => s != "O" && s != "X");
}


function minimax(newBoard, player) {
  var availSpots = emptyIndexies(board)
  console.log(availSpots)
}