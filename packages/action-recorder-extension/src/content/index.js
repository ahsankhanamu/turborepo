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
