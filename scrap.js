function botMove() {
  var trying = true;
  while (trying) {
    var random = Math.floor(Math.random() * 8);
    if (board[random] === '') {

      board[random] = 'O';
      setTimeout(() => {
        document.querySelector(`[data-value="${random}"`).innerHTML = 'O';
        botMoving = false; // add this in here so player cant move before bot
      }, 400);
      trying = false;
    }
  }
}