import React from 'react';
import { createRoot } from 'react-dom/client';

chrome.devtools.panels.create('XPath Generator', 'icons/icon48.png', 'devtools.html', (panel) => {
  console.log('DevTools panel created.');

  panel.onShown.addListener((window) => {
    window.document.getElementById('generate-relative-xpath').addEventListener('click', () => {
      chrome.devtools.inspectedWindow.eval(
        `(${getXPath.toString()}($0))`,
        (result, isException) => {
          if (!isException) {
            console.log('Relative XPath:', result);
            chrome.runtime.sendMessage({ type: 'xpath', xpath: result });
            window.document.getElementById('output').innerText = `Relative XPath: ${result}`;
          }
        },
      );
    });

    window.document.getElementById('generate-absolute-xpath').addEventListener('click', () => {
      chrome.devtools.inspectedWindow.eval(
        `(${getAbsoluteXPath.toString()}($0))`,
        (result, isException) => {
          if (!isException) {
            console.log('Absolute XPath:', result);
            chrome.runtime.sendMessage({
              type: 'absolute-xpath',
              xpath: result,
            });
            window.document.getElementById('output').innerText = `Absolute XPath: ${result}`;
          }
        },
      );
    });
  });
});

// The function below is executed in the context of the inspected page.
/*global $0*/
const page_getProperties = function () {
  let data = window.jQuery && $0 ? jQuery.data($0) : {};
  // Make a shallow copy with a null prototype, so that sidebar does not
  // expose prototype.
  let props = Object.getOwnPropertyNames(data);
  let copy = { __proto__: null };
  for (let i = 0; i < props.length; ++i) copy[props[i]] = data[props[i]];
  return copy;
};

chrome.devtools.panels.elements.createSidebarPane(
  'jQuery Props from xpath ext',
  function (sidebar) {
    // function updateElementProperties() {
    //   sidebar.setExpression('(' + page_getProperties.toString() + ')()');
    // }
    // updateElementProperties();
    // chrome.devtools.panels.elements.onSelectionChanged.addListener(updateElementProperties);
    sidebar.setPage('sidebar.html');
    sidebar.setHeight('8ex');
  },
);

function getXPath(element) {
  if (element.id !== '') {
    return `id("${element.id}")`;
  }
  if (element === document.body) {
    return element.tagName.toLowerCase();
  }
  let ix = 0;
  const siblings = element.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === element) {
      return getXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + `[${ix + 1}]`;
    }
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++;
    }
  }
}

function getAbsoluteXPath(element) {
  if (element.tagName === 'HTML') {
    return '/html[1]';
  }
  if (element === document.body) {
    return '/html[1]/body[1]';
  }

  let ix = 0;
  const siblings = element.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === element) {
      return (
        getAbsoluteXPath(element.parentNode) + '/' + element.tagName.toLowerCase() + `[${ix + 1}]`
      );
    }
    if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
      ix++;
    }
  }
}

function Devtools() {
  return <div>This is devtools panel</div>;
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Devtools />);
