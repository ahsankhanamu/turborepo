export const getDocument = () => {
  let documentObject = '';
  if (document.querySelector("*[xpathtest='1']")) {
    documentObject = document;
  } else {
    try {
      getAllIframes(document);
      const allIframesLength = Object.keys(allIframes).length;
      for (let i = 0; i < allIframesLength; i++) {
        const iframe = allIframes['iframe' + i];
        for (let j = 0; j < iframe.length; j++) {
          try {
            if (
              iframe[j].contentWindow.document.querySelector("*[xpathtest='1']")
            ) {
              documentObject = iframe[j].contentWindow.document;
              frameOriframe = 'iframe';
              return;
            }
          } catch (error) {}
        }
      }
    } catch (error) {}
  }
  return documentObject;
};

export const iframeOfFrame = (element) => {
  const iframes = document.querySelectorAll('iframe');
  for (let i = 0; i < iframes.length; i++) {
    try {
      if (iframes[i].contentWindow.document === element.ownerDocument) {
        frameOriframe = 'iframe';
        return;
      }
    } catch (error) {}
  }
  const frames = document.querySelectorAll('frame');
  for (let i = 0; i < frames.length; i++) {
    try {
      if (frames[i].contentWindow.document === element.ownerDocument) {
        frameOriframe = 'frame';
        break;
      }
    } catch (error) {}
  }
};

