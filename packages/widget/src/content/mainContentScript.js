const iframeRegistry = {};

// Create the control widget UI
const widget = document.createElement('div');
widget.id = 'control-widget'; // The ID defined in the CSS
widget.innerText = 'Control Center';
document.body.appendChild(widget);

// You can add event listeners as needed
widget.addEventListener('click', () => {
  console.log('Control Center clicked');
  // Additional actions on click
});

// Monitor iframe registration messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'registerIframe') {
    iframeRegistry[message.iframeId] = { tabId: sender.tab.id, frameId: sender.frameId };
    console.log(`Iframe ${message.iframeId} registered.`);
    sendResponse({ status: 'registered' });
  }

  if (message.type === 'deregisterIframe') {
    delete iframeRegistry[message.iframeId];
    console.log(`Iframe ${message.iframeId} deregistered.`);
    sendResponse({ status: 'deregistered' });
  }
});

// Send actions to specific iframes
function sendActionToIframe(iframeId, action, payload) {
  if (iframeRegistry[iframeId]) {
    chrome.runtime.sendMessage(
      {
        type: 'sendActionToIframe',
        iframeId,
        action,
        payload,
      },
      (response) => {
        if (response.status === 'success') {
          console.log(`Action ${action} completed for iframe ${iframeId}`);
        }
      },
    );
  }
}

// UI interaction example
// widget.addEventListener('click', () => {
//   // Example action dispatch
//   const iframeId = Object.keys(iframeRegistry)[0];
//   sendActionToIframe(iframeId, 'scroll', { target: 'div#content', value: 100 });
// });

// chrome.storage.sync.get('controlCenterEnabled', (data) => {
//   const isEnabled = data.controlCenterEnabled || false;
//   toggleControlCenter(isEnabled);
// });

// // Optional function to handle Control Center toggle
// function toggleControlCenter(enabled) {
//   let widget = document.getElementById('control-widget');
//   if (enabled) {
//     if (!widget) {
//       widget = document.createElement('div');
//       widget.id = 'control-widget';
//       widget.innerText = 'Control Center';
//       document.body.appendChild(widget);
//     }
//     widget.style.display = 'block';
//   } else {
//     if (widget) widget.style.display = 'none';
//   }
// }

let isControlCenterActive = false;

// Listen for the toggle event to activate or deactivate functionality
window.addEventListener('controlCenterToggle', (event) => {
  isControlCenterActive = event.detail;
  if (isControlCenterActive) {
    enableControlCenter();
  } else {
    disableControlCenter();
  }
});

// Enable Control Center functionality
function enableControlCenter() {
  let widget = document.getElementById('control-widget');
  if (!widget) {
    widget = document.createElement('div');
    widget.id = 'control-widget';
    widget.innerText = 'Control Center';
    widget.style.position = 'fixed';
    widget.style.bottom = '10px';
    widget.style.right = '10px';
    widget.style.backgroundColor = '#333';
    widget.style.color = '#fff';
    widget.style.padding = '10px';
    widget.style.zIndex = '1000';
    widget.style.cursor = 'move';
    widget.style.willChange = 'transform'; // Optimize for movement
    widget.style.userSelect = 'none'; // Change cursor to indicate dragging

    // Add mousedown event to start dragging
    widget.addEventListener('mousedown', startDrag);

    document.body.appendChild(widget);
  }
}

// Disable Control Center functionality
function disableControlCenter() {
  const widget = document.getElementById('control-widget');
  if (widget) {
    widget.remove();
  }
}

// Optional: Check stored activation state on load
chrome.storage.sync.get('controlCenterActive', (data) => {
  if (data.controlCenterActive) {
    enableControlCenter();
  } else {
    disableControlCenter();
  }
});

// Variables for dragging logic
let offsetX = 0;
let offsetY = 0;
let isDragging = false;

function startDrag(event) {
  isDragging = true;
  offsetX = event.clientX - event.target.getBoundingClientRect().left;
  offsetY = event.clientY - event.target.getBoundingClientRect().top;

  widget.style.pointerEvents = 'none'; // Temporarily disable pointer events to prevent interference

  // Attach event listeners for dragging
  document.addEventListener('mousemove', dragWidget);
  window.addEventListener('mouseup', stopDrag); // Use window to ensure it always captures the mouseup event
  window.addEventListener('mouseleave', stopDrag); // Fallback if the cursor leaves the window
}

function dragWidget(event) {
  if (!isDragging) return;

  const widget = document.getElementById('control-widget');
  if (widget) {
    widget.style.left = `${event.clientX - offsetX}px`;
    widget.style.top = `${event.clientY - offsetY}px`;
    widget.style.bottom = 'auto'; // Reset bottom to allow free movement
    widget.style.right = 'auto'; // Reset right to allow free movement
  }
}

function stopDrag() {
  isDragging = false;
  document.removeEventListener('mousemove', dragWidget);
  document.removeEventListener('mouseup', stopDrag);

  // Apply snap-to-edge behavior
  snapToEdge();
}

function snapToEdge() {
  const widget = document.getElementById('control-widget');
  if (!widget) return;

  widget.style.pointerEvents = 'auto'; // Re-enable pointer events

  // Snap to the closest edge after dragging stops
  const widgetRect = widget.getBoundingClientRect();
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;

  // Calculate distances to each edge
  const distanceToLeft = widgetRect.left;
  const distanceToRight = windowWidth - widgetRect.right;
  const distanceToTop = widgetRect.top;
  const distanceToBottom = windowHeight - widgetRect.bottom;

  // Find the closest edge and snap to it
  const minDistance = Math.min(distanceToLeft, distanceToRight, distanceToTop, distanceToBottom);

  if (minDistance === distanceToLeft) {
    widget.style.left = '0px';
    widget.style.right = 'auto';
  } else if (minDistance === distanceToRight) {
    widget.style.left = 'auto';
    widget.style.right = '0px';
  } else if (minDistance === distanceToTop) {
    widget.style.top = '0px';
    widget.style.bottom = 'auto';
  } else if (minDistance === distanceToBottom) {
    widget.style.top = 'auto';
    widget.style.bottom = '0px';
  }
  // Reset transform after snapping
  widget.style.transform = 'none';
}
