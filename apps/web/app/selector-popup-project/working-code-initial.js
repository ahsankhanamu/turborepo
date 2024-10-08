(function () {
  let startX, startY, selectionBox;
  let selectedElements = new Map(); // Use Map to store key-value pairs
  let scrollSpeed = 20;
  let popup,
    popupTopBar,
    popupContent,
    isMinimized = false;
  let popupSelectedItems = new Set(); // Track selected items inside the popup
  let isDraggingPopup = false;
  let isDraggingSelection = false;
  let scrollInterval;
  let popupOffsetX = 0,
    popupOffsetY = 0;
  let secondBar;

  // Default and hover outline styles
  const defaultOutlineStyle = '2px solid blue';
  const hoverOutlineStyle = '3px dashed orange';

  // Prevent text selection during dragging
  function preventTextSelection() {
    document.body.style.userSelect = 'none';
  }

  // Restore text selection after dragging
  function restoreTextSelection() {
    document.body.style.userSelect = '';
  }

  // Utility function to convert text to camelCase
  function toCamelCase(str) {
    return str
      .replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) =>
        index === 0 ? match.toLowerCase() : match.toUpperCase(),
      )
      .replace(/\s+/g, '');
  }

  // Generate a unique string format for each element
  function getElementIdentifier(element) {
    const tag = element.tagName.toLowerCase();
    const id = element.id ? `#${element.id}` : '';
    const className = element.classList.length ? `.${[...element.classList].join('.')}` : '';
    return `${tag}${id}${className}`;
  }

  // Generate the selector based on element attributes
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
        'aria-labelledby',
      )}"]`;
    }
    return `//${element.tagName.toLowerCase()}`;
  }

  // Determine suffix for element type
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
      if (element.type === 'button' || element.type === 'submit' || element.type === 'reset')
        return 'Button';
    }
    if (element.tagName === 'SELECT') return 'Select';
    return '';
  }

  // Check if the element is clickable or focusable
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
    ); // Includes elements that are focusable (tabbable)
  }

  // Create and style the selection box
  function createSelectionBox() {
    selectionBox = document.createElement('div');
    selectionBox.style.position = 'absolute';
    selectionBox.style.border = '2px dashed blue';
    selectionBox.style.backgroundColor = 'rgba(173, 216, 230, 0.3)';
    // selectionBox.style.pointerEvents = "all";
    document.body.appendChild(selectionBox);
  }

  // Update the position and size of the selection box using pageX and pageY
  function updateSelectionBox(pageX, pageY) {
    const width = Math.abs(pageX - startX);
    const height = Math.abs(pageY - startY);
    selectionBox.style.width = `${width}px`;
    selectionBox.style.height = `${height}px`;
    selectionBox.style.left = `${Math.min(pageX, startX)}px`;
    selectionBox.style.top = `${Math.min(pageY, startY)}px`;
  }

  // Check if an element is in the selection box
  function isElementInSelection(element) {
    if (popup && popup.contains(element)) {
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

  // Scroll the page if the mouse is near the edges
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

  // Mouse down event to start the selection process
  function onMouseDown(event) {
    if (popupContent && popupContent.contains(event.target)) {
      return;
    }
    if (popupTopBar && popupTopBar.contains(event.target)) {
      isDraggingPopup = true;
      popupOffsetX = event.clientX - popup.getBoundingClientRect().left;
      popupOffsetY = event.clientY - popup.getBoundingClientRect().top;

      window.addEventListener('mousemove', onMouseMove);
      window.addEventListener('mouseup', onMouseUp);
      return;
    }
    preventTextSelection();
    startX = event.pageX;
    startY = event.pageY;
    isDraggingSelection = true;

    createSelectionBox();

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }

  // Mouse move event to update the selection box as the user drags
  function onMouseMove(event) {
    if (isDraggingPopup) {
      popup.style.left = `${event.clientX - popupOffsetX}px`;
      popup.style.top = `${event.clientY - popupOffsetY}px`;
      return;
    }

    if (isDraggingSelection) {
      updateSelectionBox(event.pageX, event.pageY);
      autoScroll(event);
      startAutoScroll(event);
    }
  }

  // Mouse up event to complete the selection and gather elements
  function onMouseUp(event) {
    if (isDraggingPopup) {
      isDraggingPopup = false;
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      return;
    }

    if (isDraggingSelection) {
      isDraggingSelection = false;

      // Collect all focusable and clickable elements within the selection box
      const allElements = document.querySelectorAll(
        'a, button, input, textarea, select, [onclick], [role="button"], [tabindex]',
      );

      allElements.forEach((element) => {
        if (
          isInteractive(element) &&
          isElementInSelection(element) &&
          !selectedElements.has(element)
        ) {
          selectedElements.set(element, ''); // Initialize with empty key name
          element.style.outline = defaultOutlineStyle;
        }
      });

      document.body.removeChild(selectionBox);
      restoreTextSelection();
      stopAutoScroll();

      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);

      createPopup();
      populatePopup();
    }
  }

  // Create a popup to display the selected elements
  function createPopup() {
    if (popup) {
      popupContent.innerHTML = '';
      return;
    }

    popup = document.createElement('div');
    popup.setAttribute('id', 'popup');

    popupTopBar = document.createElement('div');
    popupTopBar.setAttribute('id', 'popup-top-bar');

    popupTopBar.innerHTML = '<span>Selected Elements</span>';

    const minimizeButton = document.createElement('button');
    minimizeButton.textContent = '-';

    popupTopBar.appendChild(minimizeButton);

    minimizeButton.addEventListener('click', () => {
      isMinimized = !isMinimized;
      popupContent.style.display = isMinimized ? 'none' : 'block';
      minimizeButton.textContent = isMinimized ? '+' : '-';
      popup.style.width = isMinimized ? '300px' : '400px';
    });

    popupContent = document.createElement('div');
    popupContent.classList.add('popup-content'); // Uses CSS for styling

    popup.appendChild(popupTopBar);
    popup.appendChild(popupContent);

    // Create a container for the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.classList.add('button-container');

    // Create Export Selectors button
    const exportSelectorsButton = document.createElement('button');
    exportSelectorsButton.classList.add('exportSelectorButton');
    exportSelectorsButton.textContent = 'Export Selectors';

    exportSelectorsButton.addEventListener('click', exportSelectors);
    buttonContainer.appendChild(exportSelectorsButton);

    // Create Export Data button
    const exportDataButton = document.createElement('button');
    exportDataButton.classList.add('exportDataButton');
    exportDataButton.textContent = 'Export Data';

    exportDataButton.addEventListener('click', exportData);
    buttonContainer.appendChild(exportDataButton);

    popup.appendChild(buttonContainer);
    createSecondBar(); // Adds the select all, settings, and dynamic buttons

    document.body.appendChild(popup);
  }

  function createSecondBar() {
    secondBar = document.createElement('div');
    secondBar.setAttribute('class', 'second-bar button-container'); // Uses CSS for styling

    // Select All checkbox
    const selectAllCheckbox = document.createElement('input');
    selectAllCheckbox.type = 'checkbox';
    selectAllCheckbox.addEventListener('change', handleSelectAll);
    secondBar.appendChild(selectAllCheckbox);

    // Settings button
    const settingsButton = document.createElement('button');
    settingsButton.textContent = '⚙️';
    settingsButton.style.border = 'none';
    settingsButton.style.cursor = 'pointer';
    settingsButton.addEventListener('click', toggleSettingsOverlay);
    secondBar.appendChild(settingsButton);

    dynamicButtonsContainer = document.createElement('div');
    dynamicButtonsContainer.setAttribute('class', 'dynamic-buttons-container button-container'); // Uses CSS for styling
    secondBar.appendChild(dynamicButtonsContainer);

    popup.appendChild(secondBar);
  }

  function handleSelectAll(event) {
    const isChecked = event.target.checked;
    popupSelectedItems.clear();
    if (isChecked) {
      selectedElements.forEach((_, key) => {
        popupSelectedItems.add(key);
      });
    }

    updateDynamicButtons();
  }

  function updateSelectAllCheckbox() {
    const selectedItemsSize = selectedElements.size;
    const popupSelectedItemsSize = popupSelectedItems.size;
    const selectAllCheckbox = secondBar.querySelector('input[type="checkbox"]');
    selectAllCheckbox.checked = popupSelectedItemsSize === selectedItemsSize;
    selectAllCheckbox.indeterminate =
      popupSelectedItemsSize > 0 && popupSelectedItemsSize < selectedItemsSize;
  }

  function updateDynamicButtons() {
    dynamicButtonsContainer.innerHTML = '';
    if (popupSelectedItems.size > 0) {
      const deleteAllButton = document.createElement('button');
      deleteAllButton.textContent = 'Delete All';
      deleteAllButton.classList.add('delete-button'); // Uses CSS for styling
      deleteAllButton.addEventListener('click', () => {
        let newSelectedElements = new Map();
        selectedElements.forEach((value, element) => {
          if (!popupSelectedItems.has(element)) {
            newSelected.set(element);
          } else {
            element.style.outline = ''; // Remove the outline from the element on the page
          }
        });
        selectedElements = newSelectedElements;
        popupSelectedItems.clear();
        populatePopup();
      });

      const copyButton = document.createElement('button');
      copyButton.classList.add('copy-button');
      copyButton.textContent = 'Copy';
      copyButton.addEventListener('click', () => {
        const exportData = {};
        popupSelectedItems.size < 1
          ? selectedElements.forEach((selectorName, element) => {
              exportData[selectorName] = getSelector(element);
            })
          : popupSelectedItems.forEach((element) => {
              exportData[selectedElements.get(element)] = getSelector(element);
            });
        console.log('Copied Data:', exportData);
        navigator.clipboard.writeText(JSON.stringify(exportData));
      });

      const groupButton = document.createElement('button');
      groupButton.classList.add('group-button');
      groupButton.textContent = 'Group';
      groupButton.addEventListener('click', () => {
        const groupName = prompt('Enter Group Name:');
        if (groupName) {
          popupSelectedItems.forEach((element) => {
            selectedElements.set(element, groupName);
          });
          populatePopup();
          updateDynamicButtons();
        }
      });

      dynamicButtonsContainer.appendChild(deleteAllButton);
      dynamicButtonsContainer.appendChild(copyButton);
      dynamicButtonsContainer.appendChild(groupButton);
    }
  }

  // Populate the popup with the list of selected elements
  function populatePopup() {
    popupContent.innerHTML = ''; // Clear previous content
    selectedElements.forEach((_, element) => {
      const li = document.createElement('div');
      li.classList.add('selectorListItem');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = popupSelectedItems.has(element);
      checkbox.classList.add('popup-item-checkbox'); // Uses CSS for styling
      checkbox.addEventListener('change', () => {
        if (checkbox.checked) {
          popupSelectedItems.add(element);
        } else {
          popupSelectedItems.delete(element);
        }
        updateSelectAllCheckbox();
        updateDynamicButtons();
      });

      const identifier = getElementIdentifier(element);

      const input = document.createElement('input');
      input.type = 'text';
      input.placeholder = 'Enter Key Name';
      input.value =
        typeof selectedElements.get(element) === 'string' ? selectedElements.get(element) : 'X';
      input.style.width = '150px';
      input.addEventListener('blur', (e) => {
        const keyName = toCamelCase(e.target.value) + getSuffix(element);
        selectedElements.set(element, keyName);
      });

      const label = document.createElement('span');
      label.classList.add('selector-identifier');
      label.textContent = identifier;

      const deleteButton = document.createElement('button');
      deleteButton.classList.add('delete-row-button');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', () => {
        selectedElements.delete(element);
        element.style.outline = ''; // Remove the outline from the element on the page
        li.remove();
      });

      li.appendChild(input);
      li.appendChild(label);
      li.appendChild(deleteButton);

      li.addEventListener('mouseenter', () => {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        element.style.outline = hoverOutlineStyle; // Highlight element on hover
      });

      li.addEventListener('mouseleave', () => {
        element.style.outline = defaultOutlineStyle; // Revert to default outline
      });

      popupContent.appendChild(li);
    });
  }

  // Export selectors to an object
  function exportSelectors() {
    const exportObject = {};
    selectedElements.forEach((keyName, element) => {
      if (keyName) {
        exportObject[keyName] = getSelector(element);
      }
    });
    console.log(exportObject);
  }

  // Export selected elements data for further use
  function exportData() {
    const exportData = {};
    selectedElements.forEach((selectorName, element) => {
      let value;

      // Capture value based on element type
      if (element.tagName === 'INPUT') {
        if (
          element.type === 'text' ||
          element.type === 'email' ||
          element.type === 'password' ||
          element.type === 'search'
        ) {
          value = element.value; // Capture text input value
        } else if (element.type === 'checkbox' || element.type === 'radio') {
          value = element.checked; // Capture checked state
        }
      } else if (element.tagName === 'TEXTAREA') {
        value = element.value; // Capture textarea value
      } else if (element.tagName === 'SELECT') {
        const selectedOption = element.options[element.selectedIndex];
        value = selectedOption ? selectedOption.textContent : ''; // Capture text of the selected option
      } else if (element.tagName === 'BUTTON') {
        value = element.textContent; // Capture button text
      }

      // Add value to export data
      if (selectorName) {
        exportData[selectorName] = value;
      }
    });

    console.log('Exported Data:', exportData);
    return exportData;
  }

  function toggleSettingsOverlay() {
    let settingsOverlay = document.getElementById('settings-overlay');
    if (!settingsOverlay) {
      settingsOverlay = document.createElement('div');
      settingsOverlay.id = 'settings-overlay'; // Uses CSS for styling

      const settingsContainer = document.createElement('div');
      settingsContainer.id = 'settings-container'; // Uses CSS for styling

      const closeButton = document.createElement('button');
      closeButton.textContent = 'Close';
      closeButton.addEventListener('click', toggleSettingsOverlay);
      settingsContainer.appendChild(closeButton);

      const filterLabel = document.createElement('label');
      filterLabel.textContent = 'Sort/Filter Elements by:';
      filterLabel.style.display = 'block';
      filterLabel.style.marginBottom = '10px';

      const sortFilterSelect = document.createElement('select');
      sortFilterSelect.innerHTML = `
      <option value="visible">Visible</option>
      <option value="hidden">Hidden</option>
      <option value="disabled">Disabled</option>
      <option value="focusable">Focusable</option>
    `;

      settingsContainer.appendChild(filterLabel);
      settingsContainer.appendChild(sortFilterSelect);

      settingsOverlay.appendChild(settingsContainer);
      document.body.appendChild(settingsOverlay);
    }

    settingsOverlay.style.display =
      settingsOverlay.style.display === 'none' || !settingsOverlay.style.display ? 'flex' : 'none';
  }

  // Add the mousedown listener to start the selection process
  window.addEventListener('mousedown', onMouseDown);

  console.log(
    'Hold and drag the mouse to select interactive elements. A popup will show the selected items.',
  );
})();
