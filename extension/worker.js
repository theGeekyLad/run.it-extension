chrome.contextMenus.create({
  title: 'Run command',
  id: 'RUN_CMD',
  contexts: ['selection'],
});

// chrome.contextMenus.create({
//   title: 'It is',
//   id: 'RUN_CMD_MAIN',
//   contexts: ['selection'],
//   parentId: 'RUN_CMD',
// });

// chrome.contextMenus.create({
//   title: 'ls ...',
//   id: 'RUN_CMD_LS',
//   contexts: ['selection'],
//   parentId: 'RUN_CMD',
// });

// chrome.contextMenus.create({
//   title: 'cat ...',
//   id: 'RUN_CMD_CAT',
//   contexts: ['selection'],
//   parentId: 'RUN_CMD',
// });

chrome.contextMenus.onClicked.addListener(run_command);

function get_selection() {
  var selection = window.getSelection();
  return selection.toString();
}

async function run_command(info, tab) {
  let selected_text = "";
  try {
    var content = await chrome.scripting.executeScript({
      target: {
        tabId: tab.id
      },
      func: get_selection,
    });
    selected_text = content[0].result;
  } catch (e) {
    console.log("Using fallback method to get selected text!\n" + e.message);
    selected_text = info.selectionText;
  }

  // modifying command as required
  // selected_text = info.menuItemId === 'RUN_CMD_LS'
  //   ? 'ls ' + selected_text
  //   : info.menuItemId === 'RUN_CMD_CAT'
  //     ? 'cat ' + selected_text
  //     : selected_text;

  // chrome.notifications.create({
  //   type: "basic",
  //   title: 'Running command ...',
  //   message: selected_text,
  //   iconUrl: "./images/icon_128.png"
  // });

  chrome.storage.sync.get(null, items => {
    fetch('http://localhost:7236', {
      method: 'POST',
      body: JSON.stringify({
        command: selected_text,
        sudo_pass: items?.settings?.sudo_pass ?? ''
      })
    }).then(data => data.json()).then(result => {
      chrome.storage.sync.set(result, () => {
        chrome.notifications.create({
          type: "basic",
          title: selected_text,
          message: "Command run successfully!",
          iconUrl: "./images/icon_128.png"
        });
      });
    });
  });

  // const tag = info.menuItemId.includes('#') ? info.menuItemId.substring(info.menuItemId.indexOf('#')) : null;
  // data[note_id] = {
  //   url: info.pageUrl,
  //   text: selected_text,
  //   comments: tag,
  //   tags: [tag]
  // };
}
