// src/xpathLibrary.js

/**
 * Generates a relative XPath for a given element.
 * @param {HTMLElement} element - The DOM element.
 * @returns {string} - The relative XPath.
 */
export function getXPath(element) {
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

/**
 * Generates an absolute XPath for a given element.
 * @param {HTMLElement} element - The DOM element.
 * @returns {string} - The absolute XPath.
 */
export function getAbsoluteXPath(element) {
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

/**
 * Highlights a given element by adding a custom attribute.
 * @param {HTMLElement} element - The DOM element.
 */
export function highlightElement(element) {
  // Remove highlight from any previously highlighted element
  // const previouslyHighlightedElement = document.querySelector(
  //   '[highlighted-element]'
  // );
  // if (previouslyHighlightedElement) {
  //   previouslyHighlightedElement.removeAttribute('highlighted-element');
  // }
  // Add the custom attribute to the new element
  // element.setAttribute('highlighted-element', 'true');
}

/**
 * Removes the highlight from a given element by removing the custom attribute.
 * @param {HTMLElement} element - The DOM element.
 */
export function unhighlightElement(element) {
  element.removeAttribute('highlighted-element');
}

/**
 * Generates a combined XPath for an element inside nested iframes.
 * @param {HTMLElement} element - The DOM element.
 * @returns {string} - The combined XPath including iframe hierarchy.
 */
export function getCombinedXPath(element) {
  const iframeHierarchy = getIframeHierarchy(element);
  let xPath = getXPath(element);

  iframeHierarchy.reverse().forEach((iframe) => {
    const iframeXPath = getXPath(iframe);
    xPath = `${iframeXPath}/${xPath}`;
  });

  return xPath;
}

/**
 * Gets the element and its XPath considering nested iframes.
 * @param {HTMLElement} element - The DOM element.
 * @returns {Object} - The element and its combined XPath.
 */
export function getElementWithXPath(element) {
  const iframeHierarchy = getIframeHierarchy(element);
  let currentWindow = window;
  let currentElement = element;

  iframeHierarchy.reverse().forEach((iframe) => {
    const index = Array.from(currentWindow.document.querySelectorAll('iframe')).indexOf(iframe);
    currentWindow = iframe.contentWindow;
    currentElement = currentWindow.document.querySelector('*[highlighted-element]');
  });

  const combinedXPath = getCombinedXPath(element);
  return { element: currentElement, combinedXPath };
}

/**
 * Scrolls the page to ensure the given element is in view.
 * @param {HTMLElement} element - The DOM element.
 */
export function scrollToElement(element) {
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

/**
 * Finds the iframe hierarchy for a given element.
 * @param {HTMLElement} element - The DOM element.
 * @returns {Array} - An array of iframe elements representing the hierarchy.
 */
export function getIframeHierarchy(element) {
  const iframes = [];
  let currentElement = element;

  while (currentElement.ownerDocument !== document) {
    const iframe = Array.from(document.querySelectorAll('iframe')).find(
      (iframe) => iframe.contentDocument === currentElement.ownerDocument,
    );
    if (!iframe) break;
    iframes.push(iframe);
    currentElement = iframe;
  }

  return iframes;
}

/**
 * Gets all nested iframes in the webpage and their relation to each other.
 * @returns {Array} - An array representing the hierarchy of iframes.
 */
export function getAllNestedIframes() {
  function getIframes(document, parentPath = '') {
    const iframes = Array.from(document.querySelectorAll('iframe'));
    const iframeHierarchy = iframes.map((iframe, index) => {
      const iframePath = `${parentPath}/iframe[${index + 1}]`;
      let nestedIframes = [];

      try {
        if (iframe.contentDocument) {
          nestedIframes = getIframes(iframe.contentDocument, iframePath);
        }
      } catch (e) {
        console.warn('Cross-origin iframe detected, skipping nested iframes');
      }

      return {
        path: iframePath,
        iframe: iframe,
        nestedIframes: nestedIframes,
      };
    });

    return iframeHierarchy;
  }

  return getIframes(document);
}
