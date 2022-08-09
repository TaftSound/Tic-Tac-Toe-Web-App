import gameBoardModule from "./modules/game-board.mjs";
import playerFormModule from "./modules/player-form.mjs";
import startButtonModule from "./modules/start-buttons.mjs";

const gameplayModule = (function() {

  const content = document.querySelector('.content');

  function CreatePlayer(name, xOrO, computerPlayer = null) {
    return {name, xOrO, computerPlayer};
  }

  // function startOnePlayerGame() {
  //   startButtonModule.removeStartButtons(startOnePlayerGame, startTwoPlayerGame);
  // }

  // function startTwoPlayerGame() {
  //   startButtonModule.removeStartButtons(startOnePlayerGame, startTwoPlayerGame);
  // }

  return {

    displayStartButtons: function() {
      content.appendChild(startButtonModule.createStartButtons());
    },
    startOnePlayerGame: function() {
      startButtonModule.removeStartButtons(gameplayModule.startOnePlayerGame, gameplayModule.startTwoPlayerGame);
    },
    startTwoPlayerGame: function() {
      startButtonModule.removeStartButtons(gameplayModule.startOnePlayerGame, gameplayModule.startTwoPlayerGame);
    }
  };
})();

// gameplayModule.mainComponent.appendChild(playerFormModule.createForm('One'));

gameplayModule.displayStartButtons();
startButtonModule.assignStartButtonListeners(gameplayModule.startOnePlayerGame, gameplayModule.startTwoPlayerGame);



// gameBoardModule.assembleGameBoard();
// gameBoardModule.disassembleGameBoard();