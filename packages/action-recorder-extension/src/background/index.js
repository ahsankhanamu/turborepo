import {
  networkRequests,
  networkResponses,
  assertNetworkRequest,
  assertNetworkResponse,
} from './networkRequest';

// chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
//   if (message.type === 'replay') {
//     chrome.storage.local.get('actions', ({ actions }) => {
//       try {
//         replayActions(actions);
//         sendResponse({ status: 'success' });
//       } catch (error) {
//         handleError(error);
//         sendResponse({ status: 'error', error: error.message });
//       }
//     });
//   }
//   return true; // Required for asynchronous sendResponse
// });

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'replay') {
    chrome.storage.local.get('actions', ({ actions }) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.scripting.executeScript(
          {
            target: { tabId: tabs[0].id },
            func: replayActions,
            args: [actions],
          },
          (results) => {
            if (chrome.runtime.lastError) {
              handleError(new Error(chrome.runtime.lastError.message));
              sendResponse({ status: 'error', error: chrome.runtime.lastError.message });
            } else {
              sendResponse({ status: 'success' });
            }
          },
        );
      });
    });
    return true; // Keeps the message channel open for sendResponse
  }
});

chrome.webRequest.onBeforeRequest.addListener(
  (details) => {
    networkRequests.push(details);
  },
  { urls: ['<all_urls>'] },
);

chrome.webRequest.onCompleted.addListener(
  (details) => {
    networkResponses.push(details);
  },
  { urls: ['<all_urls>'] },
);

function handleError(error) {
  console.error('Execution Error:', error.message);
  logError(`Execution Error: ${error.message}`);
  alert(`Error during replay: ${error.message}`);
}

function handleActionError(action, error) {
  console.error(`Error executing action: ${action.type}`, error.message);
  logError(`Error executing action: ${action.type} - ${error.message}`);
  alert(`Error executing action: ${action.type} - ${error.message}`);
}

function logError(message) {
  chrome.storage.local.get('errorLogs', ({ errorLogs }) => {
    errorLogs = errorLogs || [];
    errorLogs.push(message);
    chrome.storage.local.set({ errorLogs });
  });
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getElementFromSelectors(selectors, iframePath) {
  let doc = document;

  if (iframePath && iframePath.length) {
    iframePath.forEach((index) => {
      const iframes = doc.querySelectorAll('iframe');
      const iframe = iframes[index];
      if (!iframe) throw new Error('Iframe not found at path: ' + iframePath);
      doc = iframe.contentDocument || iframe.contentWindow.document;
    });
  }

  let element = null;
  selectors.forEach((selector) => {
    if (!element) {
      element = doc.querySelector(selector);
    } else if (element.shadowRoot) {
      element = element.shadowRoot.querySelector(selector);
    } else {
      element = element.querySelector(selector);
    }
  });

  if (!element) throw new Error('No element found for selectors: ' + selectors.join(', '));
  return element;
}

function triggerEvent(element, eventType) {
  const event = new Event(eventType, { bubbles: true });
  element.dispatchEvent(event);
}

// scrollToElement: Scrolls the element into view
function scrollToElement(element) {
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    throw new Error('Element not found to scroll');
  }
}

// simulateMouseHover: Simulates mouse hover over an element
function simulateMouseHover(element) {
  if (element) {
    const mouseOverEvent = new MouseEvent('mouseover', {
      view: window,
      bubbles: true,
      cancelable: true,
    });
    element.dispatchEvent(mouseOverEvent);
  } else {
    throw new Error('Element not found for hover action');
  }
}

// simulateKeyPress: Simulates a keypress with optional modifiers
function simulateKeyPress(element, key, modifierKeys) {
  if (!element) throw new Error('Element not found for keypress');

  const keyDownEvent = new KeyboardEvent('keydown', {
    key: key,
    ctrlKey: modifierKeys.ctrlKey || false,
    shiftKey: modifierKeys.shiftKey || false,
    altKey: modifierKeys.altKey || false,
    metaKey: modifierKeys.metaKey || false,
    bubbles: true,
    cancelable: true,
  });

  const keyPressEvent = new KeyboardEvent('keypress', {
    key: key,
    ctrlKey: modifierKeys.ctrlKey || false,
    shiftKey: modifierKeys.shiftKey || false,
    altKey: modifierKeys.altKey || false,
    metaKey: modifierKeys.metaKey || false,
    bubbles: true,
    cancelable: true,
  });

  const keyUpEvent = new KeyboardEvent('keyup', {
    key: key,
    bubbles: true,
    cancelable: true,
  });

  element.dispatchEvent(keyDownEvent);
  element.dispatchEvent(keyPressEvent);
  element.dispatchEvent(keyUpEvent);
}

// simulateFileUpload: Simulates a file upload action
function simulateFileUpload(element, filePath) {
  return new Promise((resolve, reject) => {
    try {
      if (!element || element.type !== 'file') {
        throw new Error('Element is not a file input');
      }

      const file = new File([new Blob(['content'], { type: 'text/plain' })], filePath); // Mock file
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(file);
      element.files = dataTransfer.files;

      const event = new Event('change', { bubbles: true });
      element.dispatchEvent(event); // Trigger the change event

      resolve();
    } catch (error) {
      reject(error);
    }
  });
}

