class ElementBuilder {
  constructor(tagName) {
    this.element = document.createElement(tagName);
  }

  setAttributes(attributes) {
    Object.keys(attributes).forEach((key) => {
      this.element.setAttribute(key, attributes[key]);
    });
    return this; // for chaining
  }

  addClass(...classNames) {
    classNames.forEach((className) => {
      this.element.classList.add(...className.split(' ')); // Split by space
    });
    return this; // for chaining
  }

  addTextContent(text) {
    this.element.textContent = text;
    return this; // for chaining
  }

  addHTMLContent(html) {
    this.element.innerHTML = html;
    return this; // for chaining
  }

  appendTo(parent) {
    if (parent instanceof HTMLElement) {
      parent.appendChild(this.element);
    } else if (typeof parent === 'string') {
      document.querySelector(parent).appendChild(this.element);
    }
    return this; // for chaining
  }

  insertAdjacent(target, position = 'beforeend') {
    if (target instanceof HTMLElement) {
      target.insertAdjacentElement(position, this.element);
    } else if (typeof target === 'string') {
      document.querySelector(target).insertAdjacentElement(position, this.element);
    }
    return this; // for chaining
  }

  addEventListener(event, callback) {
    this.element.addEventListener(event, callback);
    return this; // for chaining
  }

  setStyle(styles) {
    Object.assign(this.element.style, styles);
    return this; // for chaining
  }

  getElement() {
    return this.element;
  }
}

// Function to download the object as a JSON file
function downloadObjectAsJson(exportObj, exportName) {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', exportName + '.json');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
}

