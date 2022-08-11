
function evaluateMove() {

}

const minimaxModule = {
  minimaxEval: function(position, depth, maximizingPlayer, gameBoardArray) {
    if (depth === 0 || isGameOver(gameBoardArray)) {
      // Return static evaluation of position;
    }

    if (maximizingPlayer) {
      maxEval = -Infinity;

    }

    // return bestMove;
  }
};

export default minimaxModule;