// simulateDragDrop: Simulates a drag-and-drop action between two elements
function simulateDragDrop(sourceElement, targetSelector) {
  const targetElement = document.querySelector(targetSelector);
  if (!sourceElement || !targetElement) throw new Error('Elements not found for drag and drop');

  const dataTransfer = new DataTransfer();

  const dragStartEvent = new DragEvent('dragstart', {
    bubbles: true,
    cancelable: true,
    dataTransfer: dataTransfer,
  });
  sourceElement.dispatchEvent(dragStartEvent);

  const dragEnterEvent = new DragEvent('dragenter', {
    bubbles: true,
    cancelable: true,
    dataTransfer: dataTransfer,
  });
  targetElement.dispatchEvent(dragEnterEvent);

  const dropEvent = new DragEvent('drop', {
    bubbles: true,
    cancelable: true,
    dataTransfer: dataTransfer,
  });
  targetElement.dispatchEvent(dropEvent);

  const dragEndEvent = new DragEvent('dragend', {
    bubbles: true,
    cancelable: true,
    dataTransfer: dataTransfer,
  });
  sourceElement.dispatchEvent(dragEndEvent);
}

// scrollPage: Scrolls the entire page to specified coordinates
function scrollPage(action) {
  const { x = 0, y = 0, behavior = 'smooth' } = action;
  window.scrollTo({
    top: y,
    left: x,
    behavior: behavior,
  });
}

// Assertion Functions: Throw errors if assertions fail
function assertVisible(element) {
  if (!element || !element.offsetParent) {
    throw new Error('Assertion failed: Element is not visible');
  }
}

function assertHidden(element) {
  if (element && element.offsetParent) {
    throw new Error('Assertion failed: Element is visible');
  }
}

function assertEnabled(element) {
  if (element.disabled) {
    throw new Error('Assertion failed: Element is disabled');
  }
}

function assertDisabled(element) {
  if (!element.disabled) {
    throw new Error('Assertion failed: Element is enabled');
  }
}

function assertChecked(element) {
  if (!element.checked) {
    throw new Error('Assertion failed: Element is not checked');
  }
}

function assertUnchecked(element) {
  if (element.checked) {
    throw new Error('Assertion failed: Element is checked');
  }
}

function assertText(element, expectedText) {
  if (element.textContent.trim() !== expectedText.trim()) {
    throw new Error(
      `Assertion failed: Text does not match. Expected "${expectedText}", found "${element.textContent.trim()}"`,
    );
  }
}

function assertValue(element, expectedValue) {
  if (element.value.trim() !== expectedValue.trim()) {
    throw new Error(
      `Assertion failed: Value does not match. Expected "${expectedValue}", found "${element.value.trim()}"`,
    );
  }
}

function assertAttribute(element, attribute, expectedValue) {
  if (element.getAttribute(attribute) !== expectedValue) {
    throw new Error(
      `Assertion failed: Attribute "${attribute}" does not match. Expected "${expectedValue}", found "${element.getAttribute(
        attribute,
      )}"`,
    );
  }
}

function assertCssProperty(element, property, expectedValue) {
  const computedStyle = getComputedStyle(element);
  if (computedStyle[property] !== expectedValue) {
    throw new Error(
      `Assertion failed: CSS property "${property}" does not match. Expected "${expectedValue}", found "${computedStyle[property]}"`,
    );
  }
}

async function replayActions(actions) {
  for (let action of actions) {
    try {
      await executeAction(action);
    } catch (error) {
      handleActionError(action, error);
      throw error; // Stop execution on error
    }
  }
}

function executeAction(action) {
  const element = action.selectors
    ? getElementFromSelectors(action.selectors, action.iframePath)
    : null;

  switch (action.type) {
    case 'fill':
      if (!element) throw new Error('Element not found for fill action');
      scrollToElement(element);
      element.value = action.value;
      break;
    case 'click':
      scrollToElement(element);
      element.click();
      break;
    case 'select':
      scrollToElement(element);
      element.value = action.value;
      break;
    case 'hover':
      scrollToElement(element);
      simulateMouseHover(element);
      break;
    case 'keydown':
      if (!element) throw new Error('Element not found for keydown action');
      scrollToElement(element);
      simulateKeyPress(element, action.key, action.modifierKeys);
      break;
    case 'checked':
      if (!element) throw new Error('Element not found for checked action');
      scrollToElement(element);
      if (!element.checked) element.click();
      break;
    case 'unchecked':
      scrollToElement(element);
      if (element.checked) {
        element.click();
      }
      break;
    case 'file-upload':
      scrollToElement(element);
      simulateFileUpload(element, action.filePath);
      break;
    case 'drag-drop':
      scrollToElement(element);
      simulateDragDrop(element, action.targetSelector);
      break;
    case 'scroll-page':
      scrollPage(action);
      break;
    case 'scroll-into-view':
      scrollToElement(element);
      break;
    case 'wait-timeout':
      wait(action.timeout);
      break;
    case 'assert-visible':
      scrollToElement(element);
      assertVisible(element);
      break;
    case 'assert-hidden':
      scrollToElement(element);
      assertHidden(element);
      break;
    case 'assert-enabled':
      scrollToElement(element);
      assertEnabled(element);
      break;
    case 'assert-disabled':
      scrollToElement(element);
      assertDisabled(element);
      break;
    case 'assert-checked':
      scrollToElement(element);
      assertChecked(element);
      break;
    case 'assert-unchecked':
      scrollToElement(element);
      assertUnchecked(element);
      break;
    case 'assert-text':
      scrollToElement(element);
      assertText(element, action.value);
      break;
    case 'assert-value':
      scrollToElement(element);
      assertValue(element, action.value);
      break;
    case 'assert-attribute':
      scrollToElement(element);
      assertAttribute(element, action.attribute, action.value);
      break;
    case 'assert-css':
      scrollToElement(element);
      assertCssProperty(element, action.property, action.value);
      break;
    case 'assert-network-request':
      assertNetworkRequest(action.requestDetails);
      break;
    case 'assert-network-response':
      assertNetworkResponse(action.responseDetails);
      break;
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// Implement and enhance other methods similarly...
