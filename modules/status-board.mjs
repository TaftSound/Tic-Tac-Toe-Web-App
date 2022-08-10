let statusBoard = null;
let roundNumber = null;
let scoreFieldset = null;
let scoreLegend = null;
let scoreGrid = null;
let playerOneName = null;
let playerOneScore = null;
let spacer = null;
let playerTwoName = null;
let playerTwoScore = null;
let currentTurnFieldset = null;
let currentTurnLegend = null;
let currentTurnPlayerName = null;

const statusBoardModule = {
  createStatusBoard: function(pOneName, pTwoName) {
    statusBoard = document.createElement('div');
    roundNumber = document.createElement('h2');
    scoreFieldset = document.createElement('fieldset');
    scoreLegend = document.createElement('legend');
    scoreGrid = document.createElement('div');
    playerOneName = document.createElement('p');
    playerOneScore = document.createElement('p');
    spacer = document.createElement('div');
    playerTwoName = document.createElement('p');
    playerTwoScore = document.createElement('p');
    currentTurnFieldset = document.createElement('fieldset');
    currentTurnLegend = document.createElement('legend');
    currentTurnPlayerName = document.createElement('h2');

    statusBoard.classList.add('status-board');
    scoreGrid.classList.add('score-grid');
    playerOneScore.classList.add('player-score');
    spacer.classList.add('spacer');
    playerTwoScore.classList.add('player-score');
    currentTurnFieldset.classList.add('player-turn');

    roundNumber.innerText = 'Round One!';
    scoreLegend.innerText = 'Score';
    playerOneName.innerText = pOneName;
    playerOneScore.innerText = '0';
    playerTwoName.innerText = pTwoName;
    playerTwoScore.innerText = '0';
    currentTurnLegend.innerText = 'Turn';
    currentTurnPlayerName.innerText = pOneName;

    statusBoard.appendChild(roundNumber);
    statusBoard.appendChild(scoreFieldset);
    statusBoard.appendChild(currentTurnFieldset);
    currentTurnFieldset.appendChild(currentTurnLegend);
    currentTurnFieldset.appendChild(currentTurnPlayerName);
    scoreFieldset.appendChild(scoreLegend);
    scoreFieldset.appendChild(scoreGrid);
    scoreGrid.appendChild(playerOneName);
    scoreGrid.appendChild(playerOneScore);
    scoreGrid.appendChild(spacer);
    scoreGrid.appendChild(playerTwoName);
    scoreGrid.appendChild(playerTwoScore);

    return statusBoard;
  },
  destroyStatusBoard: function() {

  },
  updateStatusBoard: function(gameplayObject) {
    roundNumber.innerText = `Round ${gameplayObject.roundNumber}!`;
    playerOneScore.innerText = gameplayObject.playerOneScore;
    playerTwoScore.innerText = gameplayObject.playerTwoScore;
    currentTurnPlayerName.innerText = gameplayObject.currentPlayer;
  }

};

export default statusBoardModule;