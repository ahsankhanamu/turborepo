const toggleButton = document.getElementById('toggleWidget');
const iframeList = document.getElementById('iframe-list');

// Update the button to reflect the widget state (active/inactive)
function updateButtonState(isActive) {
  if (isActive) {
    toggleButton.textContent = 'Deactivate Widget';
    toggleButton.style.backgroundColor = '#FF4136'; // Red for deactivate
  } else {
    toggleButton.textContent = 'Activate Widget';
    toggleButton.style.backgroundColor = '#2ECC40'; // Green for activate
  }
}

// Toggle the widget and update the button text accordingly
toggleButton.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { toggleWidget: true }, (response) => {
      // Check if the response contains the widget state
      if (response && typeof response.widgetVisible !== 'undefined') {
        updateButtonState(response.widgetVisible); // Update button based on state
      } else {
        console.error('Invalid response from content script:', response);
      }
    });
  });
});

// On popup load, query the current state of the widget and update the button
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { queryState: true }, (response) => {
    // Check if the response contains the widget state
    if (response && typeof response.widgetVisible !== 'undefined') {
      updateButtonState(response.widgetVisible); // Update button based on state
    } else {
      console.error('Failed to retrieve widget state:', response);
    }
  });
});

// Periodically update the iframe list in the popup
setInterval(() => {
  chrome.storage.local.get(['widgetStore'], (result) => {
    if (result.widgetStore) {
      const iframes = result.widgetStore.iframes;
      iframeList.innerHTML = ''; // Clear the list before updating
      Object.keys(iframes).forEach((iframe) => {
        const entry = document.createElement('div');
        entry.classList.add('iframe-entry');
        entry.textContent = `Iframe ${iframe}: ${iframes[iframe].selectedElements.length} elements selected`;
        iframeList.appendChild(entry);
      });
    }
  });
}, 1000);
