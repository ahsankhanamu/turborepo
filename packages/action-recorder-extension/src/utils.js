function modifyAction(index) {
  chrome.storage.local.get('actions', ({ actions }) => {
    const action = actions[index];
    const newSelector = prompt('Enter new selector', action.selectors[0]);
    const iframeHandling = confirm('Is this action inside an iframe?');

    if (newSelector) {
      action.selectors[0] = newSelector;
    }

    if (iframeHandling) {
      const newIframePath = prompt(
        'Enter iframe path as comma-separated indices',
        action.iframePath ? action.iframePath.join(',') : '',
      );
      action.iframePath = newIframePath.split(',').map(Number);
    }

    chrome.storage.local.set({ actions });
    renderActions(actions);
  });
}

function simulateFileUpload(element, filePath) {
  const fileInput = document.querySelector(element);
  const file = new File(
    [
      /* data */
    ],
    filePath,
  );
  const dataTransfer = new DataTransfer();
  dataTransfer.items.add(file);
  fileInput.files = dataTransfer.files;
}

function simulateDragDrop(sourceElement, targetSelector) {
  const targetElement = document.querySelector(targetSelector);
  const dragEvent = new DragEvent('dragstart', {
    bubbles: true,
    cancelable: true,
    dataTransfer: new DataTransfer(),
  });

  sourceElement.dispatchEvent(dragEvent);

  const dropEvent = new DragEvent('drop', {
    bubbles: true,
    cancelable: true,
    dataTransfer: dragEvent.dataTransfer,
  });

  targetElement.dispatchEvent(dropEvent);
}
