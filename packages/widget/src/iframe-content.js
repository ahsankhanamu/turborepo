let iframeStore = { identifier: null, selectedElements: [] };
let elementSelectionEnabled = false;

function generateIframeIdentifier() {
  return `iframe-${Math.random().toString(36).substr(2, 9)}-${Date.now()}`;
}

function initializeIframeScript() {
  if (!iframeStore.identifier) {
    iframeStore.identifier = generateIframeIdentifier();
  }
  window.top.postMessage({ type: 'iframeLoaded', iframeIdentifier: iframeStore.identifier }, '*');
  window.top.postMessage({ type: 'queryWidgetState' }, '*');
}

function handleElementSelection(event) {
  const element = event.target;
  iframeStore.selectedElements.push({ elementHTML: element.outerHTML, timestamp: Date.now() });
  window.top.postMessage(
    {
      type: 'elementSelected',
      iframeIdentifier: iframeStore.identifier,
      elementHTML: element.outerHTML,
    },
    '*',
  );
}

function activateElementSelection() {
  if (!elementSelectionEnabled) {
    window.addEventListener('click', handleElementSelection);
    elementSelectionEnabled = true;
  }
}

function deactivateElementSelection() {
  if (elementSelectionEnabled) {
    window.removeEventListener('click', handleElementSelection);
    elementSelectionEnabled = false;
  }
}

window.addEventListener('message', (event) => {
  const data = event.data;
  if (data.type === 'activateIframeScripts') {
    activateElementSelection();
  } else if (data.type === 'deactivateIframeScripts') {
    deactivateElementSelection();
  }
});

initializeIframeScript();
