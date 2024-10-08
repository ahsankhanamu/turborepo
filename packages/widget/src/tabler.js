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
    classNames
      .filter((className) => typeof className === 'string' && className.trim()) // Filter only non-empty strings
      .forEach((className) => {
        this.element.classList.add(...className.split(' '));
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

const cssString = `
.table{
    overflow: hidden;
    display: block;
    width: 100%;
    table-layout: fixed;
    border-spacing: 0;
    padding: 0;
    border-collapse: collapse;
}
.tbody{
    display: block;
}
.line-item-row {
  color: rgb(32, 33, 36);
  cursor: pointer;
}
.line-item-row[draggable="false"] {
  -webkit-user-drag: none;
  user-select: none;
}
.line-item-row:focus {
  outline: none;
}
.line-item-row {
  padding-bottom: 10px;
  padding-top: 10px;
  box-shadow: rgba(100, 121, 143, 0.12) 0px -1px 0px 0px inset;
  display: flex;
  position: relative;
}
.line-item-row:hover {
  box-shadow:
    rgb(218, 220, 224) 1px 0px 0px inset,
    rgb(218, 220, 224) -1px 0px 0px inset,
    rgba(60, 64, 67, 0.3) 0px 1px 2px 0px,
    rgba(29, 40, 49, 0.15) 0px 1px 3px 1px;
  z-index: 2;
}
.row-color-normal {
  color: rgb(32, 33, 36);
  background: none;
}
.visited-row {
  background: rgba(0, 0, 0, 0.09);
  color: rgb(32, 33, 36);
}
.selected-row {
  color: rgb(32, 33, 36);
  background: #c2dbff;
}
.last-active-row {
  box-shadow:
    inset 1px 0 0 #dadce0,
    inset -1px 0 0 #dadce0,
    0 1px 2px 0 rgba(60, 64, 67, 0.3),
    0 1px 3px 1px rgba(60, 64, 67, 0.15);
  z-index: 1;
}
body,
td,
input,
textarea,
select {
  margin: 0px;
}
.row-last-selected-indicator-cell {
  width: 2px;
  background: transparent;
}
.cell-layout {
  border-bottom: 1px solid rgba(100, 121, 143, 0.12);
  empty-cells: show;
  font-size: 0.875rem;
  height: 20px;
  outline: none;
  padding: 0px;
  vertical-align: middle;
  white-space: nowrap;
  -webkit-box-align: center;
  align-items: center;
  border: none;
  display: flex;
  -webkit-box-flex: 0;
  flex: 0 0 auto;
  line-height: 20px;
  -webkit-box-ordinal-group: 2;
  order: 1;
  padding: 0px;
}
.line-item-row > .row-last-selected-indicator-cell {
  background: none;
  border: none;
  order: -1;
  width: 3px;
}
.line-item-row.last-active-row > .row-last-selected-indicator-cell::before {
  background-color: #4d90f0;
  content: "";
  display: block;
  height: 100%;
  position: absolute;
  top: 0;
  width: 3px;
}

/* Styles for the checkbox cell */
td.row-checkbox-cell {
  text-align: left;
  background: none;
  padding: 0px;
  -webkit-box-ordinal-group: 1;
  order: 0;
  padding: 0px 10px 0px 13px;
  position: relative;
  width: 20px;
}
td.row-checkbox-cell::before {
  inset: 0px 0px 0px -2px;
  height: 20px;
  width: 20px;
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  background-image: url("https://www.gstatic.com/images/icons/material/system_gm/1x/drag_indicator_black_20dp.png");
}
.hovered-row > td.row-checkbox-cell::before {
  opacity: 0.32;
}
.checkbox-layout {
  font-size: 1px;
  vertical-align: text-bottom;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: center;
  justify-content: center;
  outline: none;
  position: relative;
  z-index: 0;
  border: none;
  box-shadow: none;
  display: inline-flex;
  height: 20px;
  margin: 0px;
  opacity: 0.71;
  width: 20px;
  background-color: transparent;
  background-image: url("https://www.gstatic.com/images/icons/material/system_gm/1x/check_box_outline_blank_black_20dp.png");
}
.checkbox-layout:not(.checkbox-layout-disabled) {
  cursor: pointer;
}
.hovered-row > .cell-layout > .checkbox-layout,
.last-active-row > .cell-layout > .checkbox-layout,
.cell-layout > .row-checkbox-selected {
  opacity: 1;
}
.checkbox-layout::before {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
  background: none;
  border-radius: 50%;
  box-sizing: border-box;
  transform: scale(0);
  transition-property:
    transform,
    opacity,
    -webkit-transform;
  inset: -10px;
}
.checkbox-layout::after,
.row-checkbox-selected::after {
  height: 40px;
  width: 30px;
  content: "";
  height: 200%;
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
}
.checkbox-layout:hover,
.checkbox-layout:focus,
.checkbox-layout:active {
  opacity: 1;
  border: none;
}
.checkbox-layout:hover::before,
.checkbox-layout.checkbox-layout-hover::before {
  background-color: rgba(32, 33, 36, 0.06);
  border: none;
  box-shadow: none;
  opacity: 1;
  transform: scale(1);
}
.checkbox-layout:focus::before,
.checkbox-layout.checkbox-layout-focus::before {
  background-color: rgba(32, 33, 36, 0.12);
  border: none;
  box-shadow: rgb(189, 193, 198) 0px 0px 0px 1px inset;
  opacity: 1;
  transform: scale(1);
}
.checkbox-layout:active::before,
.checkbox-layout.checkbox-layout-active::before {
  background-color: rgba(32, 33, 36, 0.12);
  border: none;
  box-shadow: none;
  opacity: 1;
  transform: scale(1);
}
.row-checkbox-selected .checkbox-checked-fallback {
  display: none;
  height: 15px;
  outline: 0px;
  width: 15px;
  left: 0px;
  position: relative;
  top: -3px;
  background: url(//ssl.gstatic.com/ui/v1/menu/checkmark.png) no-repeat -5px -3px;
  background-image: -webkit-image-set(url(//ssl.gstatic.com/ui/v1/menu/checkmark.png) 1x, url(//ssl.gstatic.com/ui/v1/menu/checkmark_2x.png) 2x);
}

/* Styles for the star column */
.line-item-row > td.row-star-cell {
  padding: 0px 10px 0px 0px;
  -webkit-box-ordinal-group: 1;
  order: 0;
  width: 20px;
}
.star-layout {
  text-align: center;
  align-items: center;
  border: none;
  display: inline-flex;
  justify-content: center;
  outline: none;
  position: relative;
  z-index: 0;
  height: 20px;
  margin: 0px;
  padding: 0px;
  top: 0px;
  width: 20px;
  transition: opacity 0.15s cubic-bezier(0.4, 0, 0.2, 1);
}
.star-layout::before {
  content: image-set(url("") 1x, url("") 2x);
  display: block;
  height: 20px;
  width: 20px;
  background-image: url("https://www.gstatic.com/images/icons/material/system_gm/1x/star_border_black_20dp.png");
  opacity: 0.32;
}
.star-checked::before {
    opacity: 0.7;
}
.star-layout:hover::after,
.important-indicator:hover::after {
  background-color: rgba(32, 33, 36, 0.06);
  border: none;
  box-shadow: none;
  opacity: 1;
  transform: scale(1);
}
.star-layout:focus::after,
.important-indicator:focus::after {
  background-color: rgba(32, 33, 36, 0.12);
  border: none;
  box-shadow: rgb(189, 193, 198) 0px 0px 0px 1px inset;
  opacity: 1;
  transform: scale(1);
}
.star-layout:active::after,
.important-indicator:active::after {
  background-color: rgba(32, 33, 36, 0.12);
  border: none;
  box-shadow: none;
  opacity: 1;
  transform: scale(1);
}
.star-layout::after,
.important-indicator::after {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
  background: none;
  border-radius: 50%;
  box-sizing: border-box;
  transform: scale(0);
  transition-property:
    transform,
    opacity,
    -webkit-transform;
  inset: -10px;
  width: 40px;
  height: 40px;
}
.hovered-row > td.row-star-cell > .star-layout::before,
.last-active-row > td.row-star-cell > .star-layout::before,
.hovered-row > td.row-star-cell > .important-indicator::before,
.last-active-row > td.row-star-cell > .important-indicator::before {
  opacity: 1;
}
.star-layout:hover::before,
.star-layout:focus::before,
.star-layout:active::before {
  opacity: 1;
}
.star-img-fallback {
  display: none;
}

/* Styles for important cell */
.row-important-cell {
  width: 26px;
  padding-left: 3px;
  padding-top: 0px;
  padding-bottom: 0px;
  padding: 0px 10px 0px 0px;
  width: 20px;
  -webkit-box-ordinal-group: 1;
  order: 0;
}
.pG {
  height: 10px;
  width: 14px;
  font-size: 0px;
  padding-bottom: 0px;
  position: relative;
  width: 19px;
  height: 19px;
  cursor: pointer;
}
.row-important-cell .pG {
  -webkit-box-align: center;
  align-items: center;
  display: flex;
  height: 20px;
  -webkit-box-pack: center;
  justify-content: center;
  width: 20px;
}
.d-none {
  display: none;
}
.aol {
  font-weight: normal;
  font-style: italic;
}
.important-indicator {
  display: inline-flex;
  position: relative;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  background-image: url("//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/label_important_baseline_nv700_20dp.png");
  border: none;
  z-index: 0;
  outline: none;
  height: 20px;
  width: 20px;
}
.important-indicator-selected {
  background-image: url(//ssl.gstatic.com/ui/v1/icons/mail/gm3/2x/label_important_fill_googyellow500_20dp.png);
}
/* Styles for participants */
.row-title-cell {
  padding-right: 6px;
  padding-left: 10px;
  display: flex;
  flex-basis: 168px;
  max-width: 168px;
  padding-left: 0px;
  padding-right: 32px;
}
.row-csv-content {
  display: none;
}
.zF,
.bqe,
.short-date {
  font-weight: 700;
}
.participants-summary,
.row-subject-container,
.xS,
.as {
  white-space: nowrap;
  overflow: hidden;
}
.xS {
  white-space: nowrap;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
}
.participants-summary {
  -webkit-font-smoothing: antialiased;
  font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  letter-spacing: normal;
  white-space: pre;
  -webkit-box-align: baseline;
  align-items: baseline;
  display: flex;
  -webkit-box-flex: 1;
  flex-grow: 1;
  -webkit-box-ordinal-group: 2;
  order: 1;
}
/* Styles for main content */
.row-main-cell {
  overflow: visible;
  flex-wrap: wrap;
  -webkit-font-smoothing: antialiased;
  font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-size: 0.875rem;
  letter-spacing: normal;
  display: flex;
  -webkit-box-flex: 1;
  flex: 1 1 auto;
  height: auto;
  min-width: 0px;
  padding-right: 10px;
}
.xT {
  white-space: nowrap;
  overflow: hidden;
  -webkit-box-align: baseline;
  align-items: baseline;
  display: flex;
  align-items: center;
}
.row-subject-container {
  white-space: nowrap;
}
.threads {
  -moz-osx-font-smoothing: auto;
  -webkit-font-smoothing: auto;
  font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-size: 0.75rem;
  letter-spacing: normal;
  color: rgb(95, 99, 104);
  margin-left: 4px;
}
.yi,
.row-subject-container {
  -webkit-box-align: baseline;
  align-items: baseline;
  display: inline-flex;
  flex-shrink: 0;
  line-height: 20px;
}
.row-main-cell .row-subject-container {
  flex-shrink: 1;
}
.nowrap-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.row-content-container {
  color: rgb(95, 99, 104);
}
.row-content-container {
  flex: 1 1 0px;
  -webkit-box-flex: 1;
  text-align: left;
}
.Zt {
  color: rgb(95, 99, 104);
  float: left;
}
.line-item-row > .cell-layout.byZ {
  padding-right: 16px;
}
.line-item-row > .cell-layout.byZ:empty,
.line-item-row > .cell-layout.byZ:not(:empty) ~ .row-timestamp-cell {
  display: none;
}
.row-timestamp-cell {
  text-align: right;
}

.line-item-row.hovered-row > .row-timestamp-cell,
.line-item-row.buL > .row-timestamp-cell,
.line-item-row.cP > .row-timestamp-cell {
  display: none;
}
.row-timestamp-cell {
  padding-left: 8px;
  padding-right: 20px;
}
.line-item-row > .row-timestamp-cell {
  -webkit-font-smoothing: auto;
  font-family: "Google Sans", Roboto, RobotoDraft, Helvetica, Arial, sans-serif;
  font-size: 0.75rem;
  letter-spacing: normal;
  flex-basis: 56px;
  -webkit-box-pack: end;
  justify-content: flex-end;
  padding-left: 0px;
  padding-right: 16px;
}

/* Styles for action buttons */
.line-item-row > .cell-layout.row-action-cell {
  display: none;
}
.line-item-row.hovered-row > .cell-layout.row-action-cell,
.line-item-row.buL > .cell-layout.row-action-cell,
.line-item-row.cP > .cell-layout.row-action-cell {
  display: flex;
}
.row-action-buttons-list {
  display: flex;
  margin-right: 6px;
  padding: 0px;
}
.row-action-item-button {
  height: 20px;
  opacity: 0.71;
  width: 20px;
  -webkit-box-align: center;
  align-items: center;
  border: none;
  display: inline-flex;
  -webkit-box-pack: center;
  justify-content: center;
  outline: none;
  position: relative;
  z-index: 0;
  cursor: pointer;
  list-style: none;
  margin: 0px 10px;
}
.row-action-item-button {
  opacity: 0.7;
}
.row-action-item-button:not(.pW):hover,
.row-action-item-button:not(.pW):focus,
.row-action-item-button:not(.pW):active {
  opacity: 1;
}
.row-action-item-button:not(.pW)::before {
  content: "";
  display: block;
  opacity: 0;
  position: absolute;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  z-index: -1;
  background: none;
  border-radius: 50%;
  box-sizing: border-box;
  transform: scale(0);
  transition-property:
    transform,
    opacity,
    -webkit-transform;
  inset: -10px;
}
.row-action-item-button:not(.pW)::after {
  content: "";
  height: 200%;
  position: absolute;
  top: -50%;
  left: -50%;
  width: 200%;
}
.row-action-item-button:not(.pW):hover::before {
  background-color: rgba(255, 255, 255, 0.2);
  border: none;
  box-shadow: none;
  opacity: 1;
  transform: scale(1);
}
.row-action-item-button:not(.pW):focus::before {
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  box-shadow: rgb(255, 255, 255) 0px 0px 0px 1px inset;
  opacity: 1;
  transform: scale(1);
}
.row-action-item-button:not(.pW):active::before,
.row-action-item-button.bz5::before {
  background-color: rgba(255, 255, 255, 0.3);
  border: none;
  box-shadow: none;
  opacity: 1;
  transform: scale(1);
}
.row-checkbox-cell::before,
.checkbox-layout,
.row-checkbox-selected,
.star-layout,
.star-layout::before,
.star-checked::before,
.important-indicator,
.row-archive,
.row-delete,
.row-toggle-read-unread,
.row-snooze {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 20px;
}
.row-archive {
  background-image: url("https://www.gstatic.com/images/icons/material/system_gm/1x/archive_black_20dp.png");
}
.row-archive {
  background-image: url("//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/archive_baseline_nv700_20dp.png");
}
.row-delete {
  background-image: url("https://www.gstatic.com/images/icons/material/system_gm/1x/delete_black_20dp.png");
}
.row-delete {
  background-image: url("//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/delete_baseline_nv700_20dp.png");
}
.row-toggle-read-unread {
  background-image: url("https://www.gstatic.com/images/icons/material/system_gm/1x/drafts_black_20dp.png");
}
.row-toggle-read-unread {
  background-image: url("//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/drafts_baseline_nv700_20dp.png");
}
.row-snooze {
  background-image: url("https://www.gstatic.com/images/icons/material/system_gm/1x/watch_later_black_20dp.png");
}
.row-snooze {
  background-image: url("//ssl.gstatic.com/ui/v1/icons/mail/gm3/1x/schedule_baseline_nv700_20dp.png");
}
.row-timestamp-cell {
  text-align: right;
}
.visited-row > .row-timestamp-cell {
  color: rgb(95, 99, 104);
}
@media (min-resolution: 144dpi), (-webkit-min-device-pixel-ratio: 1.5) {
  td.row-checkbox-cell::before {
    background-image: url(https://www.gstatic.com/images/icons/material/system_gm/2x/drag_indicator_black_20dp.png);
  }
  .cell-layout > .checkbox-layout {
    background-image: url(//ssl.gstatic.com/ui/v1/icons/mail/gm3/2x/check_box_outline_blank_baseline_nv700_20dp.png);
  }
  .cell-layout > .row-checkbox-selected {
    background-image: url(//ssl.gstatic.com/ui/v1/icons/mail/gm3/2x/check_box_baseline_nv700_20dp.png);
  }
  td.row-star-cell > .star-layout::before {
    background-image: url(//ssl.gstatic.com/ui/v1/icons/mail/gm3/2x/star_baseline_nv700_20dp.png);
  }
  td.row-star-cell > .star-layout.star-checked::before {
    background-image: url(//ssl.gstatic.com/ui/v1/icons/mail/gm3/2x/star_fill_googyellow500_20dp.png);
  }
  .important-indicator-selected {
    background-image: url(//ssl.gstatic.com/ui/v1/icons/mail/gm3/2x/label_important_fill_googyellow500_20dp.png);
  }
  .row-archive {
    background-image: url(//ssl.gstatic.com/ui/v1/icons/mail/gm3/2x/archive_baseline_nv700_20dp.png);
  }
  .row-delete {
    background-image: url(//ssl.gstatic.com/ui/v1/icons/mail/gm3/2x/delete_baseline_nv700_20dp.png);
  }
  .row-toggle-read-unread {
    background-image: url(//ssl.gstatic.com/ui/v1/icons/mail/gm3/2x/drafts_baseline_nv700_20dp.png);
  }
  .row-snooze {
    background-image: url(//ssl.gstatic.com/ui/v1/icons/mail/gm3/2x/schedule_baseline_nv700_20dp.png);
  }
}
`;
new ElementBuilder('style').addHTMLContent(cssString).appendTo(document.head);

// Function to create the last-selected indicator cell
function createLastSelectedIndicatorCell({ isLastSelected }) {
  // Create the main cell container with the specified classes
  const indicatorCell = new ElementBuilder('td').addClass(
    'row-last-selected-indicator-cell',
    'cell-layout',
  );

  // Conditionally add class if it's the last selected row
  if (isLastSelected) {
    indicatorCell.addClass('last-selected');
  }

  return indicatorCell.getElement(); // Return the completed indicator cell
}

// Example usage with an object argument
// const lastSelectedIndicatorData = {
//   isLastSelected: true, // Set true if it's the last selected row
// };

// const lastSelectedIndicatorCell = createLastSelectedIndicatorCell(lastSelectedIndicatorData);
// document.body.appendChild(lastSelectedIndicatorCell); // Append to the document for demonstration

// Function to create the checkbox cell with toggle functionality
// Function to create the checkbox cell with toggle functionality
function createCheckboxCell({ isChecked }) {
  // Create the main cell container
  const checkboxCell = new ElementBuilder('td')
    .addClass('row-checkbox-cell', 'cell-layout')
    .setAttributes({
      style:
        'cursor: url("//ssl.gstatic.com/ui/v1/icons/mail/images/2/openhand.cur") 7 5, default;',
      'data-tooltip': 'Select',
    });

  // Create the inner div for the checkbox layout with initial checked state
  const checkboxDiv = new ElementBuilder('div')
    .addClass('checkbox-layout')
    .addClass(isChecked ? 'row-checkbox-selected' : null) // Only add if isChecked is true
    .setAttributes({
      role: 'checkbox',
      'aria-checked': isChecked,
      dir: 'ltr',
      tabindex: '-1',
    })
    .appendTo(checkboxCell.getElement());

  // Add the fallback checkbox indicator
  new ElementBuilder('div')
    .addClass('checkbox-checked-fallback')
    .appendTo(checkboxDiv.getElement());

  // Toggle checkbox state on click
  checkboxDiv.getElement().addEventListener('click', () => {
    const currentlyChecked = checkboxDiv.getElement().getAttribute('aria-checked') === 'true';
    checkboxDiv.setAttributes({ 'aria-checked': !currentlyChecked });
    checkboxDiv.getElement().classList.toggle('row-checkbox-selected', !currentlyChecked);
  });

  return checkboxCell.getElement(); // Return the completed checkbox cell
}

// Example usage with an object argument
// const checkboxCellData = {
//   isChecked: true, // Initial checkbox state
// };

// const checkboxCell = createCheckboxCell(checkboxCellData);
// document.body.appendChild(checkboxCell); // Append to the document for demonstration

// Function to create the star cell with toggle functionality
// Function to create the star cell with toggle functionality
function createStarCell({ isStarred }) {
  // Create the main cell container
  const starCell = new ElementBuilder('td').addClass('row-star-cell', 'cell-layout');

  // Create the star span with appropriate initial classes and attributes
  const starSpan = new ElementBuilder('span')
    .addClass('star-layout')
    .addClass(isStarred ? 'star-checked' : '') // Only add 'star-checked' if isStarred is true
    .setAttributes({
      'aria-label': isStarred ? 'Starred' : 'Not starred',
      role: 'button',
      'data-tooltip': isStarred ? 'Starred' : 'Not starred',
    })
    .appendTo(starCell.getElement());

  // Add the star image inside the span
  new ElementBuilder('img')
    .addClass('star-img-fallback')
    .setAttributes({
      src: 'images/cleardot.gif',
      alt: isStarred ? 'Starred' : 'Not starred',
    })
    .appendTo(starSpan.getElement());

  // Toggle star status on click
  starSpan.getElement().addEventListener('click', () => {
    const currentlyStarred = starSpan.getElement().classList.contains('star-checked');
    starSpan.setAttributes({
      'aria-label': currentlyStarred ? 'Not starred' : 'Starred',
      'data-tooltip': currentlyStarred ? 'Not starred' : 'Starred',
    });

    // Toggle the 'star-checked' class
    if (currentlyStarred) {
      starSpan.getElement().classList.remove('star-checked');
    } else {
      starSpan.getElement().classList.add('star-checked');
    }

    // Update the fallback image's alt attribute to reflect the new state
    starSpan
      .getElement()
      .querySelector('.star-img-fallback')
      .setAttribute('alt', currentlyStarred ? 'Not starred' : 'Starred');
  });

  return starCell.getElement(); // Return the completed star cell
}

// Example usage with an object argument
// const starCellData = {
//   isStarred: false, // Initial star status
// };

// const starCell = createStarCell(starCellData);
// document.body.appendChild(starCell); // Append to the document for demonstration

// Function to create the important indicator cell with toggle functionality
function createImportantCell({ isImportant }) {
  // Create the main cell container
  const importantCell = new ElementBuilder('td').addClass('row-important-cell', 'cell-layout');

  // Create the div with switch role for importance indicator
  const importanceDiv = new ElementBuilder('div')
    .addClass(
      'pG',
      isImportant ? 'important-indicator-selected' : 'important-indicator-unselected',
      'important-indicator',
    )
    .setAttributes({
      'data-tooltip-contained': 'true',
      'data-tooltip-align': 'b,l',
      'data-tooltip-delay': '1500',
      role: 'switch',
      'aria-checked': isImportant,
      'data-is-important': isImportant,
      'aria-label': isImportant ? 'Important' : 'Not important',
    })
    .appendTo(importantCell.getElement());

  // Hidden tooltip text for toggling importance
  new ElementBuilder('div')
    .addClass('d-none')
    .addHTMLContent(
      `<span class="aol">Click to teach Gmail that this conversation is ${
        isImportant ? 'not important' : 'important'
      }.</span>`,
    )
    .appendTo(importanceDiv.getElement());

  // Important indicator, conditional based on initial state
  //   new ElementBuilder('div')
  //     .addClass(
  //       isImportant ? 'important-indicator-selected' : 'important-indicator-unselected',
  //       'important-indicator',
  //     )
  //     .appendTo(importanceDiv.getElement());

  // Additional div (bnj) for styling if needed
  new ElementBuilder('div').addClass('bnj').appendTo(importanceDiv.getElement());

  // Toggle important status on click
  importanceDiv.getElement().addEventListener('click', () => {
    const currentlyImportant =
      importanceDiv.getElement().getAttribute('data-is-important') === 'true';
    importanceDiv.setAttributes({
      'data-is-important': !currentlyImportant,
      'aria-checked': !currentlyImportant,
      'aria-label': !currentlyImportant ? 'Important' : 'Not important',
    });
    importanceDiv
      .getElement()
      .classList.toggle('important-indicator-selected', !currentlyImportant);
    importanceDiv
      .getElement()
      .classList.toggle('important-indicator-unselected', currentlyImportant);
    importanceDiv
      .getElement()
      .querySelector(
        '.d-none',
      ).innerHTML = `<span class="aol">Click to teach Gmail that this conversation is ${
      currentlyImportant ? 'important' : 'not important'
    }.</span>`;
  });

  return importantCell.getElement(); // Return the completed important cell
}

// Example usage with object argument
// const importantCellData = {
//   isImportant: false, // Initial important status
// };

// const importantCell = createImportantCell(importantCellData);
// document.body.appendChild(importantCell); // Append to the document for demonstration

// Function to create the title cell with a placeholder input
function createTitleCell({ placeholder }) {
  // Create the main cell container
  const titleCell = new ElementBuilder('td')
    .addClass('row-title-cell', 'cell-layout')
    .setAttributes({ role: 'gridcell', tabindex: '-1' });

  // Create inner div container
  const participantsSummaryDiv = new ElementBuilder('div')
    .addClass('participants-summary')
    .appendTo(titleCell.getElement());

  // Add input with placeholder
  new ElementBuilder('input')
    .setAttributes({ type: 'text', placeholder })
    .appendTo(participantsSummaryDiv.getElement());

  return titleCell.getElement(); // Return the completed title cell
}

// Example usage with a placeholder argument
// const titleCellData = {
//   placeholder: 'selector name',
// };

// const titleCell = createTitleCell(titleCellData);
// document.body.appendChild(titleCell); // Append to the document for demonstration

// Function to create the main content cell with subject and message
function createMainContentCell({ subject, message, threadId }) {
  // Create the main cell container
  const mainContentCell = new ElementBuilder('td')
    .addClass('cell-layout', 'row-main-cell')
    .setAttributes({ role: 'gridcell', tabindex: '-1' });

  // Create outer div with link role
  const linkDiv = new ElementBuilder('div')
    .addClass('xS')
    .setAttributes({ role: 'link' })
    .appendTo(mainContentCell.getElement());

  // Create inner container for subject and message
  const contentDiv = new ElementBuilder('div').addClass('xT').appendTo(linkDiv.getElement());

  // Add subject container with subject text
  new ElementBuilder('div')
    .addClass('row-subject-container')
    .addHTMLContent(
      `<span class="nowrap-ellipsis">
         <span data-thread-id="${threadId}">${subject}</span>
       </span>`,
    )
    .appendTo(contentDiv.getElement());

  // Add message preview container with message text
  new ElementBuilder('span')
    .addClass('row-content-container', 'nowrap-ellipsis')
    .addHTMLContent(`<span class="Zt">&nbsp;-&nbsp;</span>${message}`)
    .appendTo(contentDiv.getElement());

  return mainContentCell.getElement(); // Return the completed main content cell
}

// Example usage with an object argument
// const cellData = {
//   subject: 'Delve wants to schedule an interview with Ahsan Khan from hand-picked profiles',
//   message:
//     'Hi Ahsan, Thanks for confirming. I will reach out to you on Slack for more details about this interview. Best, Gustavo Farias Customer Success Manager at micro1 | Meet with me here! On Tue, Aug 6, 2024',
//   threadId: '#thread-f:1806582362949536984',
// };

// const mainContentCell = createMainContentCell(cellData);
// document.body.appendChild(mainContentCell); // Append to the document for demonstration

// Function to create the timestamp cell with a specific date
function createTimestampCell(dateString) {
  // Format date for title and display (e.g., "Tue, 6 Aug 2024, 18:51")
  const formattedDate = new Date(dateString).toLocaleString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
  const shortDate = new Date(dateString).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'short',
  });

  // Create the timestamp cell
  const timestampCell = new ElementBuilder('td')
    .addClass('row-timestamp-cell', 'cell-layout')
    .setAttributes({ role: 'gridcell', tabindex: '-1' });

  // Create the inner span with title and aria-label
  new ElementBuilder('span')
    .setAttributes({
      title: formattedDate,
      'aria-label': formattedDate,
    })
    .addHTMLContent(`<span>${shortDate}</span>`)
    .appendTo(timestampCell.getElement());

  return timestampCell.getElement(); // Return the completed timestamp cell
}

