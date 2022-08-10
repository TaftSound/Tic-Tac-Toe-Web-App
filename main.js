import gameBoardModule from "./modules/game-board.mjs";
import playerFormModule from "./modules/player-form.mjs";
import startButtonModule from "./modules/start-buttons.mjs";
import statusBoardModule from "./modules/status-board.mjs";

const gameplayModule = (function() {
  let isTwoPlayer = null;
  let playerOneObject = null;
  let playerTwoObject = null;
  let playerOneTurn = null;
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

    setGameMode(gameMode).then((boolean) => {
      isTwoPlayer = boolean;
      content.appendChild(playerFormModule.createForm('One'));
      playerFormModule.addSubmitButtonListener(playerSignUp);
    });
  }

  function playerSignUp() {
    if (!playerOneObject) { playerOneObject = playerFormModule.getFormContent(); }
    else { playerTwoObject = playerFormModule.getFormContent(); }

    playerFormModule.destroyForm();

    if (isTwoPlayer === false) {
      // Put function to attach A.I. opponent here;
      playerOneTurn = true;
      let statusBoard = statusBoardModule.createStatusBoard(playerOneObject.playerName, 'computer');
      content.appendChild(statusBoard);
      startGameplay();
      return
    }
    else if (isTwoPlayer) {
      isTwoPlayer = null;
      content.appendChild(playerFormModule.createForm('Two', playerOneObject));
      playerFormModule.addSubmitButtonListener(playerSignUp);
      return;
    }
    playerOneTurn = true;
    let statusBoard = statusBoardModule.createStatusBoard(playerOneObject.playerName, playerTwoObject.playerName);
    content.appendChild(statusBoard);
    startGameplay();
  }

  function startGameplay() {
    if (playerOneTurn === true) {
      gameBoardModule.createGameBoard(playerOneObject.selectedLetter);
      playerOneTurn = false;
    }
    else {
      gameBoardModule.createGameBoard(playerTwoObject.selectedLetter);
      playerOneTurn = true;
    }
  }

  return {
    displayStartButtons: function() {
      content.appendChild(startButtonModule.createStartButtons());
      startButtonModule.assignStartButtonListeners(setupGame);
    }
  };
})();

gameplayModule.displayStartButtons();


// gameBoardModule.createGameBoard();
// gameBoardModule.disassembleGameBoard();