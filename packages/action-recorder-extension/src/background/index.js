function assertVisible(element) {
  if (!element || !element.offsetParent) {
    console.error(`Assertion Failed: Element ${element} is not visible`);
  }
}

function assertHidden(element) {
  if (element && element.offsetParent) {
    console.error(`Assertion Failed: Element ${element} is visible`);
  }
}

function assertEnabled(element) {
  if (element.disabled) {
    console.error(`Assertion Failed: Element ${element} is disabled`);
  }
}

function assertDisabled(element) {
  if (!element.disabled) {
    console.error(`Assertion Failed: Element ${element} is enabled`);
  }
}

function assertChecked(element) {
  if (!element.checked) {
    console.error(`Assertion Failed: Element ${element} is not checked`);
  }
}

function assertUnchecked(element) {
  if (element.checked) {
    console.error(`Assertion Failed: Element ${element} is checked`);
  }
}

function assertText(element, expectedText) {
  if (element.textContent.trim() !== expectedText.trim()) {
    console.error(
      `Assertion Failed: Element text is ${element.textContent}, expected ${expectedText}`,
    );
  }
}

function assertValue(element, expectedValue) {
  if (element.value.trim() !== expectedValue.trim()) {
    console.error(`Assertion Failed: Element value is ${element.value}, expected ${expectedValue}`);
  }
}

function assertAttribute(element, attribute, expectedValue) {
  if (element.getAttribute(attribute) !== expectedValue) {
    console.error(
      `Assertion Failed: Element attribute ${attribute} is ${element.getAttribute(attribute)}, expected ${expectedValue}`,
    );
  }
}

function assertCssProperty(element, property, expectedValue) {
  const computedStyle = getComputedStyle(element);
  if (computedStyle[property] !== expectedValue) {
    console.error(
      `Assertion Failed: Element CSS property ${property} is ${computedStyle[property]}, expected ${expectedValue}`,
    );
  }
}

function assertNetworkRequest(requestDetails) {
  // Implement logic to capture and verify network requests
}

function assertNetworkResponse(responseDetails) {
  // Implement logic to capture and verify network responses
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'replay') {
    chrome.storage.local.get('actions', ({ actions }) => {
      replayActions(actions);
    });
  }
});

function getElementFromSelectors(selectors, iframePath) {
  let doc = document;

  if (iframePath) {
    iframePath.forEach((index) => {
      const iframe = doc.querySelectorAll('iframe')[index];
      doc = iframe.contentDocument || iframe.contentWindow.document;
    });
  }

  for (let selector of selectors) {
    const element = doc.querySelector(selector);
    if (element) {
      return element;
    }
  }

  console.error('No element found for selectors:', selectors);
  return null;
}

function scrollToElement(element) {
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }
}

// Additional methods for other actions and assertions...

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'replay') {
    chrome.storage.local.get('actions', ({ actions }) => {
      try {
        replayActions(actions);
        sendResponse({ status: 'success' });
      } catch (error) {
        handleError(error);
        sendResponse({ status: 'error', error: error.message });
      }
    });
  }
  return true; // Required for asynchronous sendResponse
});

function replayActions(actions) {
  for (let action of actions) {
    try {
      executeAction(action);
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
    case 'click':
      if (!element) throw new Error('Element not found for click action');
      scrollToElement(element);
      element.click();
      break;
    case 'input':
      if (!element) throw new Error('Element not found for input action');
      scrollToElement(element);
      element.value = action.value;
      break;
    case 'keydown':
      if (!element) throw new Error('Element not found for keydown action');
      scrollToElement(element);
      simulateKeyPress(element, action.key, action.modifierKeys);
      break;
    case 'wait-timeout':
      wait(action.timeout);
      break;
    case 'check':
      if (!element) throw new Error('Element not found for check action');
      scrollToElement(element);
      if (!element.checked) element.click();
      break;
    case 'uncheck':
      if (!element) throw new Error('Element not found for uncheck action');
      scrollToElement(element);
      if (element.checked) element.click();
      break;
    // Add cases for other actions...
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

function handleError(error) {
  console.error('Execution Error:', error.message);
  alert(`Error during replay: ${error.message}`);
}

function handleActionError(action, error) {
  console.error(`Error executing action: ${action.type}`, error.message);
  alert(`Error executing action: ${action.type} - ${error.message}`);
}

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Implement and enhance other methods similarly...
