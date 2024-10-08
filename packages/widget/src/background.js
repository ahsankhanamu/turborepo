// Centralized message handler for managing widget and iframe communication
let widgetActive = false;

// Listen for messages from content scripts and iframes
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'toggleWidget') {
    widgetActive = message.widgetActive;
    sendResponse({ widgetActive });
  }

  // Handle element selections (batch them)
  if (message.type === 'elementSelected') {
    batchElementSelections(message.iframeIdentifier, message.elementHTML);
  }
});

// Batch processing for element selections
let selectionBatch = {};
function batchElementSelections(iframeIdentifier, elementHTML) {
  if (!selectionBatch[iframeIdentifier]) {
    selectionBatch[iframeIdentifier] = [];
  }

  selectionBatch[iframeIdentifier].push(elementHTML);

  if (selectionBatch[iframeIdentifier].length >= 5) {
    chrome.runtime.sendMessage({
      type: 'batchedSelections',
      iframeIdentifier: iframeIdentifier,
      elements: selectionBatch[iframeIdentifier],
    });
    selectionBatch[iframeIdentifier] = [];
  }
}

// Flush remaining batches periodically
setInterval(() => {
  Object.keys(selectionBatch).forEach((iframeIdentifier) => {
    if (selectionBatch[iframeIdentifier].length > 0) {
      chrome.runtime.sendMessage({
        type: 'batchedSelections',
        iframeIdentifier: iframeIdentifier,
        elements: selectionBatch[iframeIdentifier],
      });
      selectionBatch[iframeIdentifier] = [];
    }
  });
}, 5000);
