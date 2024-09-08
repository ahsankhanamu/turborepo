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

export const removeAttribute = (element, attributeName, onChange) => {
  try {
    attributeName = oldAttribute;
    element.removeAttribute(attributeName);
    element.style.outline = '';
  } catch (err) {
    return;
  }
};

let oldNodes = [];
let oldAttribute = '';
let allNodes = [];

export const highlightElements = (xpathOrCss, xpath, onChange) => {
  let elements;
  try {
    if (xpathOrCss.includes('xpath')) {
      elements = document.evaluate(
        xpath,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      ); //xpath
    } else {
      elements = document.querySelectorAll(xpath); //css
    }
  } catch (err) {
    if (xpath) {
      sendRuntimeMessage({ count: 'wrongXpath' });
    } else {
      sendRuntimeMessage({ count: 'blank' });
    }
    for (let i = 0; i < oldNodes.length; i++) {
      removeAttribute(oldNodes[i], xpathOrCss, onChange);
    }
    oldNodes = [];
    allNodes = [];
    return;
  }

  let totalMatchFound, node;
  if (xpathOrCss.includes('xpath')) {
    totalMatchFound = elements.snapshotLength; //xpath
  } else {
    totalMatchFound = elements.length; //css
  }
  for (let i = 0; i < oldNodes.length; i++) {
    removeAttribute(oldNodes[i], xpathOrCss, onChange);
  }
  oldNodes = [];
  allNodes = [];

  sendRuntimeMessage({ count: totalMatchFound });

  for (let i = 0; i < totalMatchFound; i++) {
    if (xpathOrCss.includes('xpath')) {
      node = elements.snapshotItem(i); //xpath
    } else {
      node = elements[i]; //css
    }
    if (
      i === 0 &&
      !(
        xpath === '/' ||
        xpath === '.' ||
        xpath === '/.' ||
        xpath === '//.' ||
        xpath === '//..'
      )
    ) {
      node.scrollIntoView(false);
    }
    oldNodes.push(node);
    oldAttribute = xpathOrCss;
    addAttribute(node, xpathOrCss, i + 1);
    allNodes.push(node.outerHTML);
  }
  sendRuntimeMessage({ count: allNodes });
};

