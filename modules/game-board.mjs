
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
    button.addEventListener('click', buttonPressed);
  }
}

function removeEventListeners() {
  for (let button in boardButtonArray) {
    button = boardButtonArray[button];
    button.removeEventListener('click', buttonPressed);
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

  setListenerFunctions: function(...functions) {
    eventFunctionArray = [];
    for (let eachFunction in functions) {
      eventFunctionArray.push(functions[eachFunction]);
    }
  },

  freezeBoard: function() {
    for (let button in boardButtonArray) {
      boardButtonArray[button].disabled = true;
    }
  },

  unfreezeBoard: function() {
    for (let button in boardButtonArray) {
      boardButtonArray[button].disabled = false;
    }
  },

  setAiMove: function(index) {
    boardButtonArray[index].textContent = currentLetter;
  },

  retrieveBoardState: function() {
    let boardState = [];
    for (let button in boardButtonArray) {
      boardState.push(boardButtonArray[button].textContent)
    }
    return boardState;
  },

  resetBoardState: function() {
    for (let button in boardButtonArray) {
      boardButtonArray[button].textContent = '';
    }
  },

  minimize: function() {
    gameBoardDiv.classList.add('minimize');
    this.freezeBoard();
  },

  maximize: function() {
    gameBoardDiv.classList.remove('minimize');
    this.unfreezeBoard();
  },

  destroyGameBoard: function() {
    removeEventListeners();
    for (let button in boardButtonArray) {
      boardButtonArray[button].remove();
    }
    for (let boardSpace in boardSpaceArray) {
      boardSpaceArray[boardSpace].classList.remove('board-space');
      boardSpaceArray[boardSpace].remove();
    }
    gameBoardDiv.remove();
    gameGridDiv.remove();
    boardSpaceArray = [];
    boardButtonArray = [];
    eventFunctionArray = [];
    currentLetter = null;
  }

};

export default gameBoardModule;