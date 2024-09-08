import {
  addAttribute,
  removeAttribute,
  highlightElements,
  createCanvasElement,
  removeCanvasElement,
  isInShadow,
  highlightInspectedElement,
  onInspectElementClickEvent,
  onMouseUp,
  onMouseOut,
  sendRuntimeMessage,
  onContextMenu,
  findAllDocuments,
  addInspectListeners,
  removeInspectListeners,
  generateAbsXpath,
  generateRelXpath,
  getNodename,
  getChildNumber,
  parents,
  generateCSS,
} from './dom-inspector-helpers.js';

let isSidePanel = false;
let _document = '';

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
  this.tempXpath = ''; //resetting it
  this.indexes = [];
  this.matchIndex = [];
  if (message.name === 'inspect-element') {
    if (message.enable) {
      addInspectListeners();
    } else {
      removeInspectListeners();
    }
    return;
  }

  if (message.xpath || message.xpath === '') {
    if (!message.xpath[1]) {
      message.name = 'xpath';
    } else if (message.xpath[1].charAt(0).includes('/')) {
      message.name = 'xpath';
    } else {
      message.name = 'css';
    }
    highlightElements(message.name, message.xpath[1], message.xpath[2]);
  }
  if (message.name === 'xpath') {
    let element = document.querySelector(`[xpath="${message.index}"]`);
    if (element) {
      element.style.outline = '2px dotted orangered';
      if (!message.isSidePanel) {
        element.scrollIntoView(false);
      }
    }
  }
  if (message.name === 'xpath-remove') {
    let element = document.querySelector(`[xpath="${message.index}"]`);
    if (element) {
      element.style.outline = '';
    }
  }
  if (message.name === 'css') {
    let element = document.querySelector(`[css="${message.index}"]`);
    if (element) {
      element.style.outline = '2px dotted orangered';
      if (!message.isSidePanel) {
        element.scrollIntoView(false);
      }
    }
  }
  if (message.name === 'css-remove') {
    let element = document.querySelector(`[css="${message.index}"]`);
    if (element) {
      element.style.outline = '';
    }
  }
});