// Example usage with sample date
// const date = '2024-08-06T18:51:00';
// const timestampCell = createTimestampCell(date);
// document.body.appendChild(timestampCell); // Append to the document for demonstration

// Function to create the action buttons cell with event handlers
function createActionButtonsCell(data) {
  // Create the main action cell container
  const actionsCell = new ElementBuilder('td').addClass('row-action-cell', 'cell-layout');

  // Create the list to hold action buttons
  const actionsList = new ElementBuilder('ul')
    .addClass('row-action-buttons-list')
    .setAttributes({ role: 'toolbar' })
    .appendTo(actionsCell.getElement());

  // Archive button with event handler
  new ElementBuilder('li')
    .addClass('row-action-item-button', 'row-archive')
    .setAttributes({ 'data-tooltip': 'Archive' })
    .addEventListener('click', () => {
      console.log(`Archived item with id: ${data.id}`);
      // Add additional archive functionality here
    })
    .appendTo(actionsList.getElement());

  // Delete button with event handler
  new ElementBuilder('li')
    .addClass('row-action-item-button', 'row-delete')
    .setAttributes({ 'data-tooltip': 'Delete' })
    .addEventListener('click', () => {
      console.log(`Deleted item with id: ${data.id}`);
      // Add additional delete functionality here
    })
    .appendTo(actionsList.getElement());

  // Mark as unread button with event handler
  new ElementBuilder('li')
    .addClass('row-action-item-button', 'row-toggle-read-unread')
    .setAttributes({ 'data-tooltip': 'Mark as unread' })
    .addEventListener('click', () => {
      console.log(`Toggled read/unread for item with id: ${data.id}`);
      // Add functionality to toggle read/unread status here
    })
    .appendTo(actionsList.getElement());

  // Snooze button with event handler
  new ElementBuilder('li')
    .addClass('row-action-item-button', 'row-snooze')
    .setAttributes({ 'data-tooltip': 'Snooze' })
    .addEventListener('click', () => {
      console.log(`Snoozed item with id: ${data.id}`);
      // Add snooze functionality here
    })
    .appendTo(actionsList.getElement());

  return actionsCell.getElement(); // Return the completed actions cell
}