export const isSpecialCharValidForSelector = (char) =>
  !/[~`!#$%\^&*+=\-\(\)\\';,{}|\\":<>\?]/g.test(char);

export const validAfterClosedSquare = (str) => {
  str = str.split(']');
  for (let i = 1; i <= str.length - 1; i++) {
    if (
      str[i].charAt(0) &&
      str[i].charAt(0) !== '/' &&
      str[i].charAt(0) !== '['
    ) {
      return false;
    }
  }
  return true;
};

export const errorInSelector = (type, selector) => {
  const regexAlphabet = /^[A-Za-z]+$/;
  if (selector.includes('\u201c'))
    return {
      index: 1,
      message:
        'XPath does not support tilted \u201c quote. Use vertical " quote.',
    };
  if (selector.includes('\u201d'))
    return {
      index: 2,
      message:
        'XPath does not support tilted \u201d quote. Use vertical " quote.',
    };
  if (selector.includes('\u2018'))
    return {
      index: 3,
      message:
        "XPath does not support tilted \u2018 quote. Use vertical ' quote.",
    };
  if (selector.includes('\u2019'))
    return {
      index: 4,
      message:
        "XPath does not support tilted \u2019 quote. Use vertical ' quote.",
    };
  if (
    selector.includes('///') ||
    selector.includes('////') ||
    selector.includes('/////') ||
    selector.includes('//////')
  )
    return { index: 5, message: 'more than 2 / together not allowed' };
  if (selector === '//')
    return type.includes('css')
      ? { index: 6, message: '// not allowed.' }
      : { index: 7, message: 'add tagName after //' };
  if (selector.charAt(selector.length - 1) === '/')
    return type.includes('css')
      ? { index: 8, message: 'forward slash / not allowed.' }
      : { index: 9, message: 'add tagName after forward slash /' };
  const singleQuoteCount = selector.match(/'/g)
    ? selector.match(/'/g).length
    : 0;
  if (singleQuoteCount % 2 !== 0)
    return { index: 10, message: "single quote ' missing" };
  const doubleQuoteCount = selector.match(/"/g)
    ? selector.match(/"/g).length
    : 0;
  if (doubleQuoteCount % 2 !== 0)
    return { index: 11, message: 'double quote " missing' };
  const openParenthesisCount = selector.match(/\(/g)
    ? selector.match(/\(/g).length
    : 0;
  const closeParenthesisCount = selector.match(/\)/g)
    ? selector.match(/\)/g).length
    : 0;
  if (openParenthesisCount !== closeParenthesisCount)
    return {
      index: 12,
      message:
        openParenthesisCount > closeParenthesisCount
          ? 'close parenthesis ) missing'
          : 'open parenthesis ( missing',
    };
  const openSquareBracketCount = selector.match(/\[/g)
    ? selector.match(/\[/g).length
    : 0;
  const closeSquareBracketCount = selector.match(/\]/g)
    ? selector.match(/\]/g).length
    : 0;
  if (openSquareBracketCount !== closeSquareBracketCount)
    return {
      index: 13,
      message:
        openSquareBracketCount > closeSquareBracketCount
          ? 'close square bracket ] missing'
          : 'open square bracket [ missing',
    };
  const colonCount = selector.match(/:/g) ? selector.match(/:/g).length : 0;
  if (colonCount % 2 !== 0)
    return type.includes('css')
      ? { index: 14, message: 'colon : not allowed.' }
      : { index: 15, message: 'colon : missing' };
  const squareBracketContentRegex = /[^[\]]+(?=])/g;
  if (
    selector.includes('[') &&
    selector.includes(']') &&
    !squareBracketContentRegex.exec(selector)
  )
    return { index: 16, message: 'Value inside square brackets [] missing' };
  if (
    (selector.split(']').length > 2 ||
      (selector.split(']').length === 2 && selector.split(']')[1])) &&
    !validAfterClosedSquare(selector)
  )
    return type.includes('css')
      ? { index: 17, message: 'after ] only [ allowed' }
      : { index: 17, message: 'after ] only / and [ allowed' };
  if (selector.includes('::') && !selector.split('::')[1])
    return { index: 18, message: 'tagName missing after ::' };
  if (selector.split('::')[1] && !regexAlphabet.test(selector.split('::')[1]))
    return { index: 19, message: 'only tagName allowed after ::' };
  if (selector.includes('/')) {
    selector = selector.replaceAll('//', '/');
    const parts = selector.split('/');
    for (let i = 0; i < parts.length - 1; i++) {
      if (
        parts[i] &&
        (regexAlphabet.test(parts[i].charAt(0)) ||
          parts[i].charAt(0) === '.' ||
          parts[i].charAt(0) === '*')
      )
        return '';
      if (parts[i])
        return { index: 20, message: 'after / only . * and tagname allowed' };
    }
  }
  return squareBracketContentRegex.exec(selector) &&
    ((regexAlphabet = replaceAll(
      selector,
      '[' + squareBracketContentRegex.exec(selector)[0] + ']',
      ''
    )),
    !isSpecialCharValidForSelector(regexAlphabet))
    ? { index: 21, message: 'special char not allowed outside []' }
    : selector.includes(';')
    ? { index: 22, message: 'semicolon ; not allowed' }
    : selector.includes('{') || selector.includes('}')
    ? { index: 23, message: 'curly brackets { } not allowed' }
    : selector.includes('normalise-space')
    ? {
        index: 24,
        message: "wrong spelling, use 'normalize' in place of 'normalise'",
      }
    : selector.includes('ends-with(')
    ? {
        index: 25,
        message:
          "ends-with() is XPath 2.0 function which browser doesn't support. Use XPath 1.0 functions.",
      }
    : selector.includes('upper-case(')
    ? {
        index: 26,
        message:
          "upper-case() is XPath 2.0 function which browser doesn't support. Use XPath 1.0 functions.",
      }
    : selector.includes('lower-case(')
    ? {
        index: 27,
        message:
          "lower-case() is XPath 2.0 function which browser doesn't support. Use XPath 1.0 functions.",
      }
    : selector.includes('matches(')
    ? {
        index: 28,
        message:
          "matches() is XPath 2.0 function which browser doesn't support. Use XPath 1.0 functions.",
      }
    : 'Check the syntax & spelling.';
};

export const fullFixSelector = (type, selector) => {
  let error = errorInSelector(type, selector);
  while (error.index) {
    selector = fixSelector(error.index, selector);
    error = errorInSelector(type, selector);
  }
  return selector;
};

export const replaceAll = (str, find, replace) => str.split(find).join(replace);

export const getElementsByXPath = (xpath) => {
  try {
    const elements = [];
    const result = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    );
    for (let i = 0, length = result.snapshotLength; i < length; ++i)
      elements.push(result.snapshotItem(i));
    return elements.length;
  } catch (error) {
    console.warn(error, 'NOT VALID');
  }
};

export const calculateElements = (data) => {
  data = JSON.parse(data);
  if (!data.xpath) return false;
  const count = getElementsByXPath(data.xpath);
  return count
    ? { type: 'elementsCount', id: data.id, elementCount: count }
    : false;
};

export const addInspectListeners = () => {
  document.addEventListener('mouseover', mouseOver, true);
  document.addEventListener('mouseout', mouseOut, true);
  document.addEventListener('click', clickElement, true);
};

export const removeInspectListeners = () => {
  document.removeEventListener('mouseover', mouseOver, true);
  document.removeEventListener('mouseout', mouseOut, true);
  document.removeEventListener('click', clickElement, true);
};

export const activateInspector = () => {
  inspectorActivated = true;
  addInspectListeners();
};

export const deactivateInspector = () => {
  inspectorActivated = false;
  removeInspectListeners();
};

export const createAbsXpath = (element) => {
  const nodeName = element.nodeName.toLowerCase();
  if (nodeName.includes('#comment')) {
    return [
      "This is a comment and selectors can't be generated for comment.",
      0,
    ];
  } else if (nodeName.includes('<pseudo:')) {
    return [
      "This is a pseudo element and selectors can't be generated for pseudo element.",
      0,
    ];
  } else if (nodeName.includes('#document-fragment')) {
    return [
      "This is a shadow-root and xpath can't be written for it. Please inspect an element.",
      0,
    ];
  } else if (isInShadow(element)) {
    return [
      "This element is inside Shadow DOM & for such elements XPath won't support.",
      0,
    ];
  } else if (shadowDOMOpenOrClosed.includes('closed')) {
    return [
      "This element is inside closed Shadow DOM which is inaccessible so for such elements we can't verify/write selectors.",
      0,
    ];
  }
  const xpath = buildAbsXpath(element);
  return [
    xpath,
    document.evaluate(
      xpath,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    ).snapshotLength,
  ];
};

export const buildAbsXpath = (element) => {
  if (element.nodeName.toLowerCase() === 'html') return '/html[1]';
  if (element.nodeName.toLowerCase() === 'body') return '/html[1]/body[1]';
  let siblingIndex = 0;
  const siblings = element.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    if (siblings[i] === element) {
      return `${buildAbsXpath(
        element.parentNode
      )}/${element.nodeName.toLowerCase()}[${siblingIndex + 1}]`;
    }
    if (
      siblings[i].nodeType === 1 &&
      siblings[i].nodeName.toLowerCase() === element.nodeName.toLowerCase()
    )
      siblingIndex++;
  }
};

export const createRelXpath = (element, attributes) => {
  const selectorName = createSelectorName(element);
  const cleanedSelectorName = deleteLineGap(selectorName);
  const xpath = `//*${selectorName[1]}`;
  const xpathWithoutWildcard = `${selectorName[1]}`;
  return [xpath, xpathWithoutWildcard];
};

