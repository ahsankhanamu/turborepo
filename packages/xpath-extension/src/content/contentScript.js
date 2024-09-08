import {
  getDocument,
  getAllDocument,
  iframeOfFrame,
  isSpecialCharValidForSelector,
  validAfterClosedSquare,
  errorInSelector,
  fullFixSelector,
  replaceAll,
  getElementsByXPath,
  calculateElements,
  addInspectListeners,
  removeInspectListeners,
  activateInspector,
  deactivateInspector,
  createAbsXpath,
  createRelXpath,
  createCssSelector,
  createIdSelector,
  createClassNameSelector,
  createNameSelector,
  createTagNameSelector,
  createTestRigorPath,
  createLinkTextSelector,
  createPartialLinkTextSelector,
  prepareListOfAttrText,
  mouseOver,
  mouseOut,
  clickElement,
  cssSelectorMatchingNode,
  verifyXpathSelectors,
  isInShadow,
  createSelectorName,
  deleteLineGap,
  getAllIframes,
  getPrecedingSiblings,
  getFollowingSiblings,
  getAllSiblings,
  getAllAncestors,
  getAllDescendants,
  getAllChildren,
  containsNewLineBlankSpaceStartEnd,
  placeZerosAtEnd,
  isntZero,
  isZero,
  copyValueToClipboard,
  passResultsToDevtoolsScript,
  sendRuntimeMessage,
  checkInvalidSelector,
  turnOnDebugger,
} from './helpers.js';

let inputText = '';
let recorderActive = false;
let frameOriframe = '';

const isFirefox = typeof InstallTrigger !== 'undefined';
const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
const attributeArray = ',withid,withclass,withname,withplaceholder,withtext';
let oldNodes = [];
let oldAttribute = '';
let allNodes = [];
let idChecked = '';
const pageUrl = 'websiteUrl-' + document.URL;
let inspectedElement = '';
let elementInShadowDom = '';
let element = '';
let suggestedFlag = false;
let allDocuments = [];
let documentIframes = [];
let contextElement = null;
let contextSelectors = [];
let rightClickFunction = '';
let buildContextMenuResultFunction = '';
let generateContextMenu = false;
let contextMenu = 'active';
let hubMode = '';
let absXpathForInspected = '';

