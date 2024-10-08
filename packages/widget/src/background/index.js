const iframeRegistry = {}; // Global registry for iframes

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'sendActionToIframe') {
    const iframeInfo = iframeRegistry[message.iframeId];
    if (iframeInfo) {
      chrome.tabs.sendMessage(
        iframeInfo.tabId,
        {
          type: 'action',
          action: message.action,
          iframeId: message.iframeId,
          payload: message.payload,
        },
        (response) => sendResponse(response),
      );
    } else {
      console.error(`Iframe with ID ${message.iframeId} not found in registry.`);
      sendResponse({ status: 'error', message: `Iframe with ID ${message.iframeId} not found` });
    }
  }
  if (message.type === 'registerIframe') {
    iframeRegistry[message.iframeId] = { tabId: sender.tab.id, frameId: sender.frameId };
    console.log(`Iframe ${message.iframeId} registered.`);
    sendResponse({ status: 'success', iframeId: message.iframeId });
  }

  if (message.type === 'deregisterIframe') {
    delete iframeRegistry[message.iframeId];
    console.log(`Iframe ${message.iframeId} deregistered.`);
    sendResponse({ status: 'success' });
  }

  if (message.type === 'toggleControlCenter') {
    const { active } = message;

    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        // Only inject if the URL is accessible
        if (
          tab.url &&
          !tab.url.startsWith('chrome://') &&
          !tab.url.startsWith('edge://') &&
          !tab.url.startsWith('about:') &&
          !tab.url.startsWith('file://')
        ) {
          chrome.scripting
            .executeScript({
              target: { tabId: tab.id },
              func: (isActive) => {
                window.dispatchEvent(new CustomEvent('controlCenterToggle', { detail: isActive }));
              },
              args: [active],
            })
            .catch((error) => {
              console.error(
                `Failed to inject script on tab ${tab.id} (${tab.url}): ${error.message}`,
              );
            });
        }
      });
    });

    sendResponse({ status: active ? 'activated' : 'deactivated' });
  }
});

// The function to be injected to enable/disable the Control Center in main content
function toggleControlCenter(enabled) {
  if (enabled) {
    if (!document.getElementById('control-widget')) {
      const widget = document.createElement('div');
      widget.id = 'control-widget';
      widget.innerText = 'Control Center';
      widget.style.display = 'block';
      document.body.appendChild(widget);
    }
  } else {
    const widget = document.getElementById('control-widget');
    if (widget) {
      widget.style.display = 'none';
    }
  }
}
