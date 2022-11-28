// ------ ------- MAIN GAME CONTROL ------- -------
const gameBoard = (() => {
  var board = ['XE', 'XE', 'XE', 'OE', 'OE', 'OE', 'XE', 'XE', 'XE'];
  var getBoard = () => board;

  var move = (char, square) => {
    board[square] = char;
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
    const board = document.querySelectorAll('.square');

    board.forEach((square) => {
      square.addEventListener('click', (e) => {
        if (e.target.innerHTML === 'A') {
          e.target.innerHTML = june.getMarker();
        } else {
          e.target.innerHTML = 'A';
        }
      })
    });
  }

  return { move, getBoard, populate, listen }
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

const june = Player('June', 'J');