const cssString = `
  /* Selection box styling */
    .selection-box {
      position: absolute;
      border: 2px dashed rgba(0, 122, 255, 0.7);
      background-color: rgba(173, 216, 230, 0.3);
      pointer-events: none;
      transition: all 0.1s ease-in-out;
      border-radius: 4px;
      display: none;
    }

    /* Popup styling */
    #popup {
      position: fixed;
      bottom: 10px;
      right: 10px;
      width: 400px;
      background-color: #f0f0f0;
      border: 1px solid #333;
      z-index: 10000;
      box-shadow: 0 8px 10px 1px rgba(0, 0, 0, .14), 0 3px 14px 2px rgba(0, 0, 0, .12), 0 5px 5px -3px rgba(0, 0, 0, .2);
      font-family: Arial, sans-serif;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
    }

    /* Popup top bar styling */
    #popup-top-bar {
      color: white;
      background-color: #f2f2f2;
      box-shadow: 0 3px 2px -2px rgba(0, 0, 0, .1);
      color: #041e49;
      padding: 10px 16px;
      cursor: move;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    /* Popup content area styling */
    .popup-content {
      padding: 10px;
      flex-grow: 1;
      max-height: 300px;
      overflow-y: auto;
      background-color: white;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }

    .second-bar {
      background-color: rgba(255, 255, 255, 0.8);
      display: flex;
      justify-content: space-between;
      padding: 10px;
      align-items: center;
      border-bottom: 1px solid #ccc;
      height: 48px;
    }

    /* Button container for dynamic buttons */
    .dynamic-buttons-container {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-inline: 10px;
      background-color: #f9f9f9;
    }

    /* Delete button styling */
    .dynamic-buttons-container button {
      border: none;
      color: white;
      cursor: pointer;
      padding: 4px 5px;
      margin-inline: 2px;
      border-radius: 3px;
    }
    .delete-button {
      background-color: #dc3545;
    }

    .copy-button {
      background-color: black;
    }

    .group-button {
      background-color: blueviolet;
    }


    /* Settings overlay styling */
    #settings-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.5);
      display: none;
      justify-content: center;
      align-items: center;
      z-index: 10001;
    }

    /* Settings container styling */
    #settings-container {
      width: 300px;
      padding: 20px;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
    }

    #popup {
      position: fixed;
      bottom: 10px;
      right: 10px;
      width: 400px;
      background-color: #f0f0f0;
      border: 1px solid #333;
      z-index: 10000;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      font-family: Arial, sans-serif;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
    }

    #popupTopBar {
      background-color: #333;
      color: white;
      padding: 5px 10px;
      cursor: move;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
    }

    #minimizeButton {
      background-color: transparent;
      color: white;
      border: none;
      cursor: pointer;
      font-size: 16px;
    }

    .popup-content {
      padding: 10px;
      flex-grow: 1;
      max-height: 300px;
      overflow-y: auto;
      background-color: white;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
      
    .export-buttons-container {
      display: flex;
      justify-content: space-between;
      padding: 10px;
      background-color: #f9f9f9;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
    }
    .exportButton {
      padding: 5px 10px;
      border: none;
      background-color: #007bff;
      color: white;
      border-radius: 5px;
      cursor: pointer;
    }
    
    .exportSelectorButton {
      background-color: #4CAF50;
      color: white;
    }

    .exportDataButton {
      background-color: #2196F3;
      color: white;
    }
    
    .exportActionButton {
      background-color: #FFC107;
      color: white;
    }

    .exportAssertionButton {
      background-color: #FF5722;
      color: white;
    }

    /* Overlay styling */
    #export-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background-color: rgba(0, 0, 0, 0.7);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10001;
    }

    /* Container styling */
    #export-container {
      background-color: #fff;
      width: 80%;
      max-height: 100%;
      padding: 20px;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    /* Close button styling */
    .export-close-button {
      background-color: #f44336;
      color: #fff;
      border: none;
      padding: 10px;
      border-radius: 4px;
      cursor: pointer;
      align-self: flex-end;
    }
    
    /* Copy button positioned at the right top corner of the textarea */
    .copy-text-area-button {
      position: absolute;
      top: 10px;
      right: 10px;
      background-color: #2196f3;
      color: white;
      border: none;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 12px;
      transition: background-color 0.3s ease, transform 0.3s ease;
    }

    .copy-text-area-button:active {
      transform: scale(0.95);
    }

    /* Animation for the button when text changes */
    .copy-text-area-button.copied {
      background-color: #4caf50;
      transition: background-color 0.3s ease;
    }

    /* Input for file name */
    #export-filename {
      border: 1px solid #ccc;
      padding: 8px;
      font-size: 14px;
      border-radius: 4px;
      width: 50%;
      outline: none;
      margin-bottom: 10px;
    }

    /* Export button styling */
    .export-json-button {
      background-color: #4caf50;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      margin-top: 10px;
      margin-left: 10px;
    }


    /* Textarea styling */
    #export-textarea {
      width: 100%;
      height: 70vh;
      padding: 10px;
      font-size: 14px;
      font-family: monospace;
      border: 1px solid #ccc;
      border-radius: 4px;
      resize: none;
      background-color: #f9f9f9;
      white-space: pre;
      overflow: auto;
    }
    
    .selector-identifier {
      color: #747775;
      margin-left: 10px;
      font-size: 12px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: 120px;
    /* Limit the width for ellipsis to show */
    }

        
    .selectorListItem {
      padding: 5px;
      cursor: pointer;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #ccc;
    }

    .delete-row-button {
      margin-left: 10px;
      border: none;
      background-color: #dc3545;
      color: white;
      border-radius: 3px;
      cursor: pointer;
    }

    /* popup action buttons */
    .widget-topbar-action-buttons-container {
        display: flex;
        text-align: right;
        white-space: nowrap;
    }
    .widget-topbar-action-button, .widget-topbar-selection-button {
        background: none repeat scroll 0 0 transparent;
        border: medium none;
        border-spacing: 0;
        color: #26589F;
        font-family: 'PT Sans Narrow',sans-serif;
        font-size: 16px;
        font-weight: normal;
        line-height: 1.42rem;
        list-style: none outside none;
        margin: 0;
        padding: 0;
        text-align: left;
        text-decoration: none;
        text-indent: 0;
        margin-left: 4px;
        opacity: 1;
        position: relative;
        top: 2px;
    }
    .widget-topbar-selection-button{
        color: #f2f2f2;
        width: 20px;
        height: 20px;
    }
    .widget-topbar-selection-button:hover, .widget-topbar-action-button:hover {
      color: blue;
    }
    .widget-topbar-selection-button:active, .widget-topbar-action-button:active, .widget-topbar-selection-button:focus, .widget-topbar-action-button:focus {
      color: green;
    }
    .widget-topbar-minimise-button{
        background: url(//ssl.gstatic.com/ui/v1/icons/mail/rfr/ic_minimize_16px_2x.png);
        background-size: 16px;
        width: 16px;
        height: 16px;
    }
    .widget-topbar-expand-button {
        background-image: url(//ssl.gstatic.com/ui/v1/icons/mail/rfr/ic_open_in_full_16px_2x.png);
        background-size: 16px;
        width: 16px;
        height: 16px;
    }
    .widget-topbar-unexpand-button {
        background-image: url(//ssl.gstatic.com/ui/v1/icons/mail/rfr/ic_close_fullscreen_16px_2x.png);
        background-size: 16px;
        width: 16px;
        height: 16px;
    }
    
    .widget-topbar-close-button {
        background: url(//ssl.gstatic.com/ui/v1/icons/mail/rfr/ic_close_16px_2x.png);
        background-size: 16px;
        width: 16px;
        height: 16px;
    }
  `;

new ElementBuilder('style').addHTMLContent(cssString).appendTo(document.head);

// Example Usage:

// Create a button with class, attributes, event listener, and append it to a div
// new ElementBuilder('button')
//   .setAttributes({ id: 'myButton', type: 'button' })
//   .addClass('btn', 'btn-primary')
//   .addTextContent('Click Me')
//   .addEventListener('click', () => alert('Button clicked!'))
//   .appendTo('#myDiv');

// // Create a paragraph with text, add some styles, and insert it before another element
// new ElementBuilder('p')
//   .addTextContent('This is a new paragraph.')
//   .setStyle({ color: 'blue', fontSize: '18px' })
//   .insertAdjacent('#anotherElement', 'beforebegin');