setTimeout(() => {
  if (
    pageUrl.includes('https://docs.google.com/forms/') ||
    pageUrl.includes('https://docs.google.com/document/') ||
    (!pageUrl.includes('https://docs.google.com/') &&
      !pageUrl.includes('https://drive.google.com/'))
  ) {
    chrome.storage.local.get('contextMenu', (storage) => {
      contextMenu = storage.contextMenu ? storage.contextMenu : 'active';
      if (contextMenu.includes('inactive')) {
        buildContextMenuResultFunction();
      }
    });
  }
  rightClickFunction = (event) => {
    try {
      contextSelectors = [];
      const target = event.composedPath()[0];
      createSelectorsForContextMenu(target);
    } catch (error) {
      console.log(error);
    }
  };
  getAllDocument();
  if (isSafari)
    document.addEventListener('contextmenu', rightClickFunction, true);
  buildContextMenuResultFunction = () => {
    for (let i = 0; i < allDocuments.length; i++) {
      allDocuments[i].addEventListener('contextmenu', rightClickFunction, true);
    }
  };
}, 1000);

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.name && message.name.includes('copy')) {
    const name = message.name;
    const value = name.includes('relXpath')
      ? contextSelectors[0]
      : name.includes('relCssSelector')
      ? contextSelectors[1]
      : name.includes('jspath')
      ? contextSelectors[2]
      : name.includes('testRigor')
      ? contextSelectors[4]
      : name.includes('abs')
      ? contextSelectors[3]
      : name.includes('id')
      ? contextSelectors[5]
      : name.includes('name')
      ? contextSelectors[6]
      : contextSelectors[4];
    if (value) copyValueToClipboard(value);
  }
  if (message.name === 'activate-inspector') activateInspector();
  if (message.name === 'deactivate-inspector') deactivateInspector();
  if (message.name === 'side-panel') isSidePanel = true;
  if (message.name === 'check-inspector-status')
    sendRuntimeMessage({ action: 'check-inspector-state' });
  if (message.name === 'turn-on-debugger') turnOnDebugger(message.debuggerTime);
  if (message.name === 'toggle-btn inactive') {
    document.removeEventListener('contextmenu', rightClickFunction, true);
    contextMenu = 'inactive';
    chrome.storage.local.set({ contextMenu });
  } else if (message.name === 'toggle-btn active') {
    contextMenu = 'active';
    buildContextMenuResultFunction();
    chrome.storage.local.set({ contextMenu });
  }
  if (message.name === 'execute-js') {
    const scriptValue = message.scriptValue;
    const result = executeJs(scriptValue);
    sendRuntimeMessage({ name: `${message.name}-result`, result });
  }
  if (message.name === 'calculate-elements') {
    const { data, commandActive } = message;
    const result = calculateElements(data, commandActive);
    sendRuntimeMessage({ name: `${message.name}-result`, result });
  }
  if (message.name === 'check-invalid-selector') {
    const result = checkInvalidSelector(message.xpathValue);
    chrome.runtime.sendMessage({
      name: `${message.name}-result`,
      xpathValue: message.xpathValue,
      result,
    });
  }
  if (message.name === 'fix-selector') {
    const result = fullFixSelector(message.xpathOrCss, message.selector);
    chrome.runtime.sendMessage({ name: `${message.name}-result`, result });
  }
  if (message.name === 'get-iframe' && window.top === window.self) {
    const { baseUri, prevRes } = message;
    let iframeSelector = '';
    if (baseUri) {
      documentIframes = [];
      allDocumentIframes(document);
      for (let i = 0; i < documentIframes.length; i++) {
        const iframe = documentIframes[i];
        if (iframe.attributes.length > 0) {
          for (let j = 0; j < iframe.attributes.length; j++) {
            if (iframe.attributes[j].value === baseUri) {
              iframeSelector = createRelXpath(
                iframe,
                ',withid,withclass,withname,withplaceholder,withtext'
              );
              if (iframe.contentDocument) {
                const iframeDocument =
                  iframe.contentDocument || iframe.contentWindow.document;
                parentIframeXpath = [];
                getIframeXpath(iframeDocument);
                iframeSelector = ['frame', iframeSelector, parentIframeXpath];
                parentIframeXpath = [];
              } else {
                iframeSelector = ['frame', iframeSelector, [], true];
                break;
              }
            }
          }
        }
      }
    }
    prevRes.iframeSelector = iframeSelector;
    chrome.runtime.sendMessage({
      name: `${message.name}-result`,
      result: prevRes,
    });
  }
  if (message.name === 'highlight-element') {
    const { name, xpathOrCss, val, onChange, chooseAttrs, baseUri } = message;
    const result = verifyXpathSelectors(
      name,
      xpathOrCss,
      val,
      onChange,
      chooseAttrs,
      baseUri
    );
    chrome.runtime.sendMessage({ name: `${message.name}-result`, result });
  }
  if (message.name === 'assign-parent-element') {
    let elements = queryElement('[sh-att]');
    if (!elements[0]) elements = queryElement('[shub-ins]');
    if (elements[0]) assignParentElement(elements[0]);
  }
  if (message.name === 'create-axes-xpath-for-element') {
    let elements = queryElement('[sh-att]');
    if (elements[0]) {
      const result = createAxesXpathForElement(elements[0]);
      chrome.runtime.sendMessage({ name: `${message.name}-result`, result });
    }
  }
  if (message.name === 'calculate-elements') {
    const { data, commandActive } = message;
    const result = calculateElements(data, commandActive);
    chrome.runtime.sendMessage({ name: `${message.name}-result`, result });
  }
  if (message.name === 'prepare-list-of-attr-text') {
    let elements = queryElement('[sh-att]');
    if (!elements[0])
      elements = message.isCodeBtnAction
        ? [prevInspectedEl]
        : queryElement('[shub-ins]');
    if (elements[0]) {
      const result = prepareListOfAttrText(elements[0]);
      chrome.runtime.sendMessage({ name: `${message.name}-result`, result });
    }
  }
  if (message.name === 'element-type-and-info') {
    let elements;
    if (message.shadowRootStatus === 'closed') {
      elements = [message.shadowRootStatus];
    } else if (message.shadowRootStatus === 'comment') {
      elements = ['comment'];
    } else {
      elements = queryElement('[sh-att]');
      if (!elements[0])
        elements = message.isCodeBtnAction
          ? [prevInspectedEl]
          : queryElement('[shub-ins]');
    }
    if (elements[0]) {
      const result = elementTypeAndInfo(elements[0]);
      chrome.runtime.sendMessage({ name: `${message.name}-result`, result });
    }
  }
  if (message.name === 'on-inspect-element-click') {
    let elements;
    if (message.shadowRootStatus === 'closed') {
      elements = [message.shadowRootStatus];
    } else if (message.shadowRootStatus === 'comment') {
      elements = ['comment'];
    } else {
      elements = queryElement('[sh-att]');
      if (!elements[0])
        elements = message.isCodeBtnAction
          ? [prevInspectedEl]
          : queryElement('[shub-ins]');
    }
    if (elements[0]) {
      const result = onInspectElementClick(
        elements[0],
        message.chooseAttrs,
        message.hubMode,
        message.options
      );
      chrome.runtime.sendMessage({ name: `${message.name}-result`, result });
      prevInspectedEl = elements[0];
      removePreviousInspectedElement();
    }
  }
  if (message.name === 'tag-element') {
    window.top.document
      .querySelector(message.query)
      .setAttribute('shub-ins', 1);
  }
  if (document) {
    if (
      (message.xpath || message.xpath === '') &&
      message.name.includes('highlight-element')
    ) {
      message.name = message.xpath[1]
        ? message.xpath[1].charAt(0).includes('/') ||
          message.xpath[1].charAt(0).includes('(') ||
          message.xpath[1].substr(0, 2).includes('./')
          ? 'xpath'
          : 'css'
        : 'xpath';
      if (message.xpath[1])
        passResultsToDevtoolsScript(
          message.name,
          message.xpath[1],
          message.xpath[2],
          message.xpath[3]
        );
    }
    if (message.name === 'xpath') {
      const element = document.querySelector(`[xpath="${message.index}"]`);
      if (element) {
        const styleProperty = element.nodeName.toLowerCase().includes('svg')
          ? 'border'
          : 'outline';
        element.style.cssText = `${styleProperty}:2px solid orangered !important`;
        if (isFirefox) {
          if (!message.isSidePanel)
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest',
            });
        } else if (!message.isSidePanel) {
          element.scrollIntoViewIfNeeded();
        }
      }
    }
    if (message.name === 'xpath-remove') {
      const element = document.querySelector(`[xpath="${message.index}"]`);
      if (element) {
        if (element.nodeName.toLowerCase().includes('svg')) {
          element.style.border = '';
        } else {
          element.style.outline = '';
        }
      }
    }
    if (message.name === 'css') {
      let element = '';
      if (elementInShadowDom) {
        try {
          element = inspectedElement
            .getRootNode()
            .host.shadowRoot.querySelector(`[css="${message.index}"]`);
        } catch (error) {}
      } else {
        element = document.querySelector(`[css="${message.index}"]`);
      }
      if (element) {
        const styleProperty = element.nodeName.toLowerCase().includes('svg')
          ? 'border'
          : 'outline';
        element.style.cssText = `${styleProperty}:2px solid orangered !important`;
        if (isFirefox) {
          if (!message.isSidePanel)
            element.scrollIntoView({
              behavior: 'smooth',
              block: 'end',
              inline: 'nearest',
            });
        } else if (!message.isSidePanel) {
          element.scrollIntoViewIfNeeded();
        }
      }
    }
    if (message.name === 'css-remove') {
      const element = elementInShadowDom
        ? inspectedElement
            .getRootNode()
            .host.shadowRoot.querySelector(`[css="${message.index}"]`)
        : document.querySelector(`[css="${message.index}"]`);
      if (element) {
        if (element.nodeName.toLowerCase().includes('svg')) {
          element.style.border = '';
        } else {
          element.style.outline = '';
        }
      }
    }
    message.xpath = '';
  }
  if (message && message.attrArray) attributeArray = message.attrArray;
});

sendRuntimeMessage({ action: 'check-inspector-state' });
