const toggleButton = document.getElementById('toggleWidget');
const clearStorageButton = document.getElementById('clearStorage');
const iframeList = document.getElementById('iframe-list');

// Update the button to reflect the widget state (active/inactive)
function updateButtonState(isActive) {
  if (toggleButton) {
    if (isActive) {
      toggleButton.textContent = 'Deactivate Widget';
      toggleButton.style.backgroundColor = '#FF4136'; // Red for deactivate
    } else {
      toggleButton.textContent = 'Activate Widget';
      toggleButton.style.backgroundColor = '#2ECC40'; // Green for activate
    }
  }
}

// Update the iframe list and selected elements dynamically
function updateIframeList(iframes) {
  if (iframeList) {
    iframeList.innerHTML = ''; // Clear the list before updating

    Object.keys(iframes).forEach((iframe) => {
      const entry = document.createElement('div');
      entry.classList.add('iframe-entry');

      // Create iframe title
      const iframeTitle = document.createElement('h4');
      iframeTitle.textContent = `Iframe ${iframe}`;
      entry.appendChild(iframeTitle);

      // List of selected elements for the iframe
      const elementList = document.createElement('ul');
      elementList.classList.add('element-list');
      iframes[iframe].selectedElements.forEach((element, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `Element ${index + 1}: ${element.elementHTML}`;
        elementList.appendChild(listItem);
      });

      if (iframes[iframe].selectedElements.length === 0) {
        const noElementsMessage = document.createElement('p');
        noElementsMessage.textContent = 'No elements selected yet.';
        elementList.appendChild(noElementsMessage);
      }

      entry.appendChild(elementList);
      iframeList.appendChild(entry);
    });
  }
}

// Toggle the widget state and update the button text accordingly
toggleButton.addEventListener('click', () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, { toggleWidget: true }, (response) => {
      if (response && typeof response.widgetVisible !== 'undefined') {
        updateButtonState(response.widgetVisible); // Update button based on state
      } else {
        console.error('Invalid response from content script:', response);
      }
    });
  });
});

// Clear the widget store (iframe and element data)
clearStorageButton.addEventListener('click', () => {
  // Clear the local storage in Chrome
  chrome.storage.local.clear(() => {
    console.log('Storage cleared.');

    // Clear the displayed iframe list in the popup
    iframeList.innerHTML = '';

    // Notify content scripts to reset their in-memory store
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { clearStorage: true }, (response) => {
        console.log('Content script storage cleared:', response);
      });
    });
  });
});

// On popup load, query the current state of the widget and update the button
chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
  chrome.tabs.sendMessage(tabs[0].id, { queryState: true }, (response) => {
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
      updateIframeList(iframes);
    }
  });
}, 1000);