export const createCssSelector = (element, attributes) => {
  const selectorName = createSelectorName(element);
  const cleanedSelectorName = deleteLineGap(selectorName);
  const cssSelector = `:${selectorName[1]}`;
  const cssSelectorWithoutWildcard = `${selectorName[1]}`;
  return [cssSelector, cssSelectorWithoutWildcard];
};

export const createIdSelector = (element) => {
  if (element.id && !isInShadow(element)) {
    const id = deleteLineGap(element.id);
    const xpath = `//*[@id='${id}']`;
    const count = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    ).snapshotLength;
    return [id, count];
  }
};

export const createClassNameSelector = (element) => {
  if (element.attributes['class']) {
    const className = deleteLineGap(element.attributes['class'].value);
    const cssSelector = `.${className.replace(/ /g, '.')}`;
    const count = cssSelectorMatchingNode(element, cssSelector);
    return [className, count];
  }
};

export const createNameSelector = (element) => {
  if (element.name) {
    const name = deleteLineGap(element.name);
    const cssSelector = `${element.nodeName.toLowerCase()}[name='${name}']`;
    const count = cssSelectorMatchingNode(element, cssSelector);
    return [name, count];
  }
};

export const createTagNameSelector = (element) => {
  const tagName = element.nodeName.toLowerCase();
  const cssSelector = tagName;
  const count = cssSelectorMatchingNode(element, cssSelector);
  return [tagName, count];
};

export const createTestRigorPath = (element) => {
  const selectorName = createSelectorName(element);
  const cleanedSelectorName = deleteLineGap(selectorName);
  return [`"${cleanedSelectorName}"`, 1];
};

