const iframeId = window.frameElement ? window.frameElement.id : `iframe-${Math.random()}`;

// Register iframe with the control center (main content script)
chrome.runtime.sendMessage({ type: 'registerIframe', iframeId }, (response) => {
  if (response.status === 'registered') {
    console.log(`Iframe ${iframeId} registered successfully.`);
  }
});

// Listen for actions from the control center
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'action') {
    console.log(`Received action: ${message.action}`);
    try {
      performAction(message.action, message.payload); // Your custom action handler
      sendResponse({ status: 'success' });
    } catch (error) {
      sendResponse({ status: 'error', message: error.message });
    }
  }
});

// Deregister the iframe on unload
// window.addEventListener('beforeunload', function () {
//   chrome.runtime.sendMessage({
//     type: 'deregisterIframe',
//     iframeId: iframeId,
//   });
// });

// Custom action handler
function performAction(action, payload) {
  if (action === 'scroll') {
    const targetElement = document.querySelector(payload.target);
    if (targetElement) {
      targetElement.scrollBy(0, payload.value);
    }
  }
}
