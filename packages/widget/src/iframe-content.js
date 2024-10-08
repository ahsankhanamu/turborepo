let iframeStore = { identifier: null, selectedElements: [] };

// Generate an identifier for this iframe
function generateIframeIdentifier() {
  return `iframe-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
}

// Function to initialize the iframe content script
function initializeIframeScript() {
  if (!iframeStore.identifier) {
    iframeStore.identifier = generateIframeIdentifier();
  }

  // Post a message to the top window with the iframe identifier when loaded
  window.top.postMessage(
    {
      type: 'iframeLoaded',
      iframeIdentifier: iframeStore.identifier,
    },
    '*',
  );
}

// Function to handle element selection inside an iframe
function handleElementSelection(event) {
  const element = event.target;

  // Store the selected element locally in iframeStore
  iframeStore.selectedElements.push({
    elementHTML: element.outerHTML,
    timestamp: Date.now(),
  });

  // Post the selected element along with the iframe identifier to the top window
  console.log(`Element selected in iframe ${iframeStore.identifier}:`, element.outerHTML);
  window.top.postMessage(
    {
      type: 'elementSelected',
      iframeIdentifier: iframeStore.identifier,
      elementHTML: element.outerHTML,
    },
    '*',
  );
}

// Activate element selection
function activateElementSelection() {
  console.log('Activating element selection...');
  window.addEventListener('click', handleElementSelection);
}

// Deactivate element selection
function deactivateElementSelection() {
  console.log('Deactivating element selection...');
  window.removeEventListener('click', handleElementSelection);
}

// Initialize the iframe content script when the iframe is loaded
initializeIframeScript();

// Listen for activation/deactivation messages from the top window
window.addEventListener('message', (event) => {
  const data = event.data;

  if (data.type === 'activateIframeScripts') {
    activateElementSelection(); // Activate element selection on message
  } else if (data.type === 'deactivateIframeScripts') {
    deactivateElementSelection(); // Deactivate element selection on message
  }
});
