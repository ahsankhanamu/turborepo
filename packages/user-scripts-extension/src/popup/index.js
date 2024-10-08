document.getElementById('script-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const description = document.getElementById('description').value;
  const script = document.getElementById('script').value;
  const selectedEvent = document.getElementById('event').value;
  const timestamp = new Date().toISOString(); // Get current time in UTC

  const scriptData = {
    title,
    description,
    script,
    selectedEvent,
    timestamp,
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
  };

  // Save to chrome storage
  chrome.storage.local.get({ scripts: [] }, function (data) {
    const updatedScripts = [...data.scripts, scriptData];
    chrome.storage.local.set({ scripts: updatedScripts }, function () {
      displayScripts(updatedScripts);
    });
  });

  // Clear the form
  event.target.reset();
});

function displayScripts(scripts) {
  const scriptList = document.getElementById('script-list');
  scriptList.innerHTML = ''; // Clear the list

  scripts.forEach((script) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `<strong>${script.title}</strong> - ${script.description} (Event: ${script.selectedEvent}, Time: ${script.timestamp}, Timezone: ${script.timezone})`;
    scriptList.appendChild(listItem);
  });
}

// Load saved scripts on popup open
chrome.storage.local.get({ scripts: [] }, function (data) {
  displayScripts(data.scripts);
});
