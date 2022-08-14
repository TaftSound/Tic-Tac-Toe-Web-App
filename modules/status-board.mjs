
  let statusBoard = document.createElement('div');
  let roundNumber = document.createElement('h2');
  let scoreFieldset = document.createElement('fieldset');
  let scoreLegend = document.createElement('legend');
  let scoreGrid = document.createElement('div');
  let playerOneName = document.createElement('p');
  let playerOneScore = document.createElement('p');
  let spacer = document.createElement('div');
  let playerTwoName = document.createElement('p');
  let playerTwoScore = document.createElement('p');
  let currentTurnFieldset = document.createElement('fieldset');
  let currentTurnLegend = document.createElement('legend');
  let currentTurnPlayerName = document.createElement('h2');
  let finalMessageContainer = document.createElement('div');

  statusBoard.classList.add('status-board');
  scoreGrid.classList.add('score-grid');
  playerOneScore.classList.add('player-score');
  spacer.classList.add('spacer');
  playerTwoScore.classList.add('player-score');
  currentTurnFieldset.classList.add('player-turn');
  finalMessageContainer.classList.add('final-scoreboard');

const statusBoardModule = {
  createFinalScoreboard: function() {
    finalMessageContainer.appendChild(playerOneName);
    finalMessageContainer.appendChild(playerOneScore);
    finalMessageContainer.appendChild(spacer);
    finalMessageContainer.appendChild(playerTwoName);
    finalMessageContainer.appendChild(playerTwoScore);
    return finalMessageContainer;
  },

  destroyFinalScoreboard: function() {
    playerOneName.remove();
    playerOneScore.remove();
    playerTwoName.remove();
    playerTwoScore.remove();
    finalMessageContainer.remove();
  },

  createStatusBoard: function(pOneName, pTwoName) {
    roundNumber.innerText = 'Round 1!';
    scoreLegend.innerText = 'Score';
    playerOneName.innerText = pOneName;
    playerOneScore.innerText = '0';
    playerTwoName.innerText = pTwoName;
    playerTwoScore.innerText = '0';
    currentTurnLegend.innerText = 'Turn';
    currentTurnPlayerName.innerText = pOneName;

    statusBoard.appendChild(currentTurnFieldset);
    statusBoard.appendChild(roundNumber);
    statusBoard.appendChild(scoreFieldset);
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
  statusBoard.remove();
  roundNumber.remove();
  scoreFieldset.remove();
  scoreLegend.remove();
  scoreGrid.remove();
  playerOneName.remove();
  playerOneScore.remove();
  spacer.remove();
  playerTwoName.remove();
  playerTwoScore.remove();
  currentTurnFieldset.remove();
  currentTurnLegend.remove();
  currentTurnPlayerName.remove();
  },

  setCurrentPlayer: function(name) {
    currentTurnPlayerName.innerText = name;
  },

  updateScore: function(pOneScore, pTwoScore) {
    playerOneScore.innerText = pOneScore;
    playerTwoScore.innerText = pTwoScore;
  },

  updateRoundNumber: function(newRoundNumber) {
    roundNumber.innerText = `Round ${newRoundNumber}!`;
  },

  minimize: function() {
    statusBoard.classList.add('minimize');
    currentTurnFieldset.remove();
  },

  endGame: function() {
    statusBoard.classList.add('minimize');
    currentTurnFieldset.remove();
    roundNumber.remove();
  },

  maximize: function() {
    statusBoard.classList.remove('minimize');
    statusBoard.insertBefore(currentTurnFieldset, roundNumber);
  }

};

export default statusBoardModule;