let commandContainer = document.getElementById('command');
let outputContainer = document.getElementById('output');
let serverStatusContainer = document.getElementById('server-status');

fetch('http://localhost:7236')
  .then(() => {
    serverStatusContainer.className = "has-text-success linkify";
    serverStatusContainer.innerText = "Connected"
  }).catch(() => {
    serverStatusContainer.className = "has-text-danger linkify";
    serverStatusContainer.innerText = "Disconnected"
  });

chrome.storage.sync.get(null, (items) => {
  commandContainer.innerHTML = items.command;
  outputContainer.innerHTML = items.output.replace('\\n', '<br>');
});
