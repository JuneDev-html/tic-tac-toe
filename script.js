
// ------ ------- MAIN GAME CONTROL ------- -------


const gameBoard = (() => {
  var tie = 0;
  var turn = true;
  var turns = 0;
  var noWinner = true;
  var board = ['', '', '', '', '', '', '', '', ''];
  var getBoard = () => board;
  
  var move = (marker, square) => {
    board[square] = marker;
    getBoard();
    // if board has 3 in a row anywhere => player.gainPoint()
    // if board has no open spots and there is no winner, game is tied!
  }

  var populate = function () {
    for (let i = 0; i < getBoard().length; i++) {
      var square = document.querySelector(`.num${i}`);
      square.innerHTML = getBoard()[i];
    }
  }

  var listen = function () {
    const game = document.querySelectorAll('.square');

    game.forEach((square) => {
      square.addEventListener('click', (e) => {
        if (e.target.innerHTML === '') {
          if (noWinner) {
            // true === player1's turn
            if (turn) {
              // populate square clicked with players marker
              e.target.innerHTML = p1.getMarker();
              // reflect change in board array
              move(p1.getMarker(), e.target.dataset.value)
              
              
              // if checkWinner returns true
              if (checkWinner(p1)) {
                console.log(turn)
                console.log('before stop x')
                // stop trigger from first click from finishing fire
                e.stopImmediatePropagation();
                
                console.log('after stop x')
                // fire these things on click
                var boardDone = document.querySelector('.board');
                boardDone.addEventListener('click', () => {
                  restart();
                  console.log('after restart')
                  turn = true;
                }, {once : true}); // make event listener only listen once
              
              };
              
              // if no more turns available
              if (!nextTurn()){
                tie++;
                document.querySelector('.tie.points').innerHTML = tie.toString();
                
                // stop trigger from first click from finishing fire
                e.stopImmediatePropagation();
                

                var boardDone = document.querySelector('.board');
                boardDone.addEventListener('click', () => {
                  restart();
                  return turn = true;
                }, {once : true}); // make event listener only listen once
              };
            
              // if turn != true then its player2's turn
            } else {
              e.target.innerHTML = p2.getMarker();
              move(p2.getMarker(), e.target.dataset.value)

              if (checkWinner(p2)) {
                console.log('before stop O')
                e.stopImmediatePropagation();
                console.log('after stop O')
                var boardDone = document.querySelector('.board');
                boardDone.addEventListener('click', () => {
                  restart();
                }, {once : true});
              }

              // if no more turns available
              if (!nextTurn()){
                tie++;
                document.querySelector('.tie.points').innerHTML = '1';
                
                e.stopImmediatePropagation();

                var boardDone = document.querySelector('.board');
                boardDone.addEventListener('click', () => {
                  restart();
                  return turn = true;
                }, {once : true}); // make event listener only listen once
              }
            } 
          } 
        }
      })
    });
  }

  var announceWinner = (currPlayer) => {
    console.log(`${currPlayer.getName()} is the winner!`)
  }

  var restart = () => {
    for (let i = 0; i < board.length; i++) {
      move('', i)
    }
    populate();
    noWinner = true;
    turns = 0;     
  }
  

  var checkWinner = (player) => {
    if (  board[0] === player.getMarker() &&
          board[1] === player.getMarker() &&
          board[2] === player.getMarker() 
          ||
          board[3] === player.getMarker() &&
          board[4] === player.getMarker() &&
          board[5] === player.getMarker()
          ||
          board[6] === player.getMarker() &&
          board[7] === player.getMarker() &&
          board[8] === player.getMarker()
          ||
          board[0] === player.getMarker() &&
          board[3] === player.getMarker() &&
          board[6] === player.getMarker() 
          ||
          board[1] === player.getMarker() &&
          board[4] === player.getMarker() &&
          board[7] === player.getMarker()
          ||
          board[2] === player.getMarker() &&
          board[5] === player.getMarker() &&
          board[8] === player.getMarker()
          ||
          board[0] === player.getMarker() &&
          board[4] === player.getMarker() &&
          board[8] === player.getMarker()
          ||
          board[2] === player.getMarker() &&
          board[4] === player.getMarker() &&
          board[6] === player.getMarker()) {
            
            noWinner = false;
            announceWinner(player);
            player.gainPoint();
            console.log(player.getPoints());
            document.querySelector(`.${player.getName()}.points`).innerHTML = player.getPoints();
            return true;
          }
  }

  var nextTurn = () => {
    turns++;
    if (turns < 9) {
      turn = !turn; 
    } else {
      return false
    }
    return true;
  }


  return { populate, listen }
})();

const Player = (name, marker) => {
  let points = 0;
  const getName = () => name;
  const getMarker = () => marker; // update to only allow specific character
  const getPoints = () => points;
  const lose = () => {
    console.log('Wasted');
  }

  const gainPoint = () => {
    points ++;
    if (points >= 5) {
      console.log(`${name} wins!`)
    }
  }

  return { getPoints, gainPoint, getName, getMarker }
}














// ------- ------- RUN INITIAL FUNCTIONS AND METHODS ------- -------

gameBoard.populate();
gameBoard.listen();

const p1 = Player('p1', 'X');

const p2 = Player('p2', 'O');