// Example usage with sample data
// const sampleData = { id: 1 }; // Replace with actual data when integrating
// const actionsCell = createActionButtonsCell(sampleData);
// document.body.appendChild(actionsCell); // Append to the document for demonstration

// Function to create a full row with all cells in the specified order using DocumentFragment
function createFullRow({
  isLastSelected,
  isChecked,
  isStarred,
  isImportant,
  titlePlaceholder,
  subject,
  message,
  threadId,
  date,
}) {
  // Create a DocumentFragment to hold the row elements
  const fragment = document.createDocumentFragment();

  // Create the table row container
  const tableRow = new ElementBuilder('tr')
    .addClass('line-item-row', 'row-color-normal')
    .setAttributes({ role: 'row', tabindex: '0', draggable: 'false' });

  // Add initial selected state if isChecked is true
  if (isChecked) {
    tableRow.addClass('selected-row');
  }

  // Event listener for hover to toggle "hovered-row" class
  tableRow.getElement().addEventListener('mouseenter', () => {
    tableRow.addClass('hovered-row');
  });
  tableRow.getElement().addEventListener('mouseleave', () => {
    tableRow.getElement().classList.remove('hovered-row');
  });

  // Last Selected Indicator Cell
  tableRow.getElement().appendChild(createLastSelectedIndicatorCell({ isLastSelected }));

  // Checkbox Cell with toggle functionality
  const checkboxCell = createCheckboxCell({ isChecked });
  checkboxCell.querySelector('.checkbox-layout').addEventListener('click', () => {
    const isSelected = tableRow.getElement().classList.toggle('selected-row');
    checkboxCell.querySelector('.checkbox-layout').setAttribute('aria-checked', isSelected);
  });
  tableRow.getElement().appendChild(checkboxCell);

  // Star Cell
  tableRow.getElement().appendChild(createStarCell({ isStarred }));

  // Important Cell
  tableRow.getElement().appendChild(createImportantCell({ isImportant }));

  // Title Cell
  tableRow.getElement().appendChild(createTitleCell({ placeholder: titlePlaceholder }));

  // Main Content Cell
  tableRow.getElement().appendChild(createMainContentCell({ subject, message, threadId }));

  // Timestamp Cell
  tableRow.getElement().appendChild(createTimestampCell(date));

  // Action Buttons Cell
  tableRow.getElement().appendChild(createActionButtonsCell({ id: threadId }));

  // Append the fully constructed row to the fragment
  fragment.appendChild(tableRow.getElement());

  return fragment; // Return the completed fragment containing the table row
}

