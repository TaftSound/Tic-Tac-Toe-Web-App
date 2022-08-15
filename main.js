import gameBoardModule from "./modules/game-board.mjs";
import playerFormModule from "./modules/player-form.mjs";
import startButtonModule from "./modules/start-buttons.mjs";
import statusBoardModule from "./modules/status-board.mjs";
import checkGameModule from "./modules/check-game-over.mjs";
import displayMessageModule from "./modules/disply-message.mjs";
import minimaxModule from "./modules/minimax-ai.mjs";

const gameplayModule = (function() {
  let isTwoPlayer = null;
  let playerOneTurn = true;
  let roundNumber = 1;
  let currentPlayer = null;
  let playerOneScore = 0;
  let playerTwoScore = 0;
  let playerOneObject = null;
  let playerTwoObject = null;
  let timeoutIdOne = null;
  let timeoutIdTwo = null;
  let timeoutIdThree = null;
  const content = document.querySelector('.content');
  
  function setGameMode(gameMode) {
    return new Promise((resolve, reject) => {
      if (gameMode === 'One Player') {
        resolve(false);
      }
      else if (gameMode === 'Two Player') {
        resolve(true);
      }
    });
  }

  function setupGame() {
    let gameMode = this.textContent;
    startButtonModule.removeStartButtons();
    displayResetButton();

    setGameMode(gameMode).then((answer) => {
      isTwoPlayer = answer;
      content.appendChild(playerFormModule.createForm('Player One'));
      playerFormModule.addSubmitButtonListener(signUpPlayers);
    });
  }

  function signUpPlayers() {
    if (!playerOneObject) { playerOneObject = playerFormModule.getFormContent(); }
    else { playerTwoObject = playerFormModule.getFormContent(); }

    playerFormModule.destroyForm();

    if (isTwoPlayer) {
      isTwoPlayer = null;
      content.appendChild(playerFormModule.createForm('Player Two', playerOneObject));
      playerFormModule.addSubmitButtonListener(signUpPlayers);
      return;
    }
    if (!playerTwoObject) {
      let letter = null;
      if (playerOneObject.selectedLetter === "X") {
        letter = 'O';
      }
      else letter = 'X';
      playerTwoObject = {
        playerName: 'Computer',
        selectedLetter: letter,
        isAi: true,
       };
    }
    startGameplay();
  }

  function startGameplay() {
    let statusBoard = statusBoardModule.createStatusBoard(playerOneObject.playerName, playerTwoObject.playerName);
    content.appendChild(statusBoard);
    content.appendChild(gameBoardModule.createGameBoard());
    gameBoardModule.setListenerFunctions(gameplayLoop);
    gameplayLoop();
  }

  function gameplayLoop() {
    let roundResult = checkGameModule.isGameOver(gameBoardModule.retrieveBoardState());
    if (roundResult) {
      displayRoundResult(roundResult);
      timeoutIdOne = setTimeout(startNextRound, 3000);
      return;
    }
    if (playerOneTurn === true) { currentPlayer = playerOneObject; }
    else { currentPlayer = playerTwoObject; }
    statusBoardModule.setCurrentPlayer(currentPlayer.playerName);
    gameBoardModule.setCurrentLetter(currentPlayer.selectedLetter);
    playerOneTurn = !playerOneTurn;
    if (currentPlayer === playerTwoObject) {
      if (playerTwoObject.isAi) {
        displayLoadingIcons();
        gameBoardModule.freezeBoard();
        minimaxModule.setPlayerLetters(playerOneObject.selectedLetter, playerTwoObject.selectedLetter);
        minimaxModule.minimaxEval(4, true, gameBoardModule.retrieveBoardState());
        setTimeout(() => {
          clearLoadingIcons();
          gameBoardModule.unfreezeBoard();
        }, 1800);
        timeoutIdTwo = setTimeout(() => {
          gameBoardModule.setAiMove(minimaxModule.getBestMoveIndex());
          gameplayLoop();
        }, 1801);
      }
    }
  }

  function displayLoadingIcons() {
    let loadingIcons = document.getElementsByClassName('loading');
    loadingIcons[0].classList.add('img-animate');
    loadingIcons[1].classList.add('img-animate');
  }

  function clearLoadingIcons() {
    let loadingIcons = document.getElementsByClassName('loading');
    loadingIcons[0].classList.remove('img-animate');
    loadingIcons[1].classList.remove('img-animate');
  }
  
  function displayRoundResult(roundResult) {
    if (playerOneObject.selectedLetter === roundResult) { 
      playerOneScore++;
      displayMessageModule.displayMessage(`${playerOneObject.playerName} wins round ${roundNumber}`);
    }
    else if (playerTwoObject.selectedLetter === roundResult) { 
      playerTwoScore++;
      displayMessageModule.displayMessage(`${playerTwoObject.playerName} wins round ${roundNumber}`);
    }
    else {
      playerOneScore++;
      playerTwoScore++;
      displayMessageModule.displayMessage("The round ends in a tie!");
    }
    gameBoardModule.minimize();
    statusBoardModule.minimize();
    statusBoardModule.updateScore(playerOneScore, playerTwoScore);
  }

  function startNextRound() {
    displayMessageModule.removeMessage();
    if (roundNumber > 0) {
      endGame();
      timeoutIdThree = setTimeout(restartGame, 3000);
      return;
    }
    roundNumber = roundNumber + 1;
    statusBoardModule.updateRoundNumber(roundNumber);
    statusBoardModule.maximize();
    gameBoardModule.maximize();
    gameBoardModule.resetBoardState();
    gameplayLoop();
  }

  function endGame() {
    let finalMessage = null;
    if (playerOneScore > playerTwoScore) {
      finalMessage = `${playerOneObject.playerName} wins the game!`;
    }
    else if (playerOneScore < playerTwoScore) {
      finalMessage = `${playerTwoObject.playerName} wins the game!`;
    }
    else { finalMessage = 'The game ends in a tie!'; }
    displayMessageModule.displayMessage(finalMessage);
    statusBoardModule.maximize();
    gameBoardModule.maximize();
    gameBoardModule.destroyGameBoard();
    statusBoardModule.destroyStatusBoard();
    content.appendChild(statusBoardModule.createFinalScoreboard());
  }

  function restartGame() {
    gameBoardModule.maximize();
    gameBoardModule.destroyGameBoard();
    statusBoardModule.maximize();
    statusBoardModule.destroyStatusBoard();
    statusBoardModule.destroyFinalScoreboard();
    playerFormModule.destroyForm();
    displayMessageModule.removeMessage();
    gameplayModule.displayStartButtons();
    clearData();
  }

  function clearData() {
    isTwoPlayer = null;
    playerOneTurn = true;
    roundNumber = 1;
    currentPlayer = null;
    playerOneScore = 0;
    playerTwoScore = 0;
    playerOneObject = null;
    playerTwoObject = null;
  }

  function displayResetButton() {
    let resetButton = document.querySelector('.reset-button');
    resetButton.addEventListener('click', functionsForReset);
    resetButton.classList.add('appear');
  }

  function removeResetButton() {
    let resetButton = document.querySelector('.reset-button');
    resetButton.removeEventListener('click', functionsForReset);
    resetButton.classList.remove('appear');
  }

  function functionsForReset() {
    clearTimeoutFunc();
    clearLoadingIcons();
    restartGame();
  }

  function clearTimeoutFunc() {
    clearTimeout(timeoutIdOne);
    clearTimeout(timeoutIdTwo);
    clearTimeout(timeoutIdThree);
  }

// Public Below Here ==========================================================
  return {
    displayStartButtons: function() {
      content.appendChild(startButtonModule.createStartButtons());
      startButtonModule.assignStartButtonListeners(setupGame);
      removeResetButton();
    }
  };
})();

gameplayModule.displayStartButtons();