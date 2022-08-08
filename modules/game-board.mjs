let content = document.querySelector('.content');
let gameBoardDiv = document.createElement('div');
let gameGridDiv = document.createElement('div');
let gameGridArray = [];

gameBoardDiv.classList.add('board');
gameGridDiv.classList.add('game-grid');

function addBoardSpaceDivs() {
  for (let i = 0; i < 9; i++) {
    let newBoardSpaceDiv = document.createElement('div');
    newBoardSpaceDiv.classList.add('board-space');
    gameGridDiv.appendChild(newBoardSpaceDiv);
    gameGridArray.push(newBoardSpaceDiv);
  }
}

let gameBoardModule = {

  assembleGameBoard: function() {
    content.appendChild(gameBoardDiv);
    gameBoardDiv.appendChild(gameGridDiv);
    addBoardSpaceDivs();
  },

  disassembleGameBoard: function() {
    for (let boardSpace in gameGridArray) {
      gameGridArray[boardSpace].remove();
    }
    gameBoardDiv.remove();
    gameGridDiv.remove();
  }

};

export default gameBoardModule;