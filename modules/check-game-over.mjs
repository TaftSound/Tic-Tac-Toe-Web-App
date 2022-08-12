
let winningPatterns = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

function isGameWon(gameArray) {
  for (let pattern of winningPatterns) {
    if (gameArray[pattern[0]] === '') { /* do nothing */ }
    else if (gameArray[pattern[0]] === gameArray[pattern[1]] && 
      gameArray[pattern[0]] === gameArray[pattern[2]]) {
        return gameArray[pattern[0]];
      }
  }
  return false;
}

function isGameTied(gameArray) {
  let moveCount = 0;
  for (let position in gameArray) {
    if (gameArray[position]) {
      moveCount++;
    }
  }
  if (moveCount === 9) {
    return 'tie';
  }
  return false;
}

const checkGameModule = {
  isGameOver: function(gameArray) {
    let winner = isGameWon(gameArray);
    let tie = isGameTied(gameArray);
    console.log(winner);
    console.log(tie);
    if (winner) { return winner; }
    if (tie) { return tie; }
  }
};


export default checkGameModule;