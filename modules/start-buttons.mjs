  let startButtonDiv = null;
  let onePlayerButton = null;
  let twoPlayerButton = null;

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
  
  assignStartButtonListeners: function(onePlayerFunction, twoPlayerFunction) {
    onePlayerButton.addEventListener('click', onePlayerFunction);
    twoPlayerButton.addEventListener('click', twoPlayerFunction);
  },

  removeStartButtons: function(onePlayerFunction, twoPlayerFunction) {
    onePlayerButton.removeEventListener('click', onePlayerFunction);
    twoPlayerButton.removeEventListener('click', twoPlayerFunction);
    onePlayerButton.remove();
    twoPlayerButton.remove();
    startButtonDiv.remove();
    startButtonDiv = null;
    onePlayerButton = null;
    twoPlayerButton = null;
  }
};

export default startButtonModule;