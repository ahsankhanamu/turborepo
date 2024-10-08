let actions = [];

document.addEventListener('click', (event) => handleEvent('click', event));
document.addEventListener('input', (event) => handleEvent('input', event));
document.addEventListener('keydown', (event) => handleEvent('keydown', event));

function handleEvent(type, event) {
  const element = event.target;
  const selector = getSelector(element);
  const iframePath = getIframePath(element);

  const action = {
    type,
    selectors: [selector],
    iframePath,
    value: element.value || null,
    key: event.key || null,
    modifierKeys: {
      ctrlKey: event.ctrlKey,
      shiftKey: event.shiftKey,
      altKey: event.altKey,
      metaKey: event.metaKey,
    },
    time: Date.now(),
  };

  actions.push(action);
  chrome.storage.local.set({ actions });
}

function getSelector(element) {
  // Implement a robust selector generation logic
  if (element.shadowRoot) {
    return getShadowDomSelector(element);
  }
  return (
    element.tagName.toLowerCase() +
    (element.id ? `#${element.id}` : '') +
    (element.className ? `.${element.className.split(' ').join('.')}` : '')
  );
}

function getIframePath(element) {
  let path = [];
  let currentElement = element;

  while (currentElement) {
    if (currentElement.tagName.toLowerCase() === 'iframe') {
      const iframeIndex = Array.from(document.querySelectorAll('iframe')).indexOf(currentElement);
      path.unshift(iframeIndex);
      currentElement = currentElement.ownerDocument.defaultView.frameElement;
    } else {
      currentElement = currentElement.parentElement;
    }
  }

  return path.length ? path : null;
}

function getShadowDomSelector(element) {
  let parts = [];
  let currentElement = element;

  while (currentElement && currentElement.shadowRoot) {
    parts.unshift(currentElement.tagName.toLowerCase());
    currentElement = currentElement.parentElement;
  }

  return parts.join(' > ');
}

// Add more handlers for other actions (hover, scroll, etc.)

// Content Script: contentScript.js

function executeAction(action) {
  const element = action.selectors
    ? document.querySelector(action.selectors[0]) // Example for single selector
    : null;

  if (!element && action.type !== 'scroll-page') {
    throw new Error('Element not found for action: ' + action.type);
  }

  switch (action.type) {
    case 'fill':
      scrollToElement(element);
      replayInputActionWithFocus(element, action.value);
      triggerEvent(element, 'input');
      break;

    case 'click':
      scrollToElement(element);
      element.click();
      break;

    case 'select':
      scrollToElement(element);
      const values = action.value;
      // will be an array
      selectOption(document.querySelector('#multiSelect'), values);
      triggerEvent(element, 'change');
      break;

    case 'hover':
      scrollToElement(element);
      simulateMouseHover(element);
      break;

    case 'keydown':
      scrollToElement(element);
      simulateKeyPress(element, action.key, action.modifierKeys);
      break;

    case 'checked':
      scrollToElement(element);
      if (!element.checked) element.click();
      break;

    case 'unchecked':
      scrollToElement(element);
      if (element.checked) element.click();
      break;

    case 'drag-drop':
      simulateDragDrop(element, action.targetSelector);
      break;

    case 'scroll-page':
      scrollPage(action);
      break;

    case 'scroll-into-view':
      scrollToElement(element);
      break;

    // Assertions
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

    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}

// Helper Functions

function scrollToElement(element) {
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
  } else {
    throw new Error('Element not found to scroll');
  }
}

function triggerEvent(element, eventType) {
  const event = new Event(eventType, { bubbles: true });
  element.dispatchEvent(event);
}

