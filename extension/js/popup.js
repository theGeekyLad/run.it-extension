let commandContainer = document.getElementById('command');
let outputContainer = document.getElementById('output');

chrome.storage.sync.get(null, (items) => {
  commandContainer.innerHTML = items.command;
  outputContainer.innerHTML = items.output.replace('\\n', '<br>');
});
