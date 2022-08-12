
let winningPatterns = [ [0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];

const checkGameModule = {
  isGameWon: function(gameArray) {
    for (let pattern of winningPatterns) {
      if (gameArray[pattern[0]] === '') { /* do nothing */ }
      else if (gameArray[pattern[0]] === gameArray[pattern[1]] && 
        gameArray[pattern[0]] === gameArray[pattern[2]]) {
          return gameArray[pattern[0]];
        }
    }
    return false;
  }
};


export default checkGameModule;