export const createLinkTextSelector = (element) => {
  if (
    element.nodeName.toLowerCase() === 'a' &&
    !isInShadow(element) &&
    ((elementText = [].reduce
      .call(
        element.childNodes,
        (accumulatedText, childNode) =>
          accumulatedText +
          (childNode.nodeType === 3 ? childNode.textContent : ''),
        ''
      )
      .trim()),
    elementText.length !== 0)
  ) {
    let xpath = `//a[text()='${elementText}']`;
    if (elementText.includes("'")) xpath = `//a[text()="${elementText}"]`;
    const count = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    ).snapshotLength;
    return [elementText, count];
  }
};

export const createPartialLinkTextSelector = (element) => {
  if (
    element.nodeName.toLowerCase() === 'a' &&
    !isInShadow(element) &&
    ((elementText = [].reduce
      .call(
        element.childNodes,
        (accumulatedText, childNode) =>
          accumulatedText +
          (childNode.nodeType === 3 ? childNode.textContent : ''),
        ''
      )
      .trim()),
    elementText.length !== 0)
  ) {
    if (elementText.length > 5)
      elementText = elementText.slice(0, elementText.length - 2).slice(0, 20);
    let xpath = `//a[contains(text(),'${elementText}')]`;
    if (elementText.includes("'"))
      xpath = `//a[contains(text()="${elementText}")]`;
    const count = document.evaluate(
      xpath,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    ).snapshotLength;
    return [elementText, count];
  }
};

export const prepareListOfAttrText = (element) => {
  let documentObject = document;
  inspectedElement = element;
  elementInShadowDom = isInShadow(element);
  iframeOfFrame(element);
  const listOfAttrText = [];
  const xpathListOfAttrText = [];
  const cssListOfAttrText = [];
  listOfAttrText.push('z$*[shub]');
  let elementInnerText = '';
  let elementText = '';
  let cleanedInnerText = '';
  let normalizedInnerText = '';
  const nodeName = element.nodeName.toLowerCase();
  try {
    cleanedInnerText = [].reduce
      .call(
        element.childNodes,
        (accumulatedText, childNode) =>
          accumulatedText +
          (childNode.nodeType === 3 ? childNode.textContent : ''),
        ''
      )
      .trim();
    elementText = [].reduce.call(
      element.childNodes,
      (accumulatedText, childNode) =>
        accumulatedText +
        (childNode.nodeType === 3 ? childNode.textContent : ''),
      ''
    );
    normalizedInnerText = element.innerText.trim();
    normalizedInnerText = deleteLineGap(normalizedInnerText);
    normalizedInnerText =
      cleanedInnerText !== normalizedInnerText ? normalizedInnerText : '';
  } catch (error) {}
  if (!isInShadow(element)) {
    if (nodeName.includes('svg') || isSVGChild(element)) {
      xpathListOfAttrText.push(`//*[local-name()='${nodeName}']`);
      xpathListOfAttrText.push(`//*[name()='${nodeName}']`);
    } else {
      xpathListOfAttrText.push(`//${nodeName}`);
    }
    if (normalizedInnerText) {
      if (
        normalizedInnerText.includes("'") ||
        normalizedInnerText.includes('\u2019')
      ) {
        xpathListOfAttrText.push(`[text()="${normalizedInnerText}"]`);
        xpathListOfAttrText.push(
          `[starts-with(text(),"${normalizedInnerText}")]`
        );
        xpathListOfAttrText.push(`[.="${normalizedInnerText}"]`);
        xpathListOfAttrText.push(`[contains(text(),"${normalizedInnerText}")]`);
        xpathListOfAttrText.push(`[contains(.,"${normalizedInnerText}")]`);
      } else {
        xpathListOfAttrText.push(`[text()='${normalizedInnerText}']`);
        xpathListOfAttrText.push(
          `[starts-with(text(),'${normalizedInnerText}')]`
        );
        xpathListOfAttrText.push(`[.='${normalizedInnerText}']`);
        xpathListOfAttrText.push(`[contains(text(),'${normalizedInnerText}')]`);
        xpathListOfAttrText.push(`[contains(.,"${normalizedInnerText}")]`);
      }
    }
    if (cleanedInnerText) {
      if (!isNaN(cleanedInnerText))
        xpathListOfAttrText.push(`[text()=${elementText}]`);
      elementText =
        elementText.indexOf('\n') === 0 ? cleanedInnerText : elementText;
      if (
        cleanedInnerText.includes("'") ||
        cleanedInnerText.includes('\u2019')
      ) {
        xpathListOfAttrText.push(`[text()="${elementText}"]`);
        xpathListOfAttrText.push(`[starts-with(text(),"${elementText}")]`);
        xpathListOfAttrText.push(`[.="${elementText}"]`);
        xpathListOfAttrText.push(`[contains(text(),"${cleanedInnerText}")]`);
        xpathListOfAttrText.push(`[contains(.,"${cleanedInnerText}")]`);
        xpathListOfAttrText.push(`[normalize-space()="${cleanedInnerText}"]`);
        xpathListOfAttrText.push(`normalize-space()="${cleanedInnerText}"]`);
        xpathListOfAttrText.push(
          `[contains(normalize-space(),"${cleanedInnerText}")]`
        );
        xpathListOfAttrText.push(`normalize-space()='${cleanedInnerText}']`);
      } else {
        xpathListOfAttrText.push(`[text()='${cleanedInnerText}']`);
        xpathListOfAttrText.push(`[starts-with(text(),'${cleanedInnerText}')]`);
        xpathListOfAttrText.push(`[.='${cleanedInnerText}']`);
        xpathListOfAttrText.push(`[contains(text(),'${cleanedInnerText}')]`);
        xpathListOfAttrText.push(`[contains(.,"${cleanedInnerText}')]`);
        xpathListOfAttrText.push(`[normalize-space()='${cleanedInnerText}']`);
        xpathListOfAttrText.push(
          `[contains(normalize-space(),'${cleanedInnerText}')]`
        );
      }
    }
    if (element.attributes.length > 0) {
      for (let i = 0; i < element.attributes.length; i++) {
        const attributeName = element.attributes[i].name;
        const attributeValue = element.attributes[i].value;
        if (attributeArray.includes(`,with${attributeName}`)) {
          listOfAttrText.push(`[${attributeName}='${attributeValue}']`);
          xpathListOfAttrText.push(`[@${attributeName}='${attributeValue}']`);
          cssListOfAttrText.push(`[${attributeName}='${attributeValue}']`);
        }
      }
    }
  }
  return {
    idSelector: createIdSelector(element),
    classNameSelector: createClassNameSelector(element),
    nameSelector: createNameSelector(element),
    tagNameSelector: createTagNameSelector(element),
    relXpath: createRelXpath(element, listOfAttrText),
    absXpath: createAbsXpath(element),
    partialLinkTextSelector: createPartialLinkTextSelector(element),
    linkTextSelector: createLinkTextSelector(element),
    relCssSelector: createCssSelector(element, cssListOfAttrText),
    text: cleanedInnerText,
    absoluteXpath: absXpathForInspected,
  };
};