// Example usage with object data
// const rowData = {
//   isLastSelected: true,
//   isChecked: false,
//   isStarred: true,
//   isImportant: false,
//   titlePlaceholder: 'selector name',
//   subject: 'Delve wants to schedule an interview with Ahsan Khan from hand-picked profiles',
//   message:
//     'Hi Ahsan, Thanks for confirming. I will reach out to you on Slack for more details about this interview.',
//   threadId: '#thread-f:1806582362949536984',
//   date: '2024-08-06T18:51:00',
// };

// // Create the full row and append it to the table body or document
// const fullRowFragment = createFullRow(rowData);
// document.querySelector('table tbody').appendChild(fullRowFragment); // Append the fragment in one render

// Function to create the full table structure
function createTable() {
  // Create the table element
  const table = new ElementBuilder('table')
    .addClass('table')
    .setAttributes({
      cellpadding: '0',
      role: 'grid',
      'aria-readonly': 'true',
    })
    .addClass('F', 'cf', 'zt');

  // Create colgroup with individual cols for each class
  const colgroup = new ElementBuilder('colgroup').appendTo(table.getElement());

  // List of column classes
  const columnClasses = [
    'indicator-col',
    'checkbox-col',
    'star-col',
    'row-important-cell',
    'title-col',
    'null',
    'eSDBXb',
    'yg',
    'timestamp-col',
    'row-action-cell',
    'empty',
  ];

  // Create each column and add to colgroup
  columnClasses.forEach((className) => {
    new ElementBuilder('col').addClass(className).appendTo(colgroup.getElement());
  });

  // Create tbody and append to table
  new ElementBuilder('tbody').addClass('tbody').appendTo(table.getElement());

  return table.getElement(); // Return the completed table element
}