export const createCanvasElement = (doc) => {
  if (!doc.getElementById('selectorshub-css')) {
    const styles = document.createElement('style');
    styles.innerText = `
      #selectorshub-wrapper {pointer-events: none; top: 0; position: absolute; z-index: 10000000;}
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

export const removeCanvasElement = (doc) => {
  const wrapperElement = doc.getElementById('selectorshub-wrapper');
  if (wrapperElement) {
    const parent = wrapperElement.parentNode;
    parent.removeChild(wrapperElement);
  }
};

export const isInShadow = (node) => {
  let parent = node && node.parentNode;
  while (parent) {
    if (parent.toString() === '[object ShadowRoot]') {
      shadowDOMOpenOrClosed = parent.mode.toString(); //to get open or closed shadow root
      return true;
    }
    parent = parent.parentNode;
  }
  return false;
};

let inspectorOverlays = [];

export const highlightInspectedElement = (event) => {
  const doc = event.target.ownerDocument;
  const itemStyle = event.target.getBoundingClientRect();
  const computedStyle = window.getComputedStyle(event.target, null);

  let inspectorTransparentOverlay = doc.querySelector(
    '.shub-transparent-inspector'
  );
  let inspectorVisibleOverlay = doc.querySelector('.shub-visible-inspector');
  let commentOverlay = doc.querySelector('.shub-comment-overlay');

  const item = {
    width: itemStyle.width,
    height: itemStyle.height,
    top: itemStyle.top,
    left: itemStyle.left,
    paddingTop: parseInt(computedStyle.paddingTop, 10),
    paddingRight: parseInt(computedStyle.paddingRight, 10),
    paddingBottom: parseInt(computedStyle.paddingBottom, 10),
    paddingLeft: parseInt(computedStyle.paddingLeft, 10),
  };

  const width = item.width - item.paddingRight - item.paddingLeft;
  const height = item.height - item.paddingBottom - item.paddingTop;

  inspectorTransparentOverlay.style.width = `${item.width}px`;
  inspectorTransparentOverlay.style.height = `${item.height + 2.5}px`;
  inspectorTransparentOverlay.style.left = `${item.left}px`;
  inspectorTransparentOverlay.style.top = `${item.top}px`;

  inspectorVisibleOverlay.style.width = `${width}px`;
  inspectorVisibleOverlay.style.height = `${height}px`;
  inspectorVisibleOverlay.style.left = `${item.left + item.paddingLeft}px`;
  inspectorVisibleOverlay.style.top = `${item.top + item.paddingTop}px`;

  inspectorOverlays.forEach((overlay) => {
    if (overlay.doc !== doc) {
      if (overlay.inspectorTransparentOverlay)
        overlay.inspectorTransparentOverlay.style.width = '0px';
      if (overlay.inspectorTransparentOverlay)
        overlay.inspectorTransparentOverlay.style.height = '0px';
      if (overlay.inspectorVisibleOverlay)
        overlay.inspectorVisibleOverlay.style.width = '0px';
      if (overlay.inspectorVisibleOverlay)
        overlay.inspectorVisibleOverlay.style.height = '0px';
      if (overlay.commentOverlay) overlay.commentOverlay.style.width = '0px';
      if (overlay.commentOverlay) overlay.commentOverlay.style.height = '0px';
    }
  });

  let shadowRoot;
  if (event.target.nodeName !== 'svg') {
    try {
      shadowRoot = chrome.dom.openOrClosedShadowRoot(event.target);
    } catch (_) {}
  }
  let isInsideOpenShadowRoot = isInShadow(event.target);
  commentOverlay.style.height = 'auto';
  if (shadowRoot?.mode === 'closed') {
    commentOverlay.innerText =
      "Can't inspect elements inside closed shadow root";
    commentOverlay.style.width = 'fit-content';
    commentOverlay.style.backgroundColor = '#d9433b';
    commentOverlay.style.left =
      item.left + item.paddingLeft + commentOverlay.offsetWidth >
      window.innerWidth
        ? `${
            item.left +
            item.paddingLeft +
            item.width -
            commentOverlay.offsetWidth
          }px`
        : `${item.left + item.paddingLeft}px`;
    commentOverlay.style.top =
      item.top + item.paddingTop - commentOverlay.offsetHeight < 30
        ? `${item.top + item.paddingTop + height}px`
        : `${item.top + item.paddingTop - commentOverlay.offsetHeight}px`;
  } else if (event.target.nodeName === 'IFRAME') {
    try {
      if (
        !event.target.contentDocument &&
        !event.target.contentWindow.document
      ) {
        commentOverlay.innerText = 'This element is inside cross origin iframe';
        commentOverlay.style.width = 'fit-content';
        commentOverlay.style.backgroundColor = '#d9433b';
        commentOverlay.style.left =
          item.left + item.paddingLeft + commentOverlay.offsetWidth >
          window.innerWidth
            ? `${
                item.left +
                item.paddingLeft +
                item.width -
                commentOverlay.offsetWidth
              }px`
            : `${item.left + item.paddingLeft}px`;
        commentOverlay.style.top =
          item.top + item.paddingTop - commentOverlay.offsetHeight < 30
            ? `${item.top + item.paddingTop + height}px`
            : `${item.top + item.paddingTop - commentOverlay.offsetHeight}px`;
        inspectorTransparentOverlay.style.width = `0px`;
        inspectorTransparentOverlay.style.height = `0px`;
        inspectorTransparentOverlay.style.left = `0px`;
        inspectorTransparentOverlay.style.top = `0px`;

        inspectorVisibleOverlay.style.width = `0px`;
        inspectorVisibleOverlay.style.height = `0px`;
        inspectorVisibleOverlay.style.left = `0px`;
        inspectorVisibleOverlay.style.top = `0px`;
      }
    } catch (_) {
      commentOverlay.innerText = 'This element is inside cross origin iframe';
      commentOverlay.style.width = 'fit-content';
      commentOverlay.style.backgroundColor = '#d9433b';
      commentOverlay.style.left =
        item.left + item.paddingLeft + commentOverlay.offsetWidth >
        window.innerWidth
          ? `${
              item.left +
              item.paddingLeft +
              item.width -
              commentOverlay.offsetWidth
            }px`
          : `${item.left + item.paddingLeft}px`;
      commentOverlay.style.top =
        item.top + item.paddingTop - commentOverlay.offsetHeight < 30
          ? `${item.top + item.paddingTop + height}px`
          : `${item.top + item.paddingTop - commentOverlay.offsetHeight}px`;
      inspectorTransparentOverlay.style.width = `0px`;
      inspectorTransparentOverlay.style.height = `0px`;
      inspectorTransparentOverlay.style.left = `0px`;
      inspectorTransparentOverlay.style.top = `0px`;

      inspectorVisibleOverlay.style.width = `0px`;
      inspectorVisibleOverlay.style.height = `0px`;
      inspectorVisibleOverlay.style.left = `0px`;
      inspectorVisibleOverlay.style.top = `0px`;
    }
  } else if (
    event.target.nodeName === 'svg' ||
    event.target.nodeName === 'path'
  ) {
    commentOverlay.innerText = 'This is a svg element';
    commentOverlay.style.width = 'fit-content';
    commentOverlay.style.backgroundColor = 'rgb(231, 96, 155)';
    commentOverlay.style.left =
      item.left + item.paddingLeft + commentOverlay.offsetWidth >
      window.innerWidth
        ? `${
            item.left +
            item.paddingLeft +
            item.width -
            commentOverlay.offsetWidth
          }px`
        : `${item.left + item.paddingLeft}px`;
    commentOverlay.style.top =
      item.top + item.paddingTop - commentOverlay.offsetHeight < 30
        ? `${item.top + item.paddingTop + height}px`
        : `${item.top + item.paddingTop - commentOverlay.offsetHeight}px`;
  } else if (isInsideOpenShadowRoot) {
    commentOverlay.innerText = 'This element is inside shadow dom';
    commentOverlay.style.width = 'fit-content';
    commentOverlay.style.backgroundColor = 'rgb(68, 150, 236)';
    commentOverlay.style.left =
      item.left + item.paddingLeft + commentOverlay.offsetWidth >
      window.innerWidth
        ? `${
            item.left +
            item.paddingLeft +
            item.width -
            commentOverlay.offsetWidth
          }px`
        : `${item.left + item.paddingLeft}px`;
    commentOverlay.style.top =
      item.top + item.paddingTop - commentOverlay.offsetHeight < 30
        ? `${item.top + item.paddingTop + height}px`
        : `${item.top + item.paddingTop - commentOverlay.offsetHeight}px`;
  } else if (doc.defaultView.self !== window.top) {
    commentOverlay.innerText = 'This element is inside iframe';
    commentOverlay.style.width = 'fit-content';
    commentOverlay.style.backgroundColor = 'rgb(116, 114, 114)';
    commentOverlay.style.left =
      item.left + item.paddingLeft + commentOverlay.offsetWidth >
      window.innerWidth
        ? `${
            item.left +
            item.paddingLeft +
            item.width -
            commentOverlay.offsetWidth
          }px`
        : `${item.left + item.paddingLeft}px`;
    commentOverlay.style.top =
      item.top + item.paddingTop - commentOverlay.offsetHeight < 30
        ? `${item.top + item.paddingTop + height}px`
        : `${item.top + item.paddingTop - commentOverlay.offsetHeight}px`;
  } else {
    commentOverlay.innerText = '';
    commentOverlay.style.width = '0px';
    commentOverlay.style.height = '0px';
  }
};

export const onInspectElementClickEvent = (event) => {
  const doc = event.target.ownerDocument;
  if (event.button === 2) return;
  event.preventDefault();
  event.stopPropagation();
  let node = event.target;
  this.blur();
  window.focus();

  let inspectorTransparentOverlay = doc.querySelector(
    '.shub-transparent-inspector'
  );

  inspectorTransparentOverlay.style.pointerEvents = 'auto';

  let oldInspectedElement = doc.querySelector("[shub-ins='1']");
  if (oldInspectedElement) {
    oldInspectedElement.removeAttribute('shub-ins');
  }

  let nodeMap = node.attributes;
  let attribute = document.createAttribute('shub-ins');
  attribute.value = '1';
  nodeMap.setNamedItem(attribute);
  node.setAttribute('sh-att', '1');
  _document = document;
  sendRuntimeMessage({
    action: 'select-inspected-element',
    baseUri: node.baseURI,
  });
};

export const onMouseUp = (event) => {
  const doc = event.target.ownerDocument;

  let inspectorTransparentOverlay = doc.querySelector(
    '.shub-transparent-inspector'
  );
  inspectorTransparentOverlay.style.pointerEvents = 'none';
  removeInspectListeners();
  sendRuntimeMessage({ action: 'toggle-inspector' });
};

export const onMouseOut = (event) => {
  try {
    const doc = event.target.ownerDocument || event.target;

    let inspectorTransparentOverlay = doc.querySelector(
      '.shub-transparent-inspector'
    );
    let inspectorVisibleOverlay = doc.querySelector('.shub-visible-inspector');
    let commentOverlay = doc.querySelector('.shub-comment-overlay');
    inspectorTransparentOverlay.style.width = '0px';
    inspectorVisibleOverlay.style.height = '0px';
    commentOverlay.style.height = '0px';
  } catch (_) {}
};

export const sendRuntimeMessage = (message) => {
  chrome.runtime.sendMessage(message);
};

export const onContextMenu = (event) => {
  event.preventDefault();
  sendRuntimeMessage({ action: 'toggle-inspector' });
  removeInspectListeners();
  return false;
};

let docs = [];

export const findAllDocuments = () => {
  docs = [{ doc: document, type: 'main' }];

  const recursiveFind = (doc) => {
    let elements = Array.from(doc.querySelectorAll('*')).filter(
      (i) => i.shadowRoot
    );
    elements = [...elements, ...doc.querySelectorAll('iframe')];
    elements.forEach((el) => {
      if (el.shadowRoot) {
        docs.push({ doc: el.shadowRoot, type: 'shadowRoot' });
        recursiveFind(el.shadowRoot);
      } else {
        try {
          let iframeDoc = el.contentDocument || el.contentWindow.document;
          docs.push({ doc: iframeDoc, type: 'iframe' });
          recursiveFind(iframeDoc);
        } catch (_) {
          console.log('error: ', _);
        }
      }
    });
  };

  recursiveFind(document);
};

export const addInspectListeners = () => {
  findAllDocuments();
  docs.forEach(({ doc, type }) => {
    createCanvasElement(doc);
    try {
      doc.querySelector('.shub-transparent-inspector').remove();
      doc.querySelector('.shub-visible-inspector').remove();
      doc.querySelector('.shub-comment-overlay').remove();
    } catch (_) {}

    let obj = { doc, type };
    if (doc.nodeName !== '#document-fragment') {
      let inspectorTransparentOverlay = document.createElement('div');
      let inspectorVisibleOverlay = document.createElement('div');
      let commentOverlay = document.createElement('div');

      inspectorTransparentOverlay.setAttribute(
        'class',
        'shub-transparent-inspector'
      );
      inspectorVisibleOverlay.setAttribute('class', 'shub-visible-inspector');
      commentOverlay.setAttribute('class', 'shub-comment-overlay');
      doc.body.appendChild(inspectorTransparentOverlay);
      doc.body.appendChild(inspectorVisibleOverlay);
      doc.body.appendChild(commentOverlay);

      obj = {
        ...obj,
        inspectorTransparentOverlay,
        inspectorVisibleOverlay,
        commentOverlay,
      };
    }

    inspectorOverlays.push(obj);

    doc.addEventListener('mouseover', highlightInspectedElement, true);
    doc.addEventListener('mousedown', onInspectElementClickEvent);
    doc.addEventListener('mouseup', onMouseUp);
    doc.addEventListener('mouseleave', onMouseOut);
  });
};

export const removeInspectListeners = () => {
  docs.forEach(({ doc }) => {
    removeCanvasElement(doc);

    try {
      let inspectorTransparentOverlay = doc.querySelector(
        '.shub-transparent-inspector'
      );
      let inspectorVisibleOverlay = doc.querySelector(
        '.shub-visible-inspector'
      );
      let commentOverlay = doc.querySelector('.shub-comment-overlay');

      inspectorTransparentOverlay.remove();
      inspectorVisibleOverlay.remove();
      commentOverlay.remove();
    } catch (_) {}

    inspectorOverlays = [];

    doc.removeEventListener('mouseover', highlightInspectedElement, true);
    doc.removeEventListener('mousedown', onInspectElementClickEvent);
    doc.removeEventListener('mouseup', onMouseUp);
    doc.addEventListener('mouseleave', onMouseOut);
  });
};

export const generateAbsXpath = (element) => {
  if (element.tagName.toLowerCase() === 'html') {
    return '/html[1]';
  }
  if (element.tagName.toLowerCase() === 'body') {
    return '/html[1]/body[1]';
  }

  let index = 0;
  const siblings = element.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === element) {
      if (element.tagName.toLowerCase().includes('svg')) {
        return "this node is the child of svg & svg child don't support xpath so xpath can't be generated for this element.";
      } else {
        const absXpath =
          generateAbsXpath(element.parentNode) +
          '/' +
          element.tagName.toLowerCase() +
          '[' +
          (index + 1) +
          ']';
        return absXpath;
      }
    }
    if (
      sibling.nodeType === 1 &&
      sibling.tagName.toLowerCase() === element.tagName.toLowerCase()
    ) {
      index++;
    }
  }
};

let tempXpath = '';
let indexes = [];
let matchIndex = [];

export const generateRelXpath = (element) => {
  let innerText = element.textContent.trim().slice(0, 50);
  let tagName = element.tagName.toLowerCase();
  if (tagName.includes('svg') && tempXpath) {
    tempXpath =
      "this node is the child of svg & svg child don't support xpath so xpath can't be generated for this element.";
    return tempXpath;
  }
  if (tagName.includes('svg') && !tempXpath) {
    tagName = '*';
  }

  let containsText = '';
  let equalsText = '';
  if (innerText.includes("'")) {
    containsText = `[contains(text(),"${innerText}")]`;
    equalsText = `[text()="${innerText}"]`;
  } else {
    containsText = `[contains(text(),'${innerText}')]`;
    equalsText = `[text()='${innerText}']`;
  }
  if (element.tagName.toLowerCase().includes('html')) {
    return '/html' + tempXpath;
  }
  let attribute = '';
  let attributeValue = '';

  if (element.id !== '') {
    tempXpath = `//${tagName}[@id='${element.id}']${tempXpath}`;
    const totalMatch = document.evaluate(
      tempXpath,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    ).snapshotLength;
    if (totalMatch === 1) {
      return tempXpath;
    }
  } else if (element.attributes.length !== 0) {
    for (let i = 0; i < element.attributes.length; i++) {
      attribute = element.attributes[i].name;
      attributeValue = element.attributes[i].nodeValue;
      if (
        attributeValue != null &&
        attributeValue != '' &&
        !attribute.includes('style') &&
        !attribute.includes('xpath')
      ) {
        break;
      }
    }

    if (
      attributeValue != null &&
      attributeValue != '' &&
      !attribute.includes('xpath')
    ) {
      const xpathWithoutAttribute = tempXpath;
      let xpathWithAttribute = '';
      if (attributeValue.includes("'")) {
        if (
          attributeValue.charAt(0) === ' ' ||
          attributeValue.charAt(attributeValue.length - 1) === ' '
        ) {
          xpathWithAttribute = `//${tagName}[contains(@${attribute},"${attributeValue.trim()}")]${tempXpath}`;
        } else {
          xpathWithAttribute = `//${tagName}[@${attribute}="${attributeValue}"]${tempXpath}`;
        }
      } else {
        if (
          attributeValue.charAt(0) === ' ' ||
          attributeValue.charAt(attributeValue.length - 1) === ' '
        ) {
          xpathWithAttribute = `//${tagName}[contains(@${attribute},'${attributeValue.trim()}')]${tempXpath}`;
        } else {
          xpathWithAttribute = `//${tagName}[@${attribute}='${attributeValue}']${tempXpath}`;
        }
      }

      const totalMatch = document.evaluate(
        xpathWithAttribute,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      ).snapshotLength;
      if (totalMatch === 1) {
        return xpathWithAttribute;
      } else if (innerText && element.getElementsByTagName('*').length === 0) {
        let containsXpath = xpathWithAttribute + containsText;
        const totalMatch = document.evaluate(
          containsXpath,
          document,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        ).snapshotLength;
        if (totalMatch === 0) {
          const equalsXpath = xpathWithAttribute + equalsText;
          const totalMatch = document.evaluate(
            equalsXpath,
            document,
            null,
            XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
            null
          ).snapshotLength;
          if (totalMatch === 1) {
            return equalsXpath;
          }
        } else if (totalMatch === 1) {
          return containsXpath;
        } else if (attributeValue.includes('/') || innerText.includes('/')) {
          if (attributeValue.includes('/')) {
            containsXpath = xpathWithoutAttribute + containsText;
          }
          if (innerText.includes('/')) {
            containsXpath = containsXpath.replace(containsText, '');
          }
          tempXpath = containsXpath;
        } else {
          tempXpath = containsXpath;
        }
      } else {
        tempXpath = xpathWithAttribute;
        if (attributeValue.includes('/')) {
          tempXpath = `//${tagName}${xpathWithoutAttribute}`;
        }
      }
    } else if (
      attributeValue == null ||
      attributeValue == '' ||
      attribute.includes('xpath')
    ) {
      tempXpath = `//${tagName}${tempXpath}`;
    }
    if (tagName.includes('*')) {
      tagName = ' ';
      return tempXpath;
    }
  } else if (
    attributeValue == '' &&
    innerText &&
    element.getElementsByTagName('*').length === 0
  ) {
    let containsXpath = `//${tagName}${containsText}${tempXpath}`;
    const totalMatch = document.evaluate(
      containsXpath,
      document,
      null,
      XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
      null
    ).snapshotLength;
    if (totalMatch === 0) {
      tempXpath = `//${tagName}${equalsText}${tempXpath}`;
      const totalMatch = document.evaluate(
        tempXpath,
        document,
        null,
        XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
        null
      ).snapshotLength;
      if (totalMatch === 1) {
        return tempXpath;
      }
    } else if (totalMatch === 1) {
      return containsXpath;
    } else {
      tempXpath = containsXpath;
    }
  } else {
    tempXpath = `//${tagName}${tempXpath}`;
  }

  let index = 0;
  const siblings = element.parentNode.childNodes;
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === element) {
      indexes.push(index + 1);
      tempXpath = generateRelXpath(element.parentNode);
      if (!tempXpath.includes('/')) {
        return tempXpath;
      } else {
        let totalMatch = document.evaluate(
          tempXpath,
          document,
          null,
          XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
          null
        ).snapshotLength;
        if (totalMatch === 1) {
          return tempXpath;
        } else {
          tempXpath = `/${tempXpath.replace(/\/\/+/g, '/')}`;
          const regSlash = /\/+/g;
          const regBraces = /[^[\]]+(?=])/g;
          let match;
          while ((match = regSlash.exec(tempXpath)) != null) {
            matchIndex.push(match.index);
          }
          for (let j = 0; j < indexes.length; j++) {
            if (j === 0) {
              let lastTag = tempXpath.slice(matchIndex[matchIndex.length - 1]);
              if ((match = regBraces.exec(lastTag)) != null) {
                lastTag = lastTag.replace(regBraces, indexes[j]);
                tempXpath =
                  tempXpath.slice(0, matchIndex[matchIndex.length - 1]) +
                  lastTag;
              } else {
                tempXpath = `${tempXpath}[${indexes[j]}]`;
              }
            } else {
              let lastTag = tempXpath.slice(
                matchIndex[matchIndex.length - (j + 1)],
                matchIndex[matchIndex.length - j]
              );
              if ((match = regBraces.exec(lastTag)) != null) {
                lastTag = lastTag.replace(regBraces, indexes[j]);
                tempXpath =
                  tempXpath.slice(0, matchIndex[matchIndex.length - (j + 1)]) +
                  lastTag +
                  tempXpath.slice(matchIndex[matchIndex.length - j]);
              } else {
                tempXpath = `${tempXpath.slice(
                  0,
                  matchIndex[matchIndex.length - j]
                )}[${indexes[j]}]${tempXpath.slice(
                  matchIndex[matchIndex.length - j]
                )}`;
              }
            }
            totalMatch = document.evaluate(
              tempXpath,
              document,
              null,
              XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
              null
            ).snapshotLength;
            if (totalMatch === 1) {
              const regSlashContent = /([a-zA-Z])([^/]*)/g;
              const length = tempXpath.match(regSlashContent).length;
              for (let k = j + 1; k < length - 1; k++) {
                let lastTag = tempXpath.match(/\/([^\/]+)\/?$/)[1];
                const arr = tempXpath.match(regSlashContent);
                arr.splice(length - k, 1, '/');
                let relXpath = '';
                for (let i = 0; i < arr.length; i++) {
                  if (arr[i]) {
                    relXpath = `${relXpath}/${arr[i]}`;
                  } else {
                    relXpath = `${relXpath}//${arr[i]}`;
                  }
                }
                relXpath = (relXpath + '/' + lastTag).replace(/\/\/+/g, '//');
                totalMatch = document.evaluate(
                  relXpath,
                  document,
                  null,
                  XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
                  null
                ).snapshotLength;
                if (totalMatch === 1) {
                  tempXpath = relXpath;
                }
              }
              return tempXpath.replace('//html', '');
            }
          }
        }
      }
    }
    if (
      sibling.nodeType === 1 &&
      sibling.tagName.toLowerCase() === element.tagName.toLowerCase()
    ) {
      index++;
    }
  }
};