export const mouseOver = (event) => {
  const target = event.target;
  target.setAttribute('sh-att', '');
  target.style.outline = '2px solid orangered';
};

export const mouseOut = (event) => {
  const target = event.target;
  target.removeAttribute('sh-att');
  target.style.outline = '';
};

export const clickElement = (event) => {
  const target = event.target;
  inspectedElement = target;
  document.removeEventListener('mouseover', mouseOver, true);
  document.removeEventListener('mouseout', mouseOut, true);
  document.removeEventListener('click', clickElement, true);
  hubMode = 'chrome';
  absXpathForInspected = '';
  sendRuntimeMessage({
    action: 'inspect-element',
    result: prepareListOfAttrText(target),
    name: target.nodeName.toLowerCase(),
  });
  event.stopPropagation();
  event.preventDefault();
};

export const cssSelectorMatchingNode = (element, selector) => {
  try {
    return element.ownerDocument.querySelectorAll(selector).length;
  } catch (error) {
    return 0;
  }
};

export const verifyXpathSelectors = (
  type,
  element,
  value,
  onChange,
  chooseAttrs
) => {
  const selectorName = createSelectorName(element);
  const xpath = selectorName[0];
  const cssSelector = selectorName[1];
  const attributes = [];
  attributes.push({
    xpath: cssSelector,
    found: cssSelectorMatchingNode(element, cssSelector),
  });
  attributes.push({ text: deleteGarbageFromInnerText(element.text) });
  attributes.push({ parent: getSelector(element, onChange) });
  attributes.push({ ancestor: getAllAncestors(element).join(' > ') });
  attributes.push({ children: getAllChildren(element).join(' > ') });
  attributes.push({ siblings: getAllSiblings(element).join(' > ') });
  attributes.push({ descendants: getAllDescendants(element).join(' > ') });
  attributes.push({ tagName: element.nodeName.toLowerCase() });
  return attributes;
};