function replayInputActionWithFocus(element, value) {
  if (!element || (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA')) {
    throw new Error('Element is not a valid input or textarea');
  }

  // 1. Trigger the 'focus' event to simulate user clicking into the field
  const focusEvent = new Event('focus', { bubbles: true });
  element.dispatchEvent(focusEvent);

  // 2. Set the input value
  element.value = value;

  // 3. Trigger 'input' event for real-time listeners
  triggerEvent(element, 'input');

  // 4. Trigger 'blur' event to simulate user leaving the field (unfocusing)
  triggerEvent(element, 'blur');

  // 5. Trigger 'change' event to simulate form completion
  triggerEvent(element, 'change');
}

function selectSingleOption(element, value) {
  if (!element || element.tagName !== 'SELECT' || element.multiple) {
    throw new Error('Element is not a valid single-select dropdown');
  }

  let optionFound = false;

  // Iterate over the options to find the one with the given value
  for (let i = 0; i < element.options.length; i++) {
    const option = element.options[i];
    if (option.value === value || option.text === value) {
      element.selectedIndex = i;
      optionFound = true;
      break;
    }
  }

  if (!optionFound) {
    throw new Error(`Option with value "${value}" not found in single-select dropdown`);
  }

  // Trigger the change event to simulate user interaction
  const event = new Event('change', { bubbles: true });
  element.dispatchEvent(event);
}

function selectMultipleOptions(element, values) {
  if (!element || element.tagName !== 'SELECT' || !element.multiple) {
    throw new Error('Element is not a valid multi-select dropdown');
  }

  // Ensure the input values are an array
  if (!Array.isArray(values)) {
    throw new Error('Values must be an array for multi-select dropdown');
  }

  // Deselect all options first
  for (let i = 0; i < element.options.length; i++) {
    element.options[i].selected = false;
  }

  // Iterate over the options and select the ones matching the provided values
  values.forEach((value) => {
    let optionFound = false;
    for (let i = 0; i < element.options.length; i++) {
      const option = element.options[i];
      if (option.value === value || option.text === value) {
        option.selected = true;
        optionFound = true;
        break;
      }
    }

    if (!optionFound) {
      throw new Error(`Option with value "${value}" not found in multi-select dropdown`);
    }
  });

  // Trigger the change event to simulate user interaction
  const event = new Event('change', { bubbles: true });
  element.dispatchEvent(event);
}

function selectOption(element, value) {
  if (!element || element.tagName !== 'SELECT') {
    throw new Error('Element is not a valid select dropdown');
  }

  if (element.multiple) {
    // If multiple select, ensure value is an array and call multi-select handler
    if (!Array.isArray(value)) {
      throw new Error('For multi-select dropdown, value must be an array');
    }
    selectMultipleOptions(element, value);
  } else {
    // If single select, ensure value is a string and call single-select handler
    if (typeof value !== 'string') {
      throw new Error('For single-select dropdown, value must be a string');
    }
    selectSingleOption(element, value);
  }
}

function simulateMouseHover(element) {
  const event = new MouseEvent('mouseover', { bubbles: true, cancelable: true });
  element.dispatchEvent(event);
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
  const attrValue = element.getAttribute(attribute);
  if (attrValue !== expectedValue) {
    throw new Error(
      `Assertion failed: Attribute "${attribute}" does not match. Expected "${expectedValue}", got "${attrValue}"`,
    );
  }
}

function assertCssProperty(element, property, expectedValue) {
  const computedStyle = getComputedStyle(element);
  if (computedStyle[property] !== expectedValue) {
    throw new Error(
      `Assertion failed: CSS property "${property}" does not match. Expected "${expectedValue}", got "${computedStyle[property]}"`,
    );
  }
}

// Messaging (if you need to communicate with background scripts)

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action) {
    try {
      executeAction(message.action);
      sendResponse({ status: 'success' });
    } catch (error) {
      sendResponse({ status: 'error', message: error.message });
    }
  }
});

function captureUserInputWithFocusAndSubmit(element, callback) {
  if (!element || (element.tagName !== 'INPUT' && element.tagName !== 'TEXTAREA')) {
    throw new Error('Element is not a valid input or textarea');
  }

  let currentValue = '';

  // 1. Capture when the user focuses on the element
  element.addEventListener('focus', () => {
    console.log('Element focused');
  });

  // 2. Update the captured value whenever the user types
  element.addEventListener('input', () => {
    currentValue = element.value;
  });

  // 3. Capture when the user moves focus away (blur event)
  element.addEventListener('blur', () => {
    callback(currentValue);
    console.log('Element blurred, final value:', currentValue);
  });

  // 4. Capture when the user presses Enter (keydown event)
  element.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      if (element.form) {
        event.preventDefault(); // Prevent form submission initially
      }

      callback(currentValue);
      console.log('Enter pressed, final value:', currentValue);

      // 5. After capturing, manually submit the form if it exists
      if (element.form) {
        element.form.submit(); // Programmatically submit the form
      }
    }
  });
}
