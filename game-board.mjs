let content = document.querySelector('.content');
let gameBoardDiv = document.createElement('div');
let gameGridDiv = document.createElement('div');
let gameGridArray = [];

gameBoardDiv.classList.add('board');
gameGridDiv.classList.add('game-grid');


export default function assembleGameBoard() {
  content.appendChild(gameBoardDiv);
  gameBoardDiv.appendChild(gameGridDiv);

  for (let i = 0; i < 9; i++) {
    let newBoardSpaceDiv = document.createElement('div');
    newBoardSpaceDiv.classList.add('board-space');
    gameGridDiv.appendChild(newBoardSpaceDiv);
  }
  console.log(content);
}