export const isInShadow = (element) => {
  if (element.shadowRoot) return true;
  const documentWindow = element.ownerDocument.defaultView;
  while ((element = element.parentNode)) {
    if (element === documentWindow) return false;
    if (element.shadowRoot) return true;
  }
  return false;
};

export const createSelectorName = (element) => {
  let selector = '';
  const attributes = [];
  const nodeName = element.nodeName.toLowerCase();
  if (attributeArray.includes(',withid') && element.id) {
    selector = `[@id="${element.id}"]`;
  } else {
    if (attributeArray.includes(',withclass') && element.className) {
      const classNames = element.className;
      if (classNames.includes(' ')) {
        const classArray = classNames.split(' ');
        for (let i = 0; i < classArray.length; i++) {
          attributes.push(
            `contains(concat(" ", @class, " "), " ${classArray[i]} ")`
          );
        }
      } else {
        attributes.push(`@class="${classNames}"`);
      }
    }
    if (attributeArray.includes(',withname') && element.name) {
      attributes.push(`@name="${element.name}"`);
    }
    if (attributeArray.includes(',withplaceholder') && element.placeholder) {
      attributes.push(`@placeholder="${element.placeholder}"`);
    }
    if (attributeArray.includes(',withtext') && element.text) {
      const textContent = element.text;
      if (textContent.includes(' ')) {
        const textArray = textContent.split(' ');
        for (let i = 0; i < textArray.length; i++) {
          attributes.push(`contains(text(),"${textArray[i]}")`);
        }
      } else {
        attributes.push(`text()="${textContent}"`);
      }
    }
  }
  selector = attributes.length > 0 ? `[${attributes.join(' and ')}]` : selector;
  const xpath =
    attributes.length > 0 ? `//*[${attributes.join(' and ')}]` : nodeName;
  return [xpath, selector];
};

export const deleteLineGap = (str) => {
  if (str)
    str =
      str.split('\n')[0].length > 0 ? str.split('\n')[0] : str.split('\n')[1];
  return str;
};

export const getAllIframes = (document) => {
  allDocuments.push(document);
  const iframes = document.querySelectorAll('iframe');
  for (let i = 0; i < iframes.length; i++) {
    try {
      allDocuments.push(iframes[i].contentWindow.document);
      frameOriframe = 'iframe';
    } catch (error) {}
  }
  const frames = document.querySelectorAll('frame');
  for (let i = 0; i < frames.length; i++) {
    try {
      allDocuments.push(frames[i].contentWindow.document);
      frameOriframe = 'frame';
    } catch (error) {}
  }
};

export const getPrecedingSiblings = (element) => {
  const siblings = [];
  while ((element = element.previousSibling)) {
    if (element.nodeType !== 3 && element.nodeType !== 8)
      siblings.push(element.nodeName.toLowerCase());
  }
  return siblings;
};

export const getFollowingSiblings = (element) => {
  const siblings = [];
  while ((element = element.nextSibling)) {
    if (element.nodeType !== 3 && element.nodeType !== 8)
      siblings.push(element.nodeName.toLowerCase());
  }
  return siblings;
};

export const getAllSiblings = (element) => {
  const siblings = [];
  element = element.parentNode.firstChild;
  do {
    if (element.nodeType !== 3 && element.nodeType !== 8)
      siblings.push(element.nodeName.toLowerCase());
  } while ((element = element.nextSibling));
  return siblings;
};

export const getAllAncestors = (element) => {
  const ancestors = [];
  while (
    element.parentNode &&
    element.parentNode.nodeName.toLowerCase() !== '#document' &&
    element.parentNode.nodeName.toLowerCase() !== 'html'
  ) {
    if (element.nodeType !== 3 && element.nodeType !== 8) {
      element = element.parentNode;
      ancestors.push(element.nodeName.toLowerCase());
    }
  }
  return ancestors;
};

