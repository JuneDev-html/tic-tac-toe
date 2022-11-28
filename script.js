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
  return { move, getBoard, populate }
})();

const Player = (name) => {
  let points = 0;
  const getName = () => name;
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

  return { gainPoint, name }
}

// ----- GAMEBOARD DISPLAY POPULATE --------






gameBoard.populate();
const june = Player('June');

console.dir(gameBoard)

gameBoard.move('X', 2)
console.dir(gameBoard.getBoard())