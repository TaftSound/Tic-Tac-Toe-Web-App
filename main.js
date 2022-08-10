import gameBoardModule from "./modules/game-board.mjs";
import playerFormModule from "./modules/player-form.mjs";
import startButtonModule from "./modules/start-buttons.mjs";

const gameplayModule = (function() {
  let gameMode = null;
  let isTwoPlayer = null;
  let playerOneObject = null;
  let playerTwoObject = null;
  const content = document.querySelector('.content');

  function setGameMode() {
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
    gameMode = this.textContent;
    startButtonModule.removeStartButtons();
    setGameMode().then((gameModeBoolean) => {
      isTwoPlayer = gameModeBoolean;
      content.appendChild(playerFormModule.createForm('One'));
      playerFormModule.addSubmitButtonListener(playerSignUp);
    });
  }

  function playerSignUp() {
    if (!playerOneObject) {
      playerOneObject = playerFormModule.getFormContent();
    }
    else { playerTwoObject = playerFormModule.getFormContent(); }

    playerFormModule.destroyForm();
    if (isTwoPlayer) {
      isTwoPlayer = null;
      content.appendChild(playerFormModule.createForm('Two'));
      playerFormModule.addSubmitButtonListener(playerSignUp);
      return;
    }
    if (!playerTwoObject) {
      // Function to attach A.I. opponent;
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

// gameBoardModule.assembleGameBoard();
// gameBoardModule.disassembleGameBoard();