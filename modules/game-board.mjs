import gameplayModule from "./player-form.mjs";

let content = document.querySelector('.content');
let gameBoardDiv = document.createElement('div');
let gameGridDiv = document.createElement('div');
let boardSpaceArray = [];

gameBoardDiv.classList.add('board');
gameGridDiv.classList.add('game-grid');

function addBoardSpaceDivs() {
  for (let i = 0; i < 9; i++) {
    let newBoardSpaceDiv = document.createElement('div');
    newBoardSpaceDiv.classList.add('board-space');
    gameGridDiv.appendChild(newBoardSpaceDiv);
    boardSpaceArray.push(newBoardSpaceDiv);
  }
}

function addBoardButtons() {
  for (let boardSpace in boardSpaceArray) {
    let button = document.createElement('button');
    boardSpaceArray[boardSpace].appendChild(button);
    button.addEventListener('click', e => { 
      console.log(e.path[1]); 
      e.path[1].classList.add('on');
    });
  }
}

function addItemsToBoard(item) {

}

// Public below ==================================
let gameBoardModule = {

  createGameBoard: function() {
    content.appendChild(gameBoardDiv);
    gameBoardDiv.appendChild(gameGridDiv);
    addBoardSpaceDivs();
  },

  destroyGameBoard: function() {
    for (let boardSpace in boardSpaceArray) {
      boardSpaceArray[boardSpace].remove();
    }
    gameBoardDiv.remove();
    gameGridDiv.remove();
  }

};

export default gameBoardModule;