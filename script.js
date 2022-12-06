// ------ ------- MAIN GAME CONTROL ------- -------

const gameBoard = (() => {
  var botMoving = false;
  var bot_play = false;
  var p1_turn = true;
  var noWinner = true;
  var tie = 0;
  var board = ['', '', '', '', '', '', '', '', ''];
  var getBoard = () => board;
  
  
  
  // ----- ----- PLAYER BUTTON LOGIC ------ -----
  
  const pvp = document.querySelector('.pvp');
  const pvb = document.querySelector('.pvb');
  
  pvp.addEventListener('click', () => {
    togglePlayer();
  });

  pvb.addEventListener('click', () => {
    togglePlayer();
  });

  function togglePlayer() {
    pvp.classList.toggle('active')
    pvb.classList.toggle('active')
    bot_play = !bot_play;
    restart();
    restartScoreboard();
  };

  // default pvp active
  pvp.classList.toggle('active');


  // ------ ------ GAMEPLAY LOGIC ------ -------- 

  // Starts listener on each square for clicks
  function listen() {
    const game = document.querySelectorAll('.square');

    game.forEach((square) => {
      square.addEventListener('click', takeTurn);
    });
  }

  function updateBoardArray(marker, square) {
    board[square] = marker;
  }

  function updateBoardDisplay(space, player) {
    space.target.innerHTML = player.getMarker();
  }
  

  
  
  // --------- MINIMAX LOGIC -----------
  function botMove() {
    let bestScore = -Infinity;
    let bestMove;
      for (let i = 0; i < 9; i++) {
        if (board[i] === '') {
          board[i] = 'O';
          let score = minimax(board, 0, false);
          console.log(`score: ${score} ${i}`)
          board[i] = '';
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
            console.log(`bestMove: ${bestMove}`)

          }
        }  
      }
      console.log(bestMove)
      board[bestMove] = 'O';
        setTimeout(() => {
            document.querySelector(`[data-value="${bestMove}"`).innerHTML = 'O';
            botMoving = false; // add this in here so player cant move before bot
          }, 400);
  }

  let scores = {
    X: -1,
    O: 1,
    tie: 0
  }
  
function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return scores[result]
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++){
      if (board[i] === '') {
        board[i] = 'O';
        let score = minimax(board, depth + 1, false);
        board[i] = '';
        bestScore = Math.max(score, bestScore)
      }
    }
  return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++){
      if (board[i] === '') {
        board[i] = 'X';
        let score = minimax(board, depth + 1, true);
        board[i] = '';
        bestScore = Math.min(score, bestScore)
      }
    }
    return bestScore;
  }
}
// --------- ------------- 






  // Populates the gameboard display with array values
  function populate() {
    for (let i = 0; i < getBoard().length; i++) {
      var square = document.querySelector(`.num${i}`);
      square.innerHTML = getBoard()[i];
    }
  }

  // if winner/tie => stop everything and restart on click
  function stopAndListen(){
    var boardDone = document.querySelector('.board');
    boardDone.addEventListener('click', () => {
      restart();
    }, {once : true});
  }

  function restart() {
    for (let i = 0; i < board.length; i++) {
      updateBoardArray('', i);
    }
    populate();
    noWinner = true;
    p1_turn = true;
    turns = 0;
  } 

  function restartScoreboard() {
    p1.restartPoints();
    p2.restartPoints();
    tie = 0;
    document.querySelector(`.p1.points`).innerHTML = '';
    document.querySelector(`.p2.points`).innerHTML = '';
    document.querySelector(`.tie.points`).innerHTML = '';
  }

  // checks board for 3 in a row of something
  function rowOf3(a, b, c) {
    if (a === b && b === c && a != '') {
      return true;
    }
  }

  function declareTie() {
    tie++;
    document.querySelector('.tie.points').innerHTML = tie.toString();
    
    // turn this on to skip bot move
    noWinner = false;
  };

  function declareWin(player) {
    noWinner = false;
    player.gainPoint();
    document.querySelector(`.${player.getName()}.points`).innerHTML = player.getPoints();
  };

  function nextTurn() {
    p1_turn = !p1_turn;
  }

  function checkWinner() {

    var winner = null;


    // horizontal
    for (let i = 0; i < 7; i += 3) {
      if (rowOf3(board[(i + 0)], board[(i + 1)], board[(i + 2)])) {
        winner = board[i];
      }
    }

    // vertical
    for (let i = 0; i < 3; i++) {
      if (rowOf3(board[(i + 0)], board[(i + 3)], board[(i + 6)])) {
        winner = board[i];
      }
    }

    // diagonal
    if (rowOf3(board[0], board[4], board[8])) {
      winner = board[0];
    }

    if (rowOf3(board[2], board[4], board[6])) {
      winner = board[2];
    }

    // no more spaces left to be played
    let freeSpace = 0;
    for (let i = 0; i < 9; i++) {
      if (board[i] === '') {
        freeSpace++;
      }
    }

    // if someone has won, run win functions
    if (winner !== null) {
      return winner;
    }

    if (winner === null && freeSpace === 0) {
      return 'tie';
    }

    return winner;
  }
  
  // function fired off on click
  function takeTurn(e) {
    // if there is nothing in space being click
    if (e.target.innerHTML === '') {
      // If no current winner declared (if winner declared, stop allowing moves)
      if ((!botMoving) && noWinner) {

        // ------ PLAYER 1'S TURN ------
        if (p1_turn) {

          updateBoardDisplay(e, p1);
          updateBoardArray(p1.getMarker(), e.target.dataset.value);

          // if checkWinner returns true
          if (checkWinner() === 'X') {
            declareWin(p1);
            // stop trigger from first click from finishing fire
            e.stopImmediatePropagation();
            
            
            
           // --- ADD FLASH HERE
            stopAndListen();
          
          
          
          
          };

          if (checkWinner() === 'tie') {
            declareTie();
            e.stopImmediatePropagation();
            stopAndListen();
          }
          nextTurn();

          // ------ BOT MOVE ---------
          if (bot_play === true && (noWinner)) {
            botMoving = true;
            botMove();

            if (checkWinner(p2) === 'O') {
              declareWin(p2);
              e.stopImmediatePropagation();
              stopAndListen();
            };

            if (checkWinner(p2) === 'tie') {
              declareTie();
              e.stopImmediatePropagation();
              stopAndListen();
            }

            nextTurn();
          }


          // ----- PLAYER 2'S TURN -----
        } else if (p1_turn === false && bot_play === false) {
          updateBoardDisplay(e, p2);
          updateBoardArray(p2.getMarker(), e.target.dataset.value);

          if (checkWinner() === 'O') {
            declareWin(p2);
            e.stopImmediatePropagation();
            stopAndListen();
          };

          if (checkWinner() === 'tie') {
            declareTie();
            e.stopImmediatePropagation();
            stopAndListen();
          }
          nextTurn();
        }

      }
    }
  }

  return { populate, listen }
})();

// --------- PLAYER CONTROL ---------
const Player = (name, marker) => {
  let points = 0;
  const getName = () => name;
  const getMarker = () => marker; // update to only allow specific character
  const getPoints = () => points;
  const restartPoints = () => {
    points = 0;
  }
  const gainPoint = () => {
    points ++;
  }

  return { getPoints, gainPoint, getName, getMarker, restartPoints }
}














// ------- ------- RUN INITIAL FUNCTIONS AND METHODS ------- -------

gameBoard.populate();
gameBoard.listen();

const p1 = Player('p1', 'X');

const p2 = Player('p2', 'O');



