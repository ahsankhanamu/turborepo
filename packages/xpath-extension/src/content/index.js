// content.js

import {
  getElementWithXPath,
  highlightElement,
  unhighlightElement,
  scrollToElement,
  getAllNestedIframes,
} from '../utils/xpathlibrary';

document.addEventListener('click', (event) => {
  const { element, combinedXPath } = getElementWithXPath(event.target);
  console.log(combinedXPath);
  // Example usage of getAllNestedIframes
  const nestedIframes = getAllNestedIframes();
  console.log(
    'Nested iframes hierarchy:',
    JSON.stringify(nestedIframes, null, 2)
  );
  chrome.runtime.sendMessage(
    { type: 'nested-iframes', nestedIframes },
    (response) => {
      if (response.status === 'success') {
        console.log('Nested iframes sent successfully');
      }
    }
  );
  chrome.runtime.sendMessage(
    { type: 'combined-xpath', combinedXPath },
    (response) => {
      if (response.status === 'success') {
        console.log('Combined XPath sent successfully');
      }
    }
  );
});

document.addEventListener('mouseover', (event) => {
  highlightElement(event.target);
});

document.addEventListener('mouseout', (event) => {
  unhighlightElement(event.target);
});
