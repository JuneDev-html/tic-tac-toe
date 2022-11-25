const gameBoard = (() => {
  var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  var getBoard = () => board;
  var move = (char, spot) => {
    board[spot] = char;
    getBoard();
  }
  return { move, getBoard }
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

const june = Player('June');

console.dir(gameBoard)

gameBoard.move('X', 2)
console.dir(gameBoard.getBoard())