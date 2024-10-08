let widgetStore = { iframes: {} }; // Store for widget state and iframe data
let widgetVisible = false; // State variable to track widget visibility

// Save the widget store to Chrome's local storage
function persistWidgetStore() {
  chrome.storage.local.set({ widgetStore, widgetVisible }, () => {
    console.log('Widget store and visibility persisted.');
  });
}

// Restore the widget store and widget visibility from Chrome's local storage
function restoreWidgetStore() {
  chrome.storage.local.get(['widgetStore', 'widgetVisible'], (result) => {
    if (result.widgetStore) {
      widgetStore = result.widgetStore;
      console.log('Widget store restored:', widgetStore);
    }
    if (result.widgetVisible) {
      widgetVisible = result.widgetVisible;
      if (widgetVisible) {
        window.dispatchEvent(new CustomEvent('showWidget')); // Re-show the widget if it was active
        window.postMessage({ type: 'activateIframeScripts' }, '*'); // Reactivate iframes if necessary
      }
    }
  });
}

// Toggle the widget visibility and send activation/deactivation signals to iframes
function toggleWidget() {
  if (widgetVisible) {
    window.postMessage({ type: 'deactivateIframeScripts' }, '*'); // Deactivate iframes
    window.dispatchEvent(new CustomEvent('removeWidget')); // Remove widget from top window
    widgetVisible = false;
  } else {
    window.postMessage({ type: 'activateIframeScripts' }, '*'); // Activate iframes
    window.dispatchEvent(new CustomEvent('showWidget')); // Show widget in top window
    widgetVisible = true;
  }

  // Persist the widget state after toggling
  persistWidgetStore();

  // Return the current state of the widget (visible or not)
  return widgetVisible;
}

// Handle messages from the popup and respond with the current widget state
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.toggleWidget) {
    const currentWidgetState = toggleWidget(); // Toggle the widget and return the new state
    sendResponse({ widgetVisible: currentWidgetState }); // Send back the widget state
  } else if (request.queryState) {
    sendResponse({ widgetVisible }); // Send back the current widget state without toggling
  } else if (request.clearStorage) {
    // Clear the in-memory widget store and reset all iframes
    widgetStore = { iframes: {} };
    window.postMessage({ type: 'deactivateIframeScripts' }, '*'); // Deactivate iframes
    console.log('Widget store and iframe data cleared.');
    persistWidgetStore(); // Ensure the storage is cleared
    sendResponse({ success: true }); // Confirm storage is cleared
  }
});

// Listen for iframe messages (e.g., iframe loaded, element selection)
window.addEventListener('message', (event) => {
  const data = event.data;

  // Handle iframe identifier when an iframe is loaded
  if (data.type === 'iframeLoaded') {
    const { iframeIdentifier } = data;
    if (!widgetStore.iframes[iframeIdentifier]) {
      widgetStore.iframes[iframeIdentifier] = { selectedElements: [] };
    }

    // If the widget is already visible, activate the iframe
    if (widgetVisible) {
      event.source.postMessage({ type: 'activateIframeScripts' }, '*');
    }
  }

  // Handle element selection messages from iframes
  if (data.type === 'elementSelected') {
    const { iframeIdentifier, elementHTML } = data;
    if (widgetStore.iframes[iframeIdentifier]) {
      widgetStore.iframes[iframeIdentifier].selectedElements.push({
        elementHTML,
        timestamp: Date.now(),
      });
      console.log(`Element selected from iframe ${iframeIdentifier}:`, elementHTML);
      console.log('Updated widgetStore:', widgetStore); // Show the updated widgetStore
    }
    persistWidgetStore(); // Persist the store after selection
  }
});

// Restore the widget store and widget visibility when the script is loaded
restoreWidgetStore();
