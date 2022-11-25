const gameBoard = (() => {
  var board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  return { board }
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

gameBoard.board[0] = '2';
console.dir(gameBoard)