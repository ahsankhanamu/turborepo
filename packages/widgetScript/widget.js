// Main widget here
(function () {
  let startX, startY, selectionBox;
  let selectedElements = new Map();
  let widgetSelectedItems = new Set();
  let widget, widgetTopBar, secondBar, widgetContent, exportOverlay;
  (isMinimized = false), (isMaximized = false);
  let isDraggingWidget = false;
  let isDraggingSelection = false;
  let scrollSpeed = 20;
  let scrollInterval;
  let widgetOffsetX = 0,
    widgetOffsetY = 0;
  let dynamicButtonsContainer;
  let isWidgetActive = false;
  let tool = '';

  const defaultOutlineStyle = '2px solid blue';
  const hoverOutlineStyle = '3px dashed orange';

  class ToolManager {
    constructor() {
      this.currentTool = null;
    }

    activateTool(toolName) {
      if (this.currentTool) {
        this.deactivateTool(this.currentTool);
      }
      this.currentTool = toolName;
      this.activateToolHandlers(toolName);
    }

    deactivateTool(toolName) {
      this.deactivateToolHandlers(toolName);
      this.currentTool = null;
    }

    activateToolHandlers(toolName) {
      switch (toolName) {
        case 'singleSelect':
          window.addEventListener('click', handleSingleSelect);
          widgetUtils.setCallbacks({
            enterKeyCallback: addSingleElementToSelection,
          });
          widgetUtils.toggleSingleSelectWidget();
          break;
        case 'dragSelect':
          window.addEventListener('mousedown', onDragSelectionStart);
          break;
        default:
          break;
      }
    }

    deactivateToolHandlers(toolName) {
      switch (toolName) {
        case 'singleSelect':
          window.removeEventListener('click', handleSingleSelect);
          widgetUtils.toggleSingleSelectWidget();
          break;
        case 'dragSelect':
          window.removeEventListener('mousedown', onDragSelectionStart);
          break;
        default:
          break;
      }
    }
  }

  const toolManager = new ToolManager();

  // Toggle widget activation and deactivation
  function toggleWidgetActivation() {
    isWidgetActive = !isWidgetActive;
    if (!isWidgetActive) {
      toolManager.deactivateTool(toolManager.currentTool);
    }
    console.log(isWidgetActive ? 'Widget Activated' : 'Widget Deactivated');
  }

  function preventTextSelection() {
    document.body.style.userSelect = 'none';
  }

  function restoreTextSelection() {
    document.body.style.userSelect = '';
  }

  function toCamelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase()
      )
      .replace(/\s+/g, '');
  }

  function getElementIdentifier(element) {
    const tag = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : '';
    const className = element.classList.length
      ? `.${[...element.classList].join('.')}`
      : '';
    return `${tag}${id}${className}`;
  }

  function getSelector(element) {
    if (element.id) {
      return `//${element.tagName.toLowerCase()}[@id="${element.id}"]`;
    }
    if (element.name) {
      return `//${element.tagName.toLowerCase()}[@name="${element.name}"]`;
    }
    if (element.title) {
      return `//${element.tagName.toLowerCase()}[@title="${element.title}"]`;
    }
    if (element.getAttribute('aria-labelledby')) {
      return `//${element.tagName.toLowerCase()}[@aria-labelledby="${element.getAttribute(
        'aria-labelledby'
      )}"]`;
    }
    return `//${element.tagName.toLowerCase()}`;
  }

  function getSuffix(element) {
    if (element.tagName === 'INPUT') {
      if (
        element.type === 'text' ||
        element.type === 'number' ||
        element.type === 'email' ||
        element.type === 'tel' ||
        element.type === 'password' ||
        element.type === 'search' ||
        element.type === 'url'
      )
        return 'Textbox';
      if (element.tagName === 'TEXTAREA') return 'Textbox';
      if (element.type === 'radio') return 'Radio';
      if (element.type === 'checkbox') return 'Checkbox';
      if (
        element.type === 'button' ||
        element.type === 'submit' ||
        element.type === 'reset'
      )
        return 'Button';
    }
    if (element.tagName === 'SELECT') return 'Select';
    return '';
  }

  function getActionType(element) {
    if (element.tagName === 'INPUT') {
      if (
        element.type === 'text' ||
        element.type === 'number' ||
        element.type === 'email' ||
        element.type === 'tel' ||
        element.type === 'password' ||
        element.type === 'search' ||
        element.type === 'url'
      ) {
        return 'text'; // Action for text input
      }
      if (element.type === 'radio') return 'mark'; // Action for radio button
      if (element.type === 'checkbox') return 'mark'; // Action for checkbox
      // if (element.type === 'button' || element.type === 'submit' || element.type === 'reset') {
      //   return 'click'; // Action for buttons
      // }
    }
    // if (element.tagName === 'BUTTON') {
    //   return 'click'; // Action for buttons
    // }
    if (element.tagName === 'TEXTAREA') return 'text'; // Action for textarea input
    if (element.tagName === 'SELECT') return 'select'; // Action for select dropdown
    return 'unknown'; // Return empty if no match found
  }

  function getElementState(element) {
    const states = [];

    // Check if the element is hidden by calculating the bounding box
    const boundingBox = element.getBoundingClientRect();
    const isHidden = boundingBox.width === 0 && boundingBox.height === 0;
    if (isHidden) {
      states.push('hidden');
    }

    // Check if the element is disabled
    if (element.disabled) {
      states.push('disabled');
    }

    // Check if the element is focused
    if (document.activeElement === element) {
      states.push('focused');
    }

    // Check if the element is "empty" (for input, textarea, or select)
    if (
      element.tagName === 'INPUT' ||
      element.tagName === 'TEXTAREA' ||
      element.tagName === 'SELECT'
    ) {
      if (
        element.value === '' ||
        element.value === null ||
        element.value === undefined
      ) {
        states.push('empty');
      }
    }

    // Check if the element is checked (for checkboxes or radio buttons)
    if (element.type === 'checkbox' || element.type === 'radio') {
      if (element.checked) {
        states.push('checked');
      }
    }

    // Return the joined states, or "normal" if there are no special states
    return states.length > 0 ? states.join(', ') : 'normal';
  }

  function isInteractive(element) {
    return (
      element.tagName === 'A' ||
      element.tagName === 'BUTTON' ||
      element.tagName === 'TEXTAREA' ||
      element.tagName === 'SELECT' ||
      (element.tagName === 'INPUT' &&
        (element.type === 'button' ||
          element.type === 'submit' ||
          element.type === 'text' ||
          element.type === 'password' ||
          element.type === 'checkbox' ||
          element.type === 'radio')) ||
      element.hasAttribute('onclick') ||
      element.getAttribute('role') === 'button' ||
      element.tabIndex >= 0
    );
  }

  function isElementInSelection(element) {
    if (widget && widget.contains(element)) {
      return;
    }
    const rect = element.getBoundingClientRect();
    const selectionRect = selectionBox.getBoundingClientRect();

    return (
      rect.left >= selectionRect.left &&
      rect.right <= selectionRect.right &&
      rect.top >= selectionRect.top &&
      rect.bottom <= selectionRect.bottom
    );
  }

  function autoScroll(event) {
    const buffer = 50;
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;
    const scrollX = window.scrollX;
    const scrollY = window.scrollY;
    const maxScrollX = document.documentElement.scrollWidth - innerWidth;
    const maxScrollY = document.documentElement.scrollHeight - innerHeight;

    let scrollXDelta = 0;
    let scrollYDelta = 0;

    if (clientY > innerHeight - buffer && scrollY < maxScrollY) {
      scrollYDelta = scrollSpeed;
    } else if (clientY < buffer && scrollY > 0) {
      scrollYDelta = -scrollSpeed;
    }

    if (clientX > innerWidth - buffer && scrollX < maxScrollX) {
      scrollXDelta = scrollSpeed;
    } else if (clientX < buffer && scrollX > 0) {
      scrollXDelta = -scrollSpeed;
    }

    if (scrollXDelta !== 0 || scrollYDelta !== 0) {
      window.scrollBy(scrollXDelta, scrollYDelta);
    }
  }

  function startAutoScroll(event) {
    stopAutoScroll();
    scrollInterval = setInterval(() => autoScroll(event), 50);
  }

  function stopAutoScroll() {
    clearInterval(scrollInterval);
  }

  function toggleSingleSelectMode() {
    if (toolManager.currentTool !== 'singleSelect') {
      toolManager.activateTool('singleSelect');
    } else {
      toolManager.deactivateTool('singleSelect');
    }
  }

  function toggleDragSelectMode() {
    if (toolManager.currentTool !== 'dragSelect') {
      toolManager.activateTool('dragSelect');
    } else {
      toolManager.deactivateTool('dragSelect');
    }
  }

  function addSingleElementToSelection(element) {
    if (
      toolManager.currentTool !== 'singleSelect' ||
      (widget && widget.contains(element))
    )
      return;
    if (widgetUtils.isValidElement(element)) {
      selectedElements.set(element, '');
      element.style.outline = defaultOutlineStyle;
      console.log('Single Element Selected:', element);
      // widgetUtils.attachInspectWidget(element); // Integrate widgetUtils for the single select tool
      createWidget();
      updateWidget();
    }
  }

  function handleSingleSelect(event) {
    const element = event.target;
    addSingleElementToSelection(element);
  }

  function onDragSelectionStart(event) {
    if (widgetContent && widgetContent.contains(event.target)) {
      return;
    }
    if (widgetTopBar && widgetTopBar.contains(event.target)) {
      isDraggingWidget = true;
      widgetOffsetX = event.clientX - widget.getBoundingClientRect().left;
      widgetOffsetY = event.clientY - widget.getBoundingClientRect().top;

      window.addEventListener('mousemove', onDragSelectMove);
      window.addEventListener('mouseup', onDragSelectionEnd);
      return;
    }
    if (!isWidgetActive || tool === 'singleSelect') return;
    preventTextSelection();
    startX = event.pageX;
    startY = event.pageY;
    isDraggingSelection = true;

    createSelectionBox();

    window.addEventListener('mousemove', onDragSelectMove);
    window.addEventListener('mouseup', onDragSelectionEnd);
  }

  function onDragSelectMove(event) {
    if (isDraggingWidget) {
      widget.style.left = `${event.clientX - widgetOffsetX}px`;
      widget.style.top = `${event.clientY - widgetOffsetY}px`;
      return;
    }

    if (isDraggingSelection) {
      updateSelectionBox(event.pageX, event.pageY);
      autoScroll(event);
      startAutoScroll(event);
    }
  }

  function onDragSelectionEnd(event) {
    window.removeEventListener('mousemove', onDragSelectMove);
    window.removeEventListener('mouseup', onDragSelectionEnd);
    stopAutoScroll;
    if (isDraggingWidget) {
      isDraggingWidget = false;
      return;
    }

    if (isDraggingSelection) {
      isDraggingSelection = false;

      const allElements = document.querySelectorAll(
        'a, button, input, textarea, select, [onclick], [role="button"], [tabindex]'
      );

      allElements.forEach(element => {
        if (
          isInteractive(element) &&
          isElementInSelection(element) &&
          !selectedElements.has(element)
        ) {
          selectedElements.set(element, '');
          element.style.outline = defaultOutlineStyle;
        }
      });

      document.body.removeChild(selectionBox);
      restoreTextSelection();
      stopAutoScroll();

      createWidget();
      updateWidget();
    }
  }

  function createSelectionBox() {
    selectionBox = new ElementBuilder('div')
      .setAttributes({ id: 'selection_box' })
      .setStyle({
        position: 'absolute',
        border: '2px dashed blue',
        backgroundColor: 'rgba(173, 216, 230, 0.3)',
      })
      .appendTo(document.body)
      .getElement();
  }

  // Update selection box dimensions during drag select
  function updateSelectionBox(pageX, pageY) {
    const width = Math.abs(pageX - startX);
    const height = Math.abs(pageY - startY);
    Object.assign(selectionBox.style, {
      width: `${width}px`,
      height: `${height}px`,
      left: `${Math.min(pageX, startX)}px`,
      top: `${Math.min(pageY, startY)}px`,
    });
  }

  function createWidget() {
    if (widget) {
      widgetContent.innerHTML = '';
      return;
    }

    widget = new ElementBuilder('div')
      .setAttributes({ id: 'widget' })
      .getElement();

    createTopBar(widget);
    createSecondBar(widget);
    widgetContent = new ElementBuilder('div')
      .addClass('widget-content')
      .appendTo(widget)
      .getElement();
    createExportButtons(widget);
    document.body.appendChild(widget);
  }

  function highlightElement(element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    element.style.outline = hoverOutlineStyle;
  }
  function unhighlightElement(element) {
    element.style.outline = defaultOutlineStyle;
  }

  function updateWidget() {
    widgetContent.innerHTML = '';

    selectedElements.forEach((value, element) => {
      const li = new ElementBuilder('div')
        .addClass('selectorListItem')
        .appendTo(widgetContent)
        .getElement();

      const checkbox = new ElementBuilder('input')
        .setAttributes({
          type: 'checkbox',
          checked: widgetSelectedItems.has(element),
        })
        .addClass('widget-item-checkbox')
        .addEventListener('change', e => {
          let checked = e.target.checked;
          if (checked) {
            widgetSelectedItems.add(element);
          } else {
            widgetSelectedItems.delete(element);
          }
          updateSelectAllCheckbox();
          updateDynamicButtons();
        })
        .appendTo(li);

      const identifier = getElementIdentifier(element);

      const selectorNameInput = new ElementBuilder('input')
        .setAttributes({
          type: 'text',
          placeholder: 'Enter Key Name',
          value: value,
        })
        .setStyle({ width: '150px' })
        .addEventListener('blur', e => {
          const val = e.target.value;
          const suffix = getSuffix(element);
          const finalSuffix = val.endsWith(suffix) ? '' : suffix;
          const keyName = toCamelCase(val) + finalSuffix;
          selectedElements.set(element, keyName);
        })
        .appendTo(li);

      new ElementBuilder('span')
        .addClass('selector-identifier')
        .addTextContent(identifier)
        .appendTo(li);

      new ElementBuilder('button')
        .addTextContent('Delete')
        .addClass('delete-row-button')
        .addEventListener('click', () => {
          selectedElements.delete(element);
          element.style.outline = '';
          li.remove();
        })
        .appendTo(li);

      li.addEventListener('mouseenter', () => highlightElement(element));
      li.addEventListener('mouseleave', () => unhighlightElement(element));

      selectorNameInput.addEventListener('focus', () =>
        highlightElement(element)
      );
      selectorNameInput.addEventListener('blur', () =>
        unhighlightElement(element)
      );
    });
  }

  function createTopBar(widget) {
    widgetTopBar = new ElementBuilder('div')
      .setAttributes({ id: 'widget-top-bar' })
      .addHTMLContent('<span>Selected Elements</span>')
      .appendTo(widget)
      .getElement();

    // Create the Selection container div
    const selectionButtonsContainer = new ElementBuilder('div')
      .addClass('widget-topbar-action-buttons-container')
      .appendTo(widgetTopBar)
      .getElement();

    // Single Select Button
    new ElementBuilder('button')
      .addClass(
        'widget-topbar-selection-button',
        'widget-topbar-single-select-button'
      )
      .addHTMLContent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" width="100%" height="100%">
          <rect x="1.6" y="1.5" width="12.6" height="12.7" rx="1" stroke="#000" stroke-width="1.5" fill="currentColor"></rect>
          <rect x="4" y="4" width="8" height="1.5" rx="0.2" stroke="#000" fill="currentColor"></rect>
          <rect x="7" y="7" width="8" height="8" fill="currentColor"></rect>
          <path d="M8 15V8H15M8 8L14 14" stroke="#000" stroke-width="1.5" id="arrow"></path>
        </svg>`
      )
      .addEventListener('click', toggleSingleSelectMode)
      .appendTo(selectionButtonsContainer)
      .getElement();

    // Drag Select Button with ◩
    new ElementBuilder('button')
      .addClass(
        'widget-topbar-selection-button',
        'widget-topbar-drag-select-button'
      )
      .addHTMLContent(
        `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" width="100%" height="100%">
          <rect x="1.6" y="1.5" width="12.6" height="12.7" rx="1" stroke="#000" stroke-width="1.5" fill="currentColor"></rect>
          <rect x="4" y="4" width="2" height="2" rx="0.2" fill="#000"></rect>
          <rect x="7" y="4" width="2" height="2" rx="0.2" fill="#000"></rect>
          <rect x="10" y="4" width="2" height="2" rx="0.2" fill="#000"></rect>
          <rect x="4" y="7" width="2" height="2" rx="0.2" fill="#000"></rect>
          <rect x="4" y="10" width="2" height="2" rx="0.2" fill="#000"></rect>
          <rect x="7" y="7" width="8" height="8" fill="currentColor"></rect>
          <path d="M8 15V8H15M8 8L14 14" stroke="#000" stroke-width="1.5" id="arrow"></path>
        </svg>`
      )
      .addEventListener('click', toggleDragSelectMode)
      .appendTo(selectionButtonsContainer)
      .getElement();

    // Create the Action buttons container div
    const actionButtonsContainer = new ElementBuilder('div')
      .addClass('widget-topbar-action-buttons-container')
      .appendTo(widgetTopBar)
      .getElement();

    // Minimise button
    new ElementBuilder('button')
      .addClass('widget-topbar-action-button', 'widget-topbar-minimise-button')
      .setAttributes({
        id: ':4i4',
        src: 'images/cleardot.gif',
        alt: 'Minimise',
        'aria-label': 'Minimise',
        'data-tooltip-delay': '800',
        'data-tooltip': 'Minimise',
      })
      .addEventListener('click', () => {
        isMinimized = !isMinimized;
        widgetContent.style.display = isMinimized ? 'none' : 'block';
        widget.style.width = isMinimized ? '328px' : '510px';
      })
      .appendTo(actionButtonsContainer)
      .getElement();

    // Create the expand button
    new ElementBuilder('button')
      .addClass('widget-topbar-action-button', 'widget-topbar-expand-button')
      .setAttributes({
        id: ':4g4',
        src: 'images/cleardot.gif',
        alt: 'Pop-out',
        'aria-label': 'Exit full screen (Shift for pop-out)',
        'data-tooltip-delay': '800',
        'data-tooltip': 'Exit full screen (Shift for pop-out)',
      })
      .addEventListener('click', () => {
        expandButton.style.display = 'none';
        unexpandButton.style.display = 'inline-block';
      })
      .addEventListener('click', toggleMaximizeWidget)
      .appendTo(actionButtonsContainer)
      .getElement();

    // Create the unexpand button
    new ElementBuilder('button')
      .addClass('widget-topbar-action-button', 'widget-topbar-unexpand-button')
      .setAttributes({
        id: ':4g4',
        src: 'images/cleardot.gif',
        alt: 'Pop-out',
        'aria-label': 'Full screen (Shift for pop-out)',
        'data-tooltip-delay': '800',
        'data-tooltip': 'Full screen (Shift for pop-out)',
      })
      .addEventListener('click', () => {
        unexpandButton.style.display = 'none';
        expandButton.style.display = 'inline-block';
      })
      .addEventListener('click', toggleMaximizeWidget)
      .setStyle({ display: 'none' }) // Initially hide the unexpand button
      .appendTo(actionButtonsContainer)
      .getElement();

    // Close button
    new ElementBuilder('button')
      .addClass('widget-topbar-action-button', 'widget-topbar-close-button')
      .setAttributes({
        id: ':4g5',
        src: 'images/cleardot.gif',
        alt: 'Close',
        'aria-label': 'Save & close',
        'data-tooltip-delay': '800',
        'data-tooltip': 'Save & close',
      })
      .addEventListener('click', toggleWidgetActivation)
      .appendTo(actionButtonsContainer)
      .getElement();
  }

  function createSecondBar(widget) {
    secondBar = new ElementBuilder('div')
      .addClass('second-bar')
      .appendTo(widget)
      .getElement();

    new ElementBuilder('input')
      .setAttributes({ type: 'checkbox', name: 'Select All' })
      .addEventListener('change', handleSelectAll)
      .appendTo(secondBar);

    dynamicButtonsContainer = new ElementBuilder('div')
      .addClass('dynamic-buttons-container')
      .appendTo(secondBar)
      .getElement();

    new ElementBuilder('button')
      .addTextContent('⚙️')
      .setAttributes({ name: 'Settings' })
      .setStyle({ border: 'none', cursor: 'pointer' })
      .addEventListener('click', toggleSettingsOverlay)
      .appendTo(secondBar);
  }

  // Button to toggle the export modal
  function createExportButtons(widget) {
    const buttonContainer = new ElementBuilder('div')
      .addClass('export-buttons-container')
      .appendTo(widget)
      .getElement();

    // Button for Selectors
    new ElementBuilder('button')
      .addTextContent('Selectors ↗️')
      .addClass('exportButton exportSelectorButton')
      .addEventListener('click', () => toggleExportOverlay('selectors'))
      .appendTo(buttonContainer);

    // Button for Data
    new ElementBuilder('button')
      .addTextContent('Data ↗️')
      .addClass('exportButton exportDataButton')
      .addEventListener('click', () => toggleExportOverlay('data'))
      .appendTo(buttonContainer);

    // Button for Actions
    new ElementBuilder('button')
      .addTextContent('Actions ↗️')
      .addClass('exportButton exportActionButton')
      .addEventListener('click', () => toggleExportOverlay('actions'))
      .appendTo(buttonContainer);

    // Button for Assertions
    new ElementBuilder('button')
      .addTextContent('Assertions ↗️')
      .addClass('exportButton exportAssertionsButton')
      .addEventListener('click', () => toggleExportOverlay('assertions'))
      .appendTo(buttonContainer);
  }

  function handleSelectAll(event) {
    const isChecked = event.target.checked;
    widgetSelectedItems.clear();
    if (isChecked) {
      selectedElements.forEach((_, key) => {
        widgetSelectedItems.add(key);
      });
    }

    updateDynamicButtons();
  }

  function toggleMaximizeWidget() {
    isMaximized = !isMaximized;
    if (isMaximized) {
      widget.style.position = 'fixed';
      widget.style.top = 0;
      widget.style.left = 0;
      widget.style.width = '100vw';
      widget.style.height = '100vh';
      widget.style.zIndex = 10001; // Ensure it's on top of everything
      widgetContent.style.maxHeight = '90vh';
    } else {
      widget.style.position = 'fixed';
      widget.style.bottom = '10px';
      widget.style.right = '10px';
      widget.style.width = '400px';
      widget.style.height = 'auto';
      widgetContent.style.maxHeight = '100vh';
    }
  }

  function updateSelectAllCheckbox() {
    const selectedItemsSize = selectedElements.size;
    const widgetSelectedItemsSize = widgetSelectedItems.size;
    const selectAllCheckbox = secondBar.querySelector('input[type="checkbox"]');
    selectAllCheckbox.checked = widgetSelectedItemsSize === selectedItemsSize;
    selectAllCheckbox.indeterminate =
      widgetSelectedItemsSize > 0 &&
      widgetSelectedItemsSize < selectedItemsSize;
  }

  function updateDynamicButtons() {
    const handleCopy = () => {
      const exportData = {};
      widgetSelectedItems.size < 1
        ? selectedElements.forEach((selectorName, element) => {
            exportData[selectorName] = getSelector(element);
          })
        : widgetSelectedItems.forEach(element => {
            exportData[selectedElements.get(element)] = getSelector(element);
          });
      console.log('Copied Data:', exportData);
      navigator.clipboard.writeText(JSON.stringify(exportData));
    };

    const handleDeleteAll = () => {
      let newSelectedElements = new Map();
      selectedElements.forEach((value, element) => {
        if (!widgetSelectedItems.has(element)) {
          newSelectedElements.set(element, value);
        } else {
          element.style.outline = '';
        }
      });
      selectedElements = newSelectedElements;
      widgetSelectedItems.clear();
      updateWidget();
    };

    const handleGroup = () => {
      const groupName = prompt('Enter Group Name:');
      if (groupName) {
        widgetSelectedItems.forEach(element => {
          selectedElements.set(element, groupName);
        });
        updateWidget();
        updateDynamicButtons();
      }
    };

    dynamicButtonsContainer.innerHTML = '';
    if (widgetSelectedItems.size > 0) {
      new ElementBuilder('button')
        .addTextContent('Delete All')
        .addClass('delete-button')
        .addEventListener('click', handleDeleteAll)
        .appendTo(dynamicButtonsContainer);

      new ElementBuilder('button')
        .addTextContent('Copy')
        .addClass('copy-button')
        .addEventListener('click', handleCopy)
        .appendTo(dynamicButtonsContainer);

      new ElementBuilder('button')
        .addTextContent('Group')
        .addClass('group-button')
        .addEventListener('click', handleGroup)
        .appendTo(dynamicButtonsContainer);
    }
  }

  function exportSelectors() {
    const exportSelectorsObject = {};
    selectedElements.forEach((keyName, element) => {
      if (keyName) {
        exportSelectorsObject[keyName] = getSelector(element);
      }
    });

    return exportSelectorsObject;
  }

  function exportElementValue(element) {
    let value = '';

    if (element.tagName === 'INPUT') {
      if (
        element.type === 'text' ||
        element.type === 'email' ||
        element.type === 'password' ||
        element.type === 'search'
      ) {
        value = element.value;
      } else if (element.type === 'checkbox' || element.type === 'radio') {
        value = element.checked;
      }
    } else if (element.tagName === 'TEXTAREA') {
      value = element.value;
    } else if (element.tagName === 'SELECT') {
      const selectedOption = element.options[element.selectedIndex];
      value = selectedOption ? selectedOption.textContent : '';
    } else if (element.tagName === 'BUTTON') {
      value = element.textContent;
    }
    return value;
  }

  function exportData() {
    const exportDataobject = {};
    selectedElements.forEach((selectorName, element) => {
      let elementValue = exportElementValue(element);
      if (selectorName) {
        exportDataobject[selectorName] = elementValue;
      }
    });

    return exportDataobject;
  }

  function exportActions() {
    let actions = [['selector', 'type', 'value']];

    selectedElements.forEach((selectorName, element) => {
      const action = getActionType(element); // Get action type (text, mark, click, select)
      const elementValue = exportElementValue(element); // Retrieve exported data

      if (selectorName) {
        actions.push([selectorName, action, elementValue]);
      }
    });
    const formattedTable = formatTable(actions);
    return formattedTable; // Return string with proper newlines
  }

  function exportAssertions() {
    let assertions = [['selector', 'states', 'value']]; // Add \n for new line

    selectedElements.forEach((selectorName, element) => {
      const states = getElementState(element); // Get the state of the element
      const elementValue = exportElementValue(element); // Retrieve exported data

      if (selectorName) {
        assertions.push([selectorName, states, elementValue]);
      }
    });
    const formattedTable = formatTable(assertions);
    return formattedTable; // Return string with proper newlines
  }

  function formatTable(rows) {
    // Find the maximum width for each column
    const colWidths = rows[0].map((_, colIndex) =>
      Math.max(...rows.map(row => row[colIndex].length))
    );

    // Format each row to align the columns with pipes at the start and end
    return rows
      .map(
        row =>
          '| ' +
          row
            .map((cell, colIndex) => cell.padEnd(colWidths[colIndex]))
            .join(' | ') +
          ' |'
      )
      .join('\n');
  }

  function toggleSettingsOverlay() {
    let settingsOverlay = document.getElementById('settings-overlay');
    if (!settingsOverlay) {
      settingsOverlay = new ElementBuilder('div')
        .setAttributes({ id: 'settings-overlay' })
        .appendTo(document.body)
        .getElement();

      const settingsContainer = new ElementBuilder('div')
        .setAttributes({ id: 'settings-container' })
        .appendTo(settingsOverlay)
        .getElement();

      new ElementBuilder('button')
        .addTextContent('Close')
        .addEventListener('click', toggleSettingsOverlay)
        .appendTo(settingsContainer);

      new ElementBuilder('label')
        .addTextContent('Sort/Filter Elements by:')
        .setStyle({ display: 'block', marginBottom: '10px' })
        .appendTo(settingsContainer);

      new ElementBuilder('select')
        .addHTMLContent(
          `
          <option value="visible">Visible</option>
          <option value="hidden">Hidden</option>
          <option value="disabled">Disabled</option>
          <option value="focusable">Focusable</option>
        `
        )
        .appendTo(settingsContainer);

      new ElementBuilder('select')
        .addHTMLContent(
          `
          <option value="visible">Visible</option>
          <option value="hidden">Hidden</option>
          <option value="disabled">Disabled</option>
          <option value="focusable">Focusable</option>
          <option value="focusable">Inside iframe</option>
          <option value="focusable">Inside shadow dom</option>
          <option value="focusable">Inside iframe or shadow dom</option>
        `
        )
        .appendTo(settingsContainer);

      new ElementBuilder('div')
        .addHTMLContent(
          `
          <ul>
          <li>Show the sorting button in the </li>
          <li>Show the jsonviewer and editor</li>
          <li>Export to file or console when exporting</li>
          </ul>
        `
        )
        .appendTo(settingsContainer);
    }

    settingsOverlay.style.display =
      settingsOverlay.style.display === 'none' || !settingsOverlay.style.display
        ? 'flex'
        : 'none';
  }

  function toggleExportOverlay(contentType) {
    let exportOverlay = document.getElementById('export-overlay');
    let fileName;
    let copyButton;

    if (contentType === 'selectors') {
      fileName = 'export-selectors.json';
    } else if (contentType === 'data') {
      fileName = 'export-data.json';
    } else if (contentType === 'actions') {
      fileName = 'export-actions.json';
    } else if (contentType === 'assertions') {
      fileName = 'export-assertions.json';
    }

    if (!exportOverlay) {
      // Create overlay
      exportOverlay = new ElementBuilder('div')
        .setAttributes({ id: 'export-overlay' })
        .appendTo(document.body)
        .getElement();

      // Create container
      const exportContainer = new ElementBuilder('div')
        .setAttributes({ id: 'export-container' })
        .appendTo(exportOverlay)
        .getElement();

      // Create close button
      new ElementBuilder('button')
        .addTextContent('Close')
        .addClass('export-close-button')
        .addEventListener('click', () => {
          exportOverlay.style.display = 'none';
        })
        .appendTo(exportContainer);

      const newFilenameContainer = new ElementBuilder('div')
        .setAttributes({ id: 'filename-container', class: '' })
        .appendTo(exportContainer)
        .getElement();

      // Create input for file name
      new ElementBuilder('input')
        .setAttributes({ id: 'export-filename', value: fileName, type: 'text' })
        .appendTo(newFilenameContainer)
        .getElement();

      // Create Export button
      new ElementBuilder('button')
        .addTextContent('Export to JSON')
        .addClass('export-json-button')
        .addEventListener('click', () => {
          const exportName = document.getElementById('export-filename').value;
          const data = document.getElementById('export-textarea').value;

          // Function to download the content as JSON
          const downloadObjectAsJson = (exportObj, exportName) => {
            const dataStr =
              'data:text/json;charset=utf-8,' + encodeURIComponent(exportObj);
            const downloadAnchorNode = document.createElement('a');
            downloadAnchorNode.setAttribute('href', dataStr);
            downloadAnchorNode.setAttribute('download', exportName);
            document.body.appendChild(downloadAnchorNode);
            downloadAnchorNode.click();
            downloadAnchorNode.remove();
          };

          downloadObjectAsJson(data, exportName); // Call the function to download the file
        })
        .appendTo(newFilenameContainer)
        .getElement();

      // Create textarea for displaying exported content
      const exportTextAreaContainer = new ElementBuilder('div')
        .setStyle({
          position: 'relative', // To position the copy button inside this container
        })
        .appendTo(exportContainer)
        .getElement();

      new ElementBuilder('textarea')
        .setAttributes({ id: 'export-textarea', readonly: 'true' })
        .appendTo(exportTextAreaContainer)
        .getElement();

      // Create Copy button positioned inside the textarea container
      copyButton = new ElementBuilder('button')
        .addTextContent('Copy')
        .addClass('copy-text-area-button')
        .addEventListener('click', () => {
          const textArea = document.getElementById('export-textarea');
          const textToCopy = textArea.value;

          // Use the Clipboard API to copy the text
          navigator.clipboard
            .writeText(textToCopy)
            .then(() => {
              // Temporarily change button text to "Copied" with animation
              copyButton.textContent = 'Copied!';
              copyButton.classList.add('copied');
              setTimeout(() => {
                copyButton.textContent = 'Copy';
                copyButton.classList.remove('copied');
              }, 1000); // Revert back to "Copy" after 500ms
            })
            .catch(err => {
              console.error('Failed to copy text: ', err);
            });
        })
        .appendTo(exportTextAreaContainer) // Append inside the textarea container
        .getElement();
    }

    // Set overlay content based on the contentType requested (selectors, data, actions, assertions)
    const exportTextArea = document.getElementById('export-textarea');
    let data;

    if (contentType === 'selectors') {
      data = exportSelectors();
    } else if (contentType === 'data') {
      data = exportData();
    } else if (contentType === 'actions') {
      data = exportActions();
    } else if (contentType === 'assertions') {
      data = exportAssertions();
    }

    // Remove escape characters from JSON when displaying
    if (typeof data === 'object') {
      data = JSON.stringify(data, null, 2)
        .replace(/\\n/g, '\n') // Remove escaped newlines
        .replace(/\\t/g, '\t') // Remove escaped tabs
        .replace(/\\"/g, '"') // Unescape double quotes
        .replace(/\\\\/g, '\\'); // Unescape backslashes
    }
    exportTextArea.value = data;
    // Auto-populate the file name based on the content type
    document.getElementById('export-filename').value = fileName;

    // Show the overlay
    exportOverlay.style.display = 'flex';
  }

  // Add keyboard listeners for activating/deactivating the widget
  function addKeyboardShortcuts() {
    window.addEventListener('keydown', handleKeydown);
  }

  function handleKeydown(e) {
    if (e.ctrlKey && e.shiftKey && e.key === 'H') {
      toggleWidgetActivation();
    }
  }

  // Remove keyboard listeners for activating/deactivating the widget
  function removeKeyboardShortcuts() {
    window.removeEventListener('keydown', handleKeydown);
  }

  // Initialize the widget with drag select as the default tool
  function initWidget() {
    toggleWidgetActivation();
    toggleDragSelectMode(); // Default to drag select
    addKeyboardShortcuts();
    console.log(
      'Hold and drag the mouse to select interactive elements. A widget will show the selected items.'
    );
  }

  // Initialize the widget
  initWidget();
})();
