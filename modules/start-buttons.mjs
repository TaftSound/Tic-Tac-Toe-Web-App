  let startButtonDiv = null;
  let onePlayerButton = null;
  let twoPlayerButton = null;
  let listenerFunction = null;

const startButtonModule = {
  createStartButtons: function() {
    startButtonDiv = document.createElement('div');
    onePlayerButton = document.createElement('button');
    twoPlayerButton = document.createElement('button');
  
    startButtonDiv.classList.add('start-button-container');
    onePlayerButton.textContent = 'One Player';
    twoPlayerButton.textContent = 'Two Player';
  
    startButtonDiv.appendChild(onePlayerButton);
    startButtonDiv.appendChild(twoPlayerButton);
    
    return startButtonDiv;
  },
  
  assignStartButtonListeners: function(someFunction) {
    onePlayerButton.addEventListener('click', someFunction);
    twoPlayerButton.addEventListener('click', someFunction);
    listenerFunction = someFunction;
  },

  removeStartButtons: function() {
    onePlayerButton.removeEventListener('click', listenerFunction);
    twoPlayerButton.removeEventListener('click', listenerFunction);
    onePlayerButton.remove();
    twoPlayerButton.remove();
    startButtonDiv.remove();
    startButtonDiv = null;
    onePlayerButton = null;
    twoPlayerButton = null;
  }
};

export default startButtonModule;