import gameBoardModule from "./modules/game-board.mjs";
import playerFormModule from "./modules/player-form.mjs";

const gameplayModule = (function() {

  const content = document.querySelector('.content');
  let startButtonDiv = null;
  let onePlayerButton = null;
  let twoPlayerButton = null;

  function CreatePlayer(name, xOrO, computerPlayer = null) {
    return {name, xOrO, computerPlayer};
  }

  function removeStartButtons() {
    onePlayerButton.removeEventListener('click', startOnePlayerGame);
    twoPlayerButton.removeEventListener('click', startTwoPlayerGame);
    onePlayerButton.remove();
    twoPlayerButton.remove();
    startButtonDiv.remove();
  }

  function startOnePlayerGame() {
    removeStartButtons();
  }

  function startTwoPlayerGame() {
    removeStartButtons();
    return
  }

  return {
    mainComponent: content,

    displayStartButtons: function() {
      startButtonDiv = document.createElement('div');
      onePlayerButton = document.createElement('button');
      twoPlayerButton = document.createElement('button');
    
      startButtonDiv.classList.add('start-button-container');
      onePlayerButton.textContent = 'One Player';
      twoPlayerButton.textContent = 'Two Player';
    
      startButtonDiv.appendChild(onePlayerButton);
      startButtonDiv.appendChild(twoPlayerButton);
      content.appendChild(startButtonDiv);
    },
    
    assignStartButtonListeners: function(onePlayer, twoPlayer) {
      onePlayerButton.addEventListener('click', onePlayer);
      twoPlayerButton.addEventListener('click', twoPlayer);
    }
  };
})();

gameplayModule.mainComponent.appendChild(playerFormModule.createForm('One'));

// gameplayModule.displayStartButtons();
// gameplayModule.assignStartButtonListeners();



// gameBoardModule.assembleGameBoard();
// gameBoardModule.disassembleGameBoard();