// Function to create and populate the entire table with rows
function createAndPopulateTable(rowDataList) {
  // Create the full table structure
  const table = createTable(); // Assuming createTable() builds the table with colgroup and tbody

  // Get the tbody of the table
  const tableBody = table.querySelector('tbody');

  // Create a DocumentFragment to hold all rows
  const fragment = document.createDocumentFragment();

  // Loop through the row data list and add each row to the fragment
  rowDataList.forEach((rowData) => {
    // Create each row with the row data
    const row = createFullRow(rowData); // Assuming createFullRow(rowData) returns a single <tr>
    fragment.appendChild(row);
  });

  // Append the fragment with all rows to the tbody in one operation
  tableBody.appendChild(fragment);

  // Append the table to the document body or a specific container
  document.body.appendChild(table); // or a specific container
}

// JSON data for all rows
const rowDataList = [
  {
    isLastSelected: false,
    isChecked: false,
    isStarred: false,
    isImportant: true,
    titlePlaceholder: 'selector name',
    subject: '[AMUNetwork] Majaz - A tribute on his birth anniversary 19th Oct',
    message:
      'This video is a tribute to Majaz on the occasion of his birth anniversary 19th October Although nearly a century apart, both Sir Syed Ahmed Khan and Majaz were.',
    threadId: '#thread-f:1813276766016771312',
    date: '2024-10-18T22:18:00',
  },
  {
    isLastSelected: true,
    isChecked: true,
    isStarred: false,
    isImportant: true,
    titlePlaceholder: 'selector name',
    subject: '[AMUNetwork] Connecting Aligs in Luxembourg',
    message:
      'Firoz Kamal +352691332644Though this number is not on WhatsApp. His emailfkamal@pt.luRegards Naved To view this discussion on the web visit https://groups.googl.',
    threadId: '#thread-f:1812830286193946570',
    date: '2024-10-16T09:28:00',
  },
  {
    isLastSelected: false,
    isChecked: true,
    isStarred: false,
    isImportant: true,
    titlePlaceholder: 'selector name',
    subject: '[AMUNetwork] Visiting IAEA for Technical Meeting',
    message:
      "Dear AMU Alumni in Vienna, Assalamu alaikum I'm excited to share that I'll be visiting the International Atomic Energy Agency (IAEA) in Vienna from October 28th.",
    threadId: '#thread-f:1812993543841109301',
    date: '2024-10-15T21:45:00',
  },
  {
    isLastSelected: false,
    isChecked: true,
    isStarred: false,
    isImportant: false,
    titlePlaceholder: 'selector name',
    subject: '[AMUNetwork] Try to connect with Aligs in Chicago',
    message:
      'Assalamualikum, I am Sani Biswas (Firoz Ahmed), did B. Sc (2013) M.Sc (2015) from AMU. Now, I am now in Santiago, Chile. I am going to attend a workshop in NORT.',
    threadId: '#thread-f:1812993533788789069',
    date: '2024-10-15T19:16:00',
  },
  {
    isLastSelected: true,
    isChecked: false,
    isStarred: true,
    isImportant: true,
    titlePlaceholder: 'selector name',
    subject: 'Delve wants to schedule an interview with Ahsan Khan from hand-picked profiles',
    message:
      'Hi Ahsan, Thanks for confirming. I will reach out to you on Slack for more details about this interview. Best, Gustavo Farias Customer Success Manager at micro1 | Meet with me here! On Tue, Aug 6, 2024',
    threadId: '#thread-f:1806582362949536984',
    date: '2024-08-06T18:51:00',
  },
];

// Run the function to create and populate the table
createAndPopulateTable(rowDataList);
