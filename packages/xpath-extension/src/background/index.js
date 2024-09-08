// background.js

import { getXPath, getAbsoluteXPath, getCombinedXPath } from '../utils/xpathlibrary';

chrome.runtime.onInstalled.addListener(() => {
  console.log('XPath Generator installed.');

  chrome.contextMenus.create({
    id: 'generate-xpath',
    title: 'Generate XPath',
    contexts: ['all'],
  });

  chrome.contextMenus.create({
    id: 'generate-absolute-xpath',
    title: 'Generate Absolute XPath',
    contexts: ['all'],
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'generate-xpath') {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: generateXPath,
        args: [info.targetElementId],
      },
      (results) => {
        console.log('Generated XPath:', results[0].result);
        // You can handle the result as needed
      },
    );
  } else if (info.menuItemId === 'generate-absolute-xpath') {
    chrome.scripting.executeScript(
      {
        target: { tabId: tab.id },
        func: generateAbsoluteXPath,
        args: [info.targetElementId],
      },
      (results) => {
        console.log('Generated Absolute XPath:', results[0].result);
        // You can handle the result as needed
      },
    );
  }
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === 'combined-xpath') {
    console.log('Received Combined XPath:', message.combinedXPath);
    sendResponse({ status: 'success' });
  } else if (message.type === 'nested-iframes') {
    console.log('Received Nested Iframes:', message.nestedIframes);
    sendResponse({ status: 'success' });
  }
});

function generateXPath(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return null;
  return getXPath(element);
}

function generateAbsoluteXPath(elementId) {
  const element = document.getElementById(elementId);
  if (!element) return null;
  return getAbsoluteXPath(element);
}
