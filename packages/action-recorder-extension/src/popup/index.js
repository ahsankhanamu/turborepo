// Popup Script (popup.js) - Displaying Logs
document.addEventListener('DOMContentLoaded', displayLogs);

// Listen for log updates
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'log-error') {
    displayLogs();
  }
});

chrome.storage.local.get('actions', ({ actions }) => {
  renderActions(actions || []);
});

// Function to display logs
function displayLogs() {
  chrome.storage.local.get('errorLogs', ({ errorLogs }) => {
    const errorLogsList = document.getElementById('error-logs');
    errorLogsList.innerHTML = '';
    (errorLogs || []).forEach((log) => {
      const li = document.createElement('li');
      li.textContent = log;
      errorLogsList.appendChild(li);
    });
  });
}

document.getElementById('start-recording').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'start-recording' });
});

document.getElementById('stop-recording').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'stop-recording' });
});

document.getElementById('replay').addEventListener('click', () => {
  chrome.runtime.sendMessage({ type: 'replay' });
});

document.getElementById('assert-visible').addEventListener('click', () => {
  addAssertion('visible');
});

document.getElementById('assert-hidden').addEventListener('click', () => {
  addAssertion('hidden');
});

document.getElementById('assert-text').addEventListener('click', () => {
  addAssertion('text');
});

document.getElementById('assert-value').addEventListener('click', () => {
  addAssertion('value');
});

document.getElementById('assert-attribute').addEventListener('click', () => {
  addAssertion('attribute');
});

function addAssertion(type) {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabs[0].id },
        function: () => {
          const element = document.activeElement;
          const selector = getSelector(element);
          return { selector, type, value: element.value };
        },
      },
      (results) => {
        const result = results[0].result;
        const assertion = {
          type: `assert-${type}`,
          selectors: [result.selector],
          value: result.value || null,
        };
        saveAction(assertion);
      },
    );
  });
}

function renderActions(actions) {
  const actionsList = document.getElementById('actions-list');
  actionsList.innerHTML = '';
  actions.forEach((action, index) => {
    const li = document.createElement('li');
    li.classList.add('action-item');

    li.innerHTML = `
      <span>${index + 1}: ${action.type} on ${action.selectors.join(', ')}</span>
      <div class="action-buttons">
        <button onclick="modifyAction(${index})">Edit</button>
        <button onclick="deleteAction(${index})">Delete</button>
        <button onclick="addSelector(${index})">Add Selector</button>
      </div>
    `;
    actionsList.appendChild(li);
  });
}

function saveAction(action) {
  chrome.storage.local.get('actions', ({ actions }) => {
    actions = actions || [];
    actions.push(action);
    chrome.storage.local.set({ actions });
    renderActions(actions);
  });
}

function modifyAction(index) {
  chrome.storage.local.get('actions', ({ actions }) => {
    const action = actions[index];
    const newSelector = prompt('Enter new selector', action.selectors[0]);
    if (newSelector) {
      action.selectors[0] = newSelector;
      chrome.storage.local.set({ actions });
      renderActions(actions);
    }
  });
}

function deleteAction(index) {
  chrome.storage.local.get('actions', ({ actions }) => {
    actions.splice(index, 1);
    chrome.storage.local.set({ actions });
    renderActions(actions);
  });
}

function addSelector(index) {
  chrome.storage.local.get('actions', ({ actions }) => {
    const newSelector = prompt('Enter additional selector');
    if (newSelector) {
      actions[index].selectors.push(newSelector);
      chrome.storage.local.set({ actions });
      renderActions(actions);
    }
  });
}

function getSelector(element) {
  // Implement a robust selector generation logic
  return '...';
}

function addCheckAction() {
  const selector = prompt('Enter selector for checkbox or radio button to check:');
  saveAction({ type: 'check', selectors: [selector] });
}

function addUncheckAction() {
  const selector = prompt('Enter selector for checkbox or radio button to uncheck:');
  saveAction({ type: 'uncheck', selectors: [selector] });
}

function addWaitTimeoutAction() {
  const timeout = prompt('Enter wait timeout in milliseconds:');
  if (timeout) {
    saveAction({ type: 'wait-timeout', timeout: parseInt(timeout, 10) });
  }
}

// UI logic for managing actions...
