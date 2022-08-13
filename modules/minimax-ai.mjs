
import checkGameModule from "./check-game-over.mjs";
let testGameBoard = ['', '', '', '', '', '', '', '', ''];
let winningPatterns = checkGameModule.getWinningPatterns();
let xScore = 0;
let oScore = 0;
let playerOneLetter = 'X';
let playerTwoLetter = 'O';
let bestMoveIndex = null;

function evaluateMove(gameBoardArray) {
  xScore = 0;
  oScore = 0;

  checkTwoOfThree(gameBoardArray);
  checkCenter(gameBoardArray);
  checkCorner(gameBoardArray);
  checkMiddleEdge(gameBoardArray);
  return { xScore, oScore };
}

function gameWon(gameBoardArray) {
  let isWinner = null;
  for (let pattern of winningPatterns) {
      if (gameBoardArray[pattern[0]] === '') { /* do nothing */ }
      else if (gameBoardArray[pattern[0]] === gameBoardArray[pattern[1]] && 
        gameBoardArray[pattern[0]] === gameBoardArray[pattern[2]]) {
          isWinner = gameBoardArray[pattern[0]];
        }
    }
  if (isWinner) {
    if (isWinner === 'X') {
      xScore = Infinity;
      oScore = -Infinity;
    }
    else {
      oScore = Infinity;
      xScore = -Infinity;
    }
  }
  return isWinner;
}

function checkTwoOfThree(gameBoardArray) {
  for (let pattern of winningPatterns) {
    let checkGroup = [];
    for (let i = 0; i < 3; i++) {
      if (gameBoardArray[pattern[i]]) {
        checkGroup.push(gameBoardArray[pattern[i]]);
      }
    }
    if (checkGroup.length === 2) {
      if (checkGroup[0] === checkGroup[1]) {
        if (checkGroup[0] === 'X') {
          xScore+= 5;
        }
        else { oScore+= 5 }
      }
    }
  }
}

function checkCenter(gameBoardArray) {
  if (gameBoardArray[4] === 'X') { xScore+= 3 };
  if (gameBoardArray[4] === 'O') { oScore+= 3 };
}

function checkCorner(gameBoardArray) {
  let corners = [0, 2, 6, 8];
  for (let corner in corners) {
    if (gameBoardArray[corners[corner]] === 'X') { xScore+= 2; }
    if (gameBoardArray[corners[corner]] === 'O') { oScore+= 2; }
  }
}

function checkMiddleEdge(gameBoardArray) {
  let middleEdge = [1, 3, 5, 7];
  for (let edge in middleEdge) {
    if (gameBoardArray[middleEdge[edge]] === 'X') { xScore+= 1; }
    if (gameBoardArray[middleEdge[edge]] === 'O') { oScore+= 1; }
  }
}

function getOpenSpaces(gameBoardArray) {
  let openSpaces = [];
  for (let space in gameBoardArray) {
    if(gameBoardArray[space]) { /* do nothing */ }
    else { openSpaces.push(space); }
  }
  console.log(openSpaces);
  return openSpaces;
}

// console.log(evaluateMove(testGameBoard));
getOpenSpaces(testGameBoard);


const minimaxModule = {
  minimaxEval: function(depth, maximizingPlayer, gameBoardArray) {
    if(gameWon(gameBoardArray)) {
      if (playerTwoLetter === 'X') { return xScore; }
      else { return oScore; }
    }
    if (depth === 0) {
      evaluateMove(gameBoardArray);
      if (playerTwoLetter === 'X') { return (xScore - oScore); }
      else { return (oScore - xScore); }
    }
    let openIndexes = getOpenSpaces(gameBoardArray);

    if (maximizingPlayer) {
      let maxEval = -Infinity;
      let index = null;
      bestMoveIndex = null;
      for (let eachIndex in openIndexes) {
        index = openIndexes[eachIndex];
        gameBoardArray[index] = playerTwoLetter;
        let evaluation = this.minimaxEval((depth -1), false, gameBoardArray);
        if (!bestMoveIndex) { bestMoveIndex = index; }
        else if (evaluation > maxEval) { bestMoveIndex = index; }
        maxEval = Math.max(maxEval, evaluation);
        gameBoardArray[index] = '';
      }
      return maxEval;
    }
    else {
      let minEval = Infinity;
      let index = null;
      for (let eachIndex in openIndexes) {
        index = openIndexes[eachIndex];
        gameBoardArray[index] = playerOneLetter;
        let evaluation = this.minimaxEval((depth -1), true, gameBoardArray);
        minEval = Math.min(minEval, evaluation);
        gameBoardArray[index] = '';
      }
      return minEval;

    }
  }
};

minimaxModule.minimaxEval(3, true, testGameBoard);
console.log(bestMoveIndex);
// console.log(gameWon(testGameBoard));

export default minimaxModule;