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
      setTimeout(startNextRound, 3000);
      return;
    }
    if (playerOneTurn === true) { currentPlayer = playerOneObject; }
    else { currentPlayer = playerTwoObject; }
    statusBoardModule.setCurrentPlayer(currentPlayer.playerName);
    gameBoardModule.setCurrentLetter(currentPlayer.selectedLetter);
    playerOneTurn = !playerOneTurn;
    if (currentPlayer === playerTwoObject) {
      if (playerTwoObject.isAi) {
        let loadingIcons = document.getElementsByClassName('loading');
        loadingIcons[0].classList.add('img-animate');
        loadingIcons[1].classList.add('img-animate');
        gameBoardModule.freezeBoard();
        minimaxModule.setPlayerLetters(playerOneObject.selectedLetter, playerTwoObject.selectedLetter);
        minimaxModule.minimaxEval(4, true, gameBoardModule.retrieveBoardState());
        setTimeout(() => {
          loadingIcons[0].classList.remove('img-animate');
          loadingIcons[1].classList.remove('img-animate');
          loadingIcons = null;
          gameBoardModule.setAiMove(minimaxModule.getBestMoveIndex());
          gameBoardModule.unfreezeBoard();
          gameplayLoop();
        }, 1800);
      }
    }
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
      setTimeout(restartGame, 3000);
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
    displayMessageModule.removeMessage();
    gameBoardModule.destroyGameBoard();
    statusBoardModule.destroyStatusBoard();
    statusBoardModule.destroyFinalScoreboard();
    isTwoPlayer = null;
    playerOneTurn = true;
    roundNumber = 1;
    currentPlayer = null;
    playerOneScore = 0;
    playerTwoScore = 0;
    playerOneObject = null;
    playerTwoObject = null;
    gameplayModule.displayStartButtons();
  }

// Public Below Here ==========================================================
  return {
    displayStartButtons: function() {
      content.appendChild(startButtonModule.createStartButtons());
      startButtonModule.assignStartButtonListeners(setupGame);
    }
  };
})();

gameplayModule.displayStartButtons();