export const getNodename = (element) => {
  let name = '',
    className;
  if (element.classList.length) {
    name = [element.tagName.toLowerCase()];
    className = element.className.trim();
    className = className.replace(/  +/g, ' ');
    name.push(className.split(' ').join('.'));
    name = name.join('.');
  }
  return name;
};

export const getChildNumber = (node) => {
  const classes = {};
  let firstClass, uniqueClasses;
  const parentNode = node.parentNode;
  const childrenLen = parentNode.children.length;
  for (let i = 0; i < childrenLen; i++) {
    if (parentNode.children[i].classList.length) {
      firstClass = parentNode.children[i].classList[0];
      if (!classes[firstClass]) {
        classes[firstClass] = [parentNode.children[i]];
      } else {
        classes[firstClass].push(parentNode.children[i]);
      }
    }
  }
  uniqueClasses = Object.keys(classes).length || -1;
  const obj = {
    childIndex: -1,
    childLen: childrenLen,
  };

  if (classes[Object.keys(classes)[0]] === childrenLen) {
    obj.childIndex = Array.prototype.indexOf.call(
      classes[node.classList[0]],
      node
    );
    obj.childLen = classes[Object.keys(classes)[0]].length;
    return obj;
  } else if (
    uniqueClasses &&
    uniqueClasses !== -1 &&
    uniqueClasses !== childrenLen
  ) {
    obj.childIndex = Array.prototype.indexOf.call(parentNode.children, node);
    obj.childLen = classes[Object.keys(classes)[0]].length;
    return obj;
  } else if (uniqueClasses === -1) {
    obj.childIndex = Array.prototype.indexOf.call(parentNode.children, node);
    obj.childLen = childrenLen;
    return obj;
  } else {
    return obj;
  }
};

export const parents = (element, array = []) => {
  let name, index;
  if (array === undefined) {
    array = [];
  } else {
    index = getChildNumber(element);
    name = getNodename(element);
    if (name) {
      if (index.childLen >= 1 && index.childIndex !== -1) {
        name += `:nth-child(${index.childIndex + 1})`;
      }
      array.push(name);
    } else if (array.length < 5) {
      name = element.tagName.toLowerCase();
      if (index.childIndex !== -1) {
        name += `:nth-child(${index.childIndex + 1})`;
      }
      array.push(name);
    }
  }
  if (element.tagName !== 'BODY') {
    return parents(element.parentNode, array);
  } else {
    return array;
  }
};

export const generateCSS = (el) => {
  if (!(el instanceof Element)) return;
  let path = parents(el, []);
  path = path.reverse();
  const lastNode = path.slice(path.length - 1, path.length);
  const _path = path.slice(0, path.length - 1);
  if (_path.length !== 0) {
    return _path.join(' ') + ' > ' + lastNode;
  } else {
    return lastNode;
  }
};
