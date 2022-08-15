let submitButton = null;
let listenerFunction = null;
let formContainer = null;
let form = null;
let playerNameContainer = null;
let playerNameLabel = null;
let playerNameInput = null;
let radioFieldset = null;
let legend = null;
let xLabel = null;
let oLabel = null;
let xButton = null;
let oButton = null;

const playerFormModule = {
  getFormContent: function() {
    let selectedLetter = null;
    if (xButton.checked) {
      selectedLetter = "X";
    }
    else {
      selectedLetter = "O";
    }
    let playerName = playerNameInput.value;
    return {playerName, selectedLetter};
  },
  addSubmitButtonListener: function(someFunction) {
    submitButton.addEventListener('click', someFunction);
    listenerFunction = someFunction;
  },
  createForm: function(player, lastPlayer) {
    formContainer = document.createElement('div');
    form = document.createElement('form');
    playerNameContainer = document.createElement('div');
    playerNameLabel = document.createElement('label');
    playerNameInput = document.createElement('input');
    radioFieldset = document.createElement('fieldset');
    legend = document.createElement('legend');
    xLabel = document.createElement('label');
    oLabel = document.createElement('label');
    xButton = document.createElement('input');
    oButton = document.createElement('input');
    submitButton = document.createElement('button');

    formContainer.classList.add('form-container');
    playerNameLabel.setAttribute('for', 'player-name');
    playerNameInput.setAttribute('type', 'text');
    playerNameInput.setAttribute('id', 'player-name');
    xLabel.setAttribute('for', 'x');
    oLabel.setAttribute('for', 'o');
    xButton.setAttribute('type', 'radio');
    xButton.setAttribute('id', 'x');
    xButton.setAttribute('name', 'player-letter');
    oButton.setAttribute('type', 'radio');
    oButton.setAttribute('id', 'o');
    oButton.setAttribute('name', 'player-letter');
    submitButton.setAttribute('type', 'button');

    playerNameLabel.textContent = `${player} Name:`;
    legend.textContent = 'Choose your letter:';
    xLabel.textContent = 'X';
    oLabel.textContent = 'O';
    submitButton.textContent= 'Submit';

    formContainer.appendChild(form);
    form.appendChild(playerNameContainer);
    form.appendChild(radioFieldset);
    form.appendChild(submitButton);
    playerNameContainer.appendChild(playerNameLabel);
    playerNameContainer.appendChild(playerNameInput);
    radioFieldset.appendChild(legend);
    radioFieldset.appendChild(xLabel);
    radioFieldset.appendChild(xButton);
    radioFieldset.appendChild(oLabel);
    radioFieldset.appendChild(oButton);
    
    if (!lastPlayer) {
      xButton.checked = true;
    }
    else if (lastPlayer.selectedLetter === 'X') {
      oButton.checked = true;
    }
    else {
      xButton.checked = true;
    }

    if (lastPlayer) {
      oButton.setAttribute('disabled', 'true');
      xButton.setAttribute('disabled', 'true');
      radioFieldset.classList.add('deactivate');
    }

    return formContainer;
  },
  destroyForm: function() {
    if (!formContainer) { return; }
    submitButton.removeEventListener('click', listenerFunction)
    
    xLabel.remove();
    oLabel.remove();
    xButton.remove();
    oButton.remove();
    legend.remove();
    radioFieldset.remove();
    playerNameLabel.remove();
    playerNameInput.remove();
    playerNameContainer.remove();
    submitButton.remove();
    form.remove();
    formContainer.remove();

    submitButton = null;
    listenerFunction = null;
    formContainer = null;
    form = null;
    playerNameContainer = null;
    playerNameLabel = null;
    playerNameInput = null;
    radioFieldset = null;
    legend = null;
    xLabel = null;
    oLabel = null;
    xButton = null;
    oButton = null;
  }
};

export default playerFormModule;