

const playerFormModule = {
  createForm: function(player) {
    const formContainer = document.createElement('div');
    const form = document.createElement('form');
    const playerNameContainer = document.createElement('div');
    const playerNameLabel = document.createElement('label');
    const playerNameInput = document.createElement('input');
    const radioFieldset = document.createElement('fieldset');
    const legend = document.createElement('legend');
    const xLabel = document.createElement('label');
    const oLabel = document.createElement('label');
    const xButton = document.createElement('input');
    const oButton = document.createElement('input');
    const submitButton = document.createElement('button');

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

    playerNameLabel.textContent = `Player ${player} Name:`;
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

    return formContainer;
  }
};

export default playerFormModule;