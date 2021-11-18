let headerElement = document.getElementsByClassName('card-header')[0];
let titleElement = document.getElementById('title');
let commandContainer = document.getElementById('command');
let outputContainer = document.getElementById('output');
let serverStatusContainer = document.getElementById('server-status');
let footerElement = document.getElementsByTagName('footer')[0];
let githubButton = document.getElementById('github-button');
let helperButton = document.getElementById('helper-button');
let settingsButton = document.getElementById('settings-button');
let saveCloseButton = document.getElementById('save-close-button');
let mainPage = document.getElementById('main');

let settingsPage = document.getElementById('settings');
let sudoPassField = document.getElementById('sudo-pass-field');

let onSettings = false;

settingsButton.onclick = () => {
  if (!onSettings) {
    settingsButton.classList.remove('is-info');
    settingsButton.classList.add('is-success');
    settingsButton.innerText = "Save";
    mainPage.setAttribute('hidden', true);
    settingsPage.removeAttribute('hidden');
    onSettings = true;

    chrome.storage.sync.get(null, items => {
      sudoPassField.value = items?.settings?.sudo_pass ?? '';
    });
  }
  else {
    settingsButton.classList.remove('is-success');
    settingsButton.classList.add('is-info');
    settingsButton.innerText = "Settings";
    settingsPage.setAttribute('hidden', true);
    mainPage.removeAttribute('hidden');
    onSettings = false;

    chrome.storage.sync.get(null, items => {
      if (!items.settings) items.settings = {};
      items.settings.sudo_pass = sudoPassField.value;
      chrome.storage.sync.set(items);
    });
  }
}

githubButton.onclick = () => {
  chrome.tabs.create({
    url: 'https://www.linkedin.com/in/thegeekylad/'
  });
}

helperButton.onclick = () => {
  chrome.tabs.create({
    url: 'https://www.linkedin.com/in/thegeekylad/'
  });
}

headerElement.onmouseenter = () => {
  githubButton.removeAttribute('hidden');
}
headerElement.onmouseleave = () => {
  githubButton.setAttribute('hidden', true);
}

footerElement.onmouseenter = () => {
  helperButton.removeAttribute('hidden');
}
footerElement.onmouseleave = () => {
  helperButton.setAttribute('hidden', true);
}

fetch('http://localhost:7236')
  .then(() => {
    serverStatusContainer.className = "has-text-success dead";
    serverStatusContainer.innerText = "Connected"
  }).catch(() => {
    serverStatusContainer.className = "has-text-success dead";
    serverStatusContainer.innerText = "Disconnected"
  });

chrome.storage.sync.get(null, (items) => {
  commandContainer.innerHTML = items.command;
  outputContainer.innerHTML = items.output.replace('\\n', '<br>');
});