export const getAllDescendants = (element) => {
  const descendants = element.getElementsByTagName('*');
  const descendantArray = [];
  for (let i = 0; i < descendants.length; i++) {
    if (descendants[i].nodeType !== 3 && descendants[i].nodeType !== 8)
      descendantArray.push(descendants[i].nodeName.toLowerCase());
  }
  return descendantArray;
};

export const getAllChildren = (element) => {
  const children = element.children;
  const childrenArray = [];
  for (let i = 0; i < children.length; i++) {
    if (children[i].nodeType !== 3 && children[i].nodeType !== 8)
      childrenArray.push(children[i].nodeName.toLowerCase());
  }
  return childrenArray;
};

export const containsNewLineBlankSpaceStartEnd = (str) =>
  /\r|\n/.exec(str) ||
  str.charAt(0) === ' ' ||
  str.charAt(str.length - 1) === ' ';

export const placeZerosAtEnd = (array) =>
  array.filter(isntZero).concat(array.filter(isZero));

export const isntZero = (str) =>
  str.charAt(0) === 'a' ? true : str.charAt(0) > 0;
export const isZero = (str) => str.charAt(0) === '0';

export const copyValueToClipboard = (value) => {
  const textarea = document.createElement('textarea');
  textarea.value = value;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  document.body.removeChild(textarea);
};

export const passResultsToDevtoolsScript = (type, value, xpath, onChange) => {
  if (value && xpath) {
    chrome.runtime.sendMessage({
      name: 'highlight-element',
      result: { xpathOrCss: type, val: value, xpath, onChange },
    });
  }
};

export const sendRuntimeMessage = (message) => {
  try {
    chrome.runtime.sendMessage(message);
  } catch (error) {}
};

export const checkInvalidSelector = (selector) => {
  const error = errorInSelector('css', selector);
  return { index: error.index, message: error.message };
};

export const turnOnDebugger = (debuggerTime) => {
  const debuggerFunction = (event) => {
    event.preventDefault();
    debugger;
  };
  setTimeout(() => {
    window.addEventListener('click', debuggerFunction);
    setTimeout(() => {
      window.removeEventListener('click', debuggerFunction);
    }, debuggerTime * 1000);
  }, 100);
};

// helpers.js

// Add attribute to the element
export const addAttribute = (element, attributeName, attributeValue) => {
  if (attributeName.includes('xpath')) {
    attributeName = 'xpath';
  }
  try {
    element.setAttribute(attributeName, attributeValue);
  } catch (err) {
    return;
  }
};

// Remove attribute from the element
export const removeAttribute = (element, attributeName, onChange) => {
  try {
    element.removeAttribute(attributeName);
    element.style.outline = '';
  } catch (err) {
    return;
  }
};

// Check if the node is inside a Shadow DOM
export const isInShadowDOM = (node) => {
  let parent = node && node.parentNode;
  while (parent) {
    if (parent.toString() === '[object ShadowRoot]') {
      shadowDOMOpenOrClosed = parent.mode.toString();
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
};

// Create a canvas element for highlighting
export const createCanvasElement = (doc) => {
  if (!doc.getElementById('selectorshub-css')) {
    const styles = document.createElement('style');
    styles.innerText = `
            #selectorshub-wrapper {pointer-events: none;top: 0;position: absolute;z-index: 10000000;}
            #selectorshub-canvas {position: relative;};
        `;
    styles.id = 'selectorshub-css';
    if (doc.nodeName === '#document-fragment') {
      doc.appendChild(styles);
    } else {
      document.getElementsByTagName('head')[0].appendChild(styles);
    }
  }
  if (!doc.getElementById('selectorshub-canvas')) {
    const html = "<canvas id='selectorshub-canvas' />";
    const element = document.createElement('div');
    element.setAttribute('id', 'selectorshub-wrapper');
    element.innerHTML = html;
    if (doc.nodeName === '#document-fragment') {
      doc.appendChild(element);
    } else {
      document.body.appendChild(element);
    }
  }
};

// Remove the canvas element used for highlighting
export const removeCanvasElement = (doc) => {
  const wrapperElement = doc.getElementById('selectorshub-wrapper');
  if (wrapperElement) {
    const parent = wrapperElement.parentNode;
    parent.removeChild(wrapperElement);
  }
};
