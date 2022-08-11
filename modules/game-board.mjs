
let gameBoardDiv = document.createElement('div');
let gameGridDiv = document.createElement('div');
let boardSpaceArray = [];
let boardButtonArray = [];
let eventFunctionArray = [];
let currentLetter = null;

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
    boardButtonArray.push(button);
    addEventListeners();
  }
}

function addEventListeners() {
  for (let button in boardButtonArray) {
    button = boardButtonArray[button];
    button.addEventListener('click', (e) => { buttonPressed(e); });
  }
}

function buttonPressed(event) { 
    let button = event.currentTarget;
    if (button.textContent) { return; }
    button.textContent = currentLetter;
    for (let eachFunction in eventFunctionArray) { 
      eventFunctionArray[eachFunction](); }
}

// Public below ==================================
let gameBoardModule = {

  createGameBoard: function() {
    gameBoardDiv.appendChild(gameGridDiv);
    addBoardSpaceDivs();
    addBoardButtons();
    return gameBoardDiv;
  },

  setCurrentLetter: function(letter) {
    currentLetter = letter;
  },

  setCurrentFunctions: function(...functions) {
    eventFunctionArray = [];
    for (let eachFunction in functions) {
      eventFunctionArray.push(functions[eachFunction]);
    }
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