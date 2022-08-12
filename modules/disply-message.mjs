let messageContainer = null;
let messageText = null;

const displayMessageModule = {
  displayMessage: function(message) {
    messageContainer = document.getElementsByClassName('message')[0];
    messageText = document.createElement('h3');
    messageText.textContent = message;
    messageContainer.appendChild(messageText);
  },

  removeMessage: function() {
    messageText.textContent = '';
    messageText.remove();
    messageText = null;
    messageContainer = null;
  }
};

export default displayMessageModule;