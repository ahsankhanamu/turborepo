import { createRoot } from 'react-dom/client';
import React, { useState } from 'react';

function Popup() {
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const handleHamburgerToggle = () => {
    setIsHamburgerOpen(!isHamburgerOpen);
  };
  const handleSelectItem = () => {
    // select item, add the respective classes, highlight respective button
  };
  const handleSelectItems = () => {
    // add .selected class to each item; make it for all the loaded items, not all.
  };
  const handlefavoriteItem = () => {
    // select item, add the respective classes, highlight respective button
  };
  const handlefavoriteItems = () => {
    // apply operation on all selected items
    // add .selected class to each item; make it for all the loaded items, not all.
  };
  const handleMergeItems = () => {
    // Check if selected items are more than 1
    // Display the merge dialog
  };
  const handleCopyItem = () => {
    // add .active class to particular row | make the clicked row active
    // to copy the item to clipboard
    // to not add the item again to the extension
  };
  const handleCopyItems = () => {
    // apply operation on all selected items
    // add .selected class to each item; make it for all the loaded items, not all.
  };
  const handleDeleteItem = () => {
    // check if the item is deletable or not,
    // i.e. favorite can't be deleted, make them regular before deletion
    // check if item is on server, delete that as well.
    // if not, move it to
    // deleted bucket and sync that later with server
  };
  const handleDeleteItems = () => {
    // apply handleDeleteItem operation on all selected items
    // favorite items will be skipped
    // make expaning text also undeletable
  };
  const handleSendToCloudItem = () => {
    // select item, add the respective classes, highlight respective button
  };
  const handleSendToCloudItems = () => {
    // add .selected class to each item; make it for all the loaded items, not all.
  };
  // getting the items
  const getAllItems = () => {
    // to get the first batch of items, add listener for scroll and get others on demand and store
  };
  const getFavoriteItems = () => {
    // to get the first batch of favorite items, add listener for scroll and get others on demand.
  };
  const getExpenderItems = () => {
    // to get the first batch of text expandable items, add listener for scroll and get others on demand.
  };
  const handleClickSearchButton = () => {
    // filter and show items which contain search string.
  };
  const handleRowClick = () => {
    // handleCopyItem()
  };
  const handleClickDeleteItem = ({ id }) => {
    // check if the item is deletable or not, i.e. favorite can't be deleted, make them regular before deletion
    // check if item is on server, delete that as well.
    // if not, move it to deleted bucket and sync that later with server
  };
  const handleClickEditItem = ({ id }) => {
    // check if the item is editable and not locked
    // display the edit modal with the item content based on ID
  };
  // Edit modal dialog
  const handleEditModal = () => {
    //show edit modal options for setting temporary font size
    // break works
    // show whitespaces
  };
  const handleEditModalOptions = () => {
    //show edit modal options for setting temporary font size
    // break works
    // show whitespaces
  };
  const handleEditModalEditText = () => {
    //start edit the text in the textarea
  };
  const handleEditModalShowQR = () => {
    //Show the QR based on the text content
    // check for the allowable character limit
  };
  const handleEditModalSave = () => {
    //show edit modal options for setting temporary font size
    // break works
    // show whitespaces
  };
  const handleEditModalSaveAsNew = () => {
    //show edit modal options for setting temporary font size
    // break works
    // show whitespaces
  };
  // Export modal dialog
  const handleShowExportModal = () => {
    //show edit modal options for setting temporary font size
    // break works
    // show whitespaces
  };
  // About modal dialog
  const handleShowAboutModal = () => {
    //show about modal for the extension
  };
  // Capture full page popup Options button
  const handleCaptureFullPage = () => {
    //Capture the full page
  };
  // Capture visible page area popup Options button
  const handleCptureVisiblePage = () => {
    //Capture the visible page
  };
  // navigate to options page
  const handleGoToOptionsPage = () => {
    //navigate to options page
  };
  // lock the clipboard history
  const handleLockClipboardHistory = () => {
    //locks the clipboard history
    // requires the authentication, as this would help recover the history later if forgot password
  };
  // Add new text explicitely
  const handleNewExplicitText = () => {
    //click to explicitely add new text
    // shows the add icon in the added text
  };
  //handle the clipboard event
  const handleClipboardEvent = () => {
    //handle the clipboard event
    // if the clipboard event text is at the last item in the history, do not add again
    // if the clipboard event text is in the history, position it to the latest
  };

  return (
    <div>
      <div id="root">
        <header className="top-header">
          <div
            className="monitor-switch tooltip has-tooltip-right"
            data-tooltip="Clipboard monitor: On"
          >
            <div
              style={{
                position: 'relative',
                display: 'inline-block',
                textAlign: 'left',
                opacity: 1,
                direction: 'ltr',
                borderRadius: 8,
                transition: 'opacity 0.25s ease 0s',
                touchAction: 'none',
                WebkitTapHighlightColor: 'rgba(0, 0, 0, 0)',
                userSelect: 'none',
              }}
            >
              <div
                className="react-switch-bg"
                style={{
                  height: 16,
                  width: 36,
                  margin: 3,
                  position: 'relative',
                  background: 'rgb(92, 184, 92)',
                  borderRadius: 8,
                  cursor: 'pointer',
                  transition: 'background 0.25s ease 0s',
                }}
              >
                <div
                  style={{
                    height: 16,
                    width: 18,
                    position: 'relative',
                    opacity: 1,
                    pointerEvents: 'none',
                    transition: 'opacity 0.25s ease 0s',
                  }}
                />
              </div>
              <div
                className="react-switch-handle"
                style={{
                  height: 22,
                  width: 22,
                  background: 'rgb(126, 212, 126)',
                  display: 'inline-block',
                  cursor: 'pointer',
                  borderRadius: '50%',
                  position: 'absolute',
                  transform: 'translateX(20px)',
                  top: 0,
                  outline: 0,
                  boxShadow: 'rgba(0, 0, 0, 0.5) 0px 1px 1px',
                  border: 0,
                  transition:
                    'background-color 0.25s ease 0s, transform 0.25s ease 0s, box-shadow 0.15s ease 0s',
                }}
              />
              <input
                type="checkbox"
                role="switch"
                defaultChecked
                style={{
                  border: 0,
                  clip: 'rect(0px, 0px, 0px, 0px)',
                  height: 1,
                  margin: '-1px',
                  overflow: 'hidden',
                  padding: 0,
                  position: 'absolute',
                  width: 1,
                }}
              />
            </div>
          </div>
          <div className="view-switch">
            <a className="view-switch-item all active">All</a>
            <a className="view-switch-item fav">Fav</a>
            <a className="view-switch-item short">Short</a>
            <a className="view-switch-item cloud-pro">Cloud Pro</a>
          </div>
          <div className="pro-btns">
            <button
              className="button has-text-grey-light is-small is-outlined"
              title="Lock now"
            >
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="lock"
                className="svg-inline--fa fa-lock fa-w-14 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 448 512"
              >
                <path
                  fill="currentColor"
                  d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                />
              </svg>
            </button>
          </div>
          <div className="control has-icons-right search-block">
            <input
              className="input is-small"
              type="text"
              placeholder="Search"
              defaultValue
            />
            <span className="icon is-small is-right">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="svg-inline--fa fa-search fa-w-16 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                />
              </svg>
            </span>
          </div>
          <div
            className={`is-small dropdown app-burger-menu is-right ${
              isHamburgerOpen ? 'is-active' : ''
            }`}
          >
            <div className="dropdown-trigger" onClick={handleHamburgerToggle}>
              <button className="app-burger-button">
                <svg
                  aria-hidden="true"
                  focusable="false"
                  data-prefix="fas"
                  data-icon="bars"
                  className="svg-inline--fa fa-bars fa-w-14 fa-lg "
                  role="img"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                >
                  <path
                    fill="currentColor"
                    d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
                  />
                </svg>
              </button>
            </div>
            <div className="dropdown-menu" role="menu">
              <div className="dropdown-content">
                <a
                  href="#"
                  className="dropdown-item delete-all separated-bottom"
                >
                  <span className="main-btn-text">
                    <span className="fa-icon">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="trash"
                        className="svg-inline--fa fa-trash fa-w-14 "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 448 512"
                        color="red"
                      >
                        <path
                          fill="currentColor"
                          d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z"
                        />
                      </svg>
                    </span>
                    <span>Delete All</span>
                  </span>
                  <span className="confirm">Confirm</span>
                </a>
                <a className="dropdown-item separated-bottom pro-features">
                  <span className="fa-icon">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="certificate"
                      className="svg-inline--fa fa-certificate fa-w-16 "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                      color="green"
                    >
                      <path
                        fill="currentColor"
                        d="M458.622 255.92l45.985-45.005c13.708-12.977 7.316-36.039-10.664-40.339l-62.65-15.99 17.661-62.015c4.991-17.838-11.829-34.663-29.661-29.671l-61.994 17.667-15.984-62.671C337.085.197 313.765-6.276 300.99 7.228L256 53.57 211.011 7.229c-12.63-13.351-36.047-7.234-40.325 10.668l-15.984 62.671-61.995-17.667C74.87 57.907 58.056 74.738 63.046 92.572l17.661 62.015-62.65 15.99C.069 174.878-6.31 197.944 7.392 210.915l45.985 45.005-45.985 45.004c-13.708 12.977-7.316 36.039 10.664 40.339l62.65 15.99-17.661 62.015c-4.991 17.838 11.829 34.663 29.661 29.671l61.994-17.667 15.984 62.671c4.439 18.575 27.696 24.018 40.325 10.668L256 458.61l44.989 46.001c12.5 13.488 35.987 7.486 40.325-10.668l15.984-62.671 61.994 17.667c17.836 4.994 34.651-11.837 29.661-29.671l-17.661-62.015 62.65-15.99c17.987-4.302 24.366-27.367 10.664-40.339l-45.984-45.004z"
                      />
                    </svg>
                  </span>
                  <span>
                    <b>Pro</b> Features
                  </span>
                </a>
                <a className="dropdown-item">
                  <span className="fa-icon">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="plus"
                      className="svg-inline--fa fa-plus fa-w-14 "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z"
                      />
                    </svg>
                  </span>
                  <span>Add text</span>
                </a>
                <a className="dropdown-item">
                  <span className="fa-icon">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="stream"
                      className="svg-inline--fa fa-stream fa-w-16 "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M16 128h416c8.84 0 16-7.16 16-16V48c0-8.84-7.16-16-16-16H16C7.16 32 0 39.16 0 48v64c0 8.84 7.16 16 16 16zm480 80H80c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16zm-64 176H16c-8.84 0-16 7.16-16 16v64c0 8.84 7.16 16 16 16h416c8.84 0 16-7.16 16-16v-64c0-8.84-7.16-16-16-16z"
                      />
                    </svg>
                  </span>
                  <span>Run Clipboard Widget</span>
                </a>
                <a className="dropdown-item">
                  <span className="fa-icon">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="far"
                      data-icon="window-restore"
                      className="svg-inline--fa fa-window-restore fa-w-16 "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M464 0H144c-26.5 0-48 21.5-48 48v48H48c-26.5 0-48 21.5-48 48v320c0 26.5 21.5 48 48 48h320c26.5 0 48-21.5 48-48v-48h48c26.5 0 48-21.5 48-48V48c0-26.5-21.5-48-48-48zm-96 464H48V256h320v208zm96-96h-48V144c0-26.5-21.5-48-48-48H144V48h320v320z"
                      />
                    </svg>
                  </span>
                  <span>Floating Mode</span>
                </a>
                <a className="dropdown-item">
                  <span className="fa-icon">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="lock"
                      className="svg-inline--fa fa-lock fa-w-14 "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 448 512"
                    >
                      <path
                        fill="currentColor"
                        d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"
                      />
                    </svg>
                  </span>
                  <span>Lock now</span>
                </a>
                <span className="dropdown-item has-sub-dropdown">
                  <span className="fa-icon">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="camera"
                      className="svg-inline--fa fa-camera fa-w-16 "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"
                      />
                    </svg>
                  </span>
                  <span>Page screenshot</span>
                  <span className="sub-dropdown dropdown-content">
                    <a className="dropdown-item">
                      <span className="fa-icon">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="camera"
                          className="svg-inline--fa fa-camera fa-w-16 "
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"
                          />
                        </svg>
                      </span>
                      <span>Full page</span>
                    </a>
                    <a className="dropdown-item">
                      <span className="fa-icon">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="camera"
                          className="svg-inline--fa fa-camera fa-w-16 "
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                          color="silver"
                        >
                          <path
                            fill="currentColor"
                            d="M512 144v288c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V144c0-26.5 21.5-48 48-48h88l12.3-32.9c7-18.7 24.9-31.1 44.9-31.1h125.5c20 0 37.9 12.4 44.9 31.1L376 96h88c26.5 0 48 21.5 48 48zM376 288c0-66.2-53.8-120-120-120s-120 53.8-120 120 53.8 120 120 120 120-53.8 120-120zm-32 0c0 48.5-39.5 88-88 88s-88-39.5-88-88 39.5-88 88-88 88 39.5 88 88z"
                          />
                        </svg>
                      </span>
                      <span>Visible area</span>
                    </a>
                  </span>
                </span>
                <a className="dropdown-item separated-top">
                  <span className="fa-icon">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="cog"
                      className="svg-inline--fa fa-cog fa-w-16 "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M487.4 315.7l-42.6-24.6c4.3-23.2 4.3-47 0-70.2l42.6-24.6c4.9-2.8 7.1-8.6 5.5-14-11.1-35.6-30-67.8-54.7-94.6-3.8-4.1-10-5.1-14.8-2.3L380.8 110c-17.9-15.4-38.5-27.3-60.8-35.1V25.8c0-5.6-3.9-10.5-9.4-11.7-36.7-8.2-74.3-7.8-109.2 0-5.5 1.2-9.4 6.1-9.4 11.7V75c-22.2 7.9-42.8 19.8-60.8 35.1L88.7 85.5c-4.9-2.8-11-1.9-14.8 2.3-24.7 26.7-43.6 58.9-54.7 94.6-1.7 5.4.6 11.2 5.5 14L67.3 221c-4.3 23.2-4.3 47 0 70.2l-42.6 24.6c-4.9 2.8-7.1 8.6-5.5 14 11.1 35.6 30 67.8 54.7 94.6 3.8 4.1 10 5.1 14.8 2.3l42.6-24.6c17.9 15.4 38.5 27.3 60.8 35.1v49.2c0 5.6 3.9 10.5 9.4 11.7 36.7 8.2 74.3 7.8 109.2 0 5.5-1.2 9.4-6.1 9.4-11.7v-49.2c22.2-7.9 42.8-19.8 60.8-35.1l42.6 24.6c4.9 2.8 11 1.9 14.8-2.3 24.7-26.7 43.6-58.9 54.7-94.6 1.5-5.5-.7-11.3-5.6-14.1zM256 336c-44.1 0-80-35.9-80-80s35.9-80 80-80 80 35.9 80 80-35.9 80-80 80z"
                      />
                    </svg>
                  </span>
                  <span>Options &amp; Backup</span>
                </a>
                <a href="#" className="dropdown-item">
                  <span className="fa-icon">
                    <svg
                      aria-hidden="true"
                      focusable="false"
                      data-prefix="fas"
                      data-icon="info-circle"
                      className="svg-inline--fa fa-info-circle fa-w-16 "
                      role="img"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path
                        fill="currentColor"
                        d="M256 8C119.043 8 8 119.083 8 256c0 136.997 111.043 248 248 248s248-111.003 248-248C504 119.083 392.957 8 256 8zm0 110c23.196 0 42 18.804 42 42s-18.804 42-42 42-42-18.804-42-42 18.804-42 42-42zm56 254c0 6.627-5.373 12-12 12h-88c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h12v-64h-12c-6.627 0-12-5.373-12-12v-24c0-6.627 5.373-12 12-12h64c6.627 0 12 5.373 12 12v100h12c6.627 0 12 5.373 12 12v24z"
                      />
                    </svg>
                  </span>
                  <span>About</span>
                </a>
              </div>
            </div>
          </div>
        </header>
        <main className="main-list-container">
          <div className="history-item head">
            <div className="field item-checker">
              <input
                className="is-checkradio is-small is-info is-circle"
                type="checkbox"
                id="check-general"
              />
              <label htmlFor="check-general" />
            </div>
            <div className="count-info">
              <span className="info">
                <span>Total items: </span>
                <span>2</span>
              </span>
            </div>
            <div
              className="buttons has-addons multi-tools muted"
              title="Select items in the list"
            >
              <span className="button favorite-items">
                <span className="icon is-small">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="star"
                    className="svg-inline--fa fa-star fa-w-18 "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 576 512"
                  >
                    <path
                      fill="currentColor"
                      d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                    />
                  </svg>
                </span>
                <span>Favorite</span>
              </span>
              <span className="button">
                <span className="icon is-small">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="clone"
                    className="svg-inline--fa fa-clone fa-w-16 "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M464 0H144c-26.51 0-48 21.49-48 48v48H48c-26.51 0-48 21.49-48 48v320c0 26.51 21.49 48 48 48h320c26.51 0 48-21.49 48-48v-48h48c26.51 0 48-21.49 48-48V48c0-26.51-21.49-48-48-48zM362 464H54a6 6 0 0 1-6-6V150a6 6 0 0 1 6-6h42v224c0 26.51 21.49 48 48 48h224v42a6 6 0 0 1-6 6zm96-96H150a6 6 0 0 1-6-6V54a6 6 0 0 1 6-6h308a6 6 0 0 1 6 6v308a6 6 0 0 1-6 6z"
                    />
                  </svg>
                </span>
                <span>Merge</span>
              </span>
              <span className="button">
                <span className="icon is-small">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="clipboard"
                    className="svg-inline--fa fa-clipboard fa-w-12 "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path
                      fill="currentColor"
                      d="M384 112v352c0 26.51-21.49 48-48 48H48c-26.51 0-48-21.49-48-48V112c0-26.51 21.49-48 48-48h80c0-35.29 28.71-64 64-64s64 28.71 64 64h80c26.51 0 48 21.49 48 48zM192 40c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24m96 114v-20a6 6 0 0 0-6-6H102a6 6 0 0 0-6 6v20a6 6 0 0 0 6 6h180a6 6 0 0 0 6-6z"
                    />
                  </svg>
                </span>
                <span>Copy All</span>
              </span>
              <span className="button">
                <span className="icon is-small">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="download"
                    className="svg-inline--fa fa-download fa-w-16 "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                    />
                  </svg>
                </span>
                <span>Export</span>
              </span>
              <div className="button dropdown is-right multi-tools-dropdown">
                <div className="dropdown-trigger">
                  <span className="dropdown-multi">
                    <span className="icon is-small">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="ellipsis-h"
                        className="svg-inline--fa fa-ellipsis-h fa-w-16 "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M328 256c0 39.8-32.2 72-72 72s-72-32.2-72-72 32.2-72 72-72 72 32.2 72 72zm104-72c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72zm-352 0c-39.8 0-72 32.2-72 72s32.2 72 72 72 72-32.2 72-72-32.2-72-72-72z"
                        />
                      </svg>
                    </span>
                  </span>
                </div>
                <div className="dropdown-menu">
                  <div className="dropdown-content">
                    <a className="dropdown-item">
                      <span className="icon is-small">
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          data-prefix="fas"
                          data-icon="paper-plane"
                          className="svg-inline--fa fa-paper-plane fa-w-16 "
                          role="img"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 512 512"
                        >
                          <path
                            fill="currentColor"
                            d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
                          />
                        </svg>
                      </span>
                      <span>Send to Cloud Pro</span>
                    </a>
                  </div>
                </div>
              </div>
              <span className="button delete-items">
                <span className="icon is-small">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="far"
                    data-icon="times-circle"
                    className="svg-inline--fa fa-times-circle fa-w-16 "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"
                    />
                  </svg>
                </span>
                <span>Delete</span>
              </span>
            </div>
          </div>
          <div className={`history-items-list`}>
            <div>
              <HistoryItem />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function HistoryItem() {
  return (
    <>
      <div className="history-item active">
        <div className="field item-checker">
          <input
            className="is-checkradio is-small is-info is-circle"
            type="checkbox"
            id="check-2aba4fc667ddb38bcbdc731e113ea5bb"
          />
          <label htmlFor="check-2aba4fc667ddb38bcbdc731e113ea5bb" />
        </div>
        <a className="time-tag" href="#" title="Created: 27 Jul 2024, 04:07:49">
          <span className="tag">a few sec</span>
        </a>
        <div className="meta-icons-set" />
        <div className="text" title="Click to copy">
          <span>
            &lt;div id="root"&gt;&lt;header class="top-header"&gt;&lt;div
            class="monitor-switch tooltip has-tooltip-right"
            data-tooltip="Clipboard monitor: On"&gt;&lt;div style="position:
            relative; display: inline-block; text-align: left; opacity: 1;
            direction: ltr; border-radius: 8px; t
          </span>
        </div>
        <div className="item-tools">
          <div className="buttons has-addons">
            <button className="button item-favorite-btn" title="Make favorite">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="star"
                className="svg-inline--fa fa-star fa-w-18 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                />
              </svg>
            </button>
            <button className="button" title="Edit">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="edit"
                className="svg-inline--fa fa-edit fa-w-18 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
                />
              </svg>
            </button>
            <button className="button btn-send" title="To Cloud Pro">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="paper-plane"
                className="svg-inline--fa fa-paper-plane fa-w-16 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
                />
              </svg>
            </button>
            <button className="button item-delete-btn" title="Delete">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="times"
                className="svg-inline--fa fa-times fa-w-11 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 352 512"
              >
                <path
                  fill="currentColor"
                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="item-size big-size" title="Item length: 22056">
          <span>9999+</span>
        </div>
      </div>
      <div className="history-item">
        <div className="field item-checker">
          <input
            className="is-checkradio is-small is-info is-circle"
            type="checkbox"
            id="check-b2cc11ccf9c11cfcce13092f00088e48"
          />
          <label htmlFor="check-b2cc11ccf9c11cfcce13092f00088e48" />
        </div>
        <a className="time-tag" href="#" title="Created: 27 Jul 2024, 04:07:13">
          <span className="tag">a few sec</span>
        </a>
        <div className="meta-icons-set">
          <a
            href="https://chatgpt.com/c/edfe2718-8b47-44e9-869f-cad6abb8f324"
            className="icon item-meta-icon link external-link tooltip has-tooltip-right"
            data-tooltip="chatgpt.com/c/edfe2718-8b47-44e9..."
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="link"
              className="svg-inline--fa fa-link fa-w-16 fa-xs "
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path
                fill="currentColor"
                d="M326.612 185.391c59.747 59.809 58.927 155.698.36 214.59-.11.12-.24.25-.36.37l-67.2 67.2c-59.27 59.27-155.699 59.262-214.96 0-59.27-59.26-59.27-155.7 0-214.96l37.106-37.106c9.84-9.84 26.786-3.3 27.294 10.606.648 17.722 3.826 35.527 9.69 52.721 1.986 5.822.567 12.262-3.783 16.612l-13.087 13.087c-28.026 28.026-28.905 73.66-1.155 101.96 28.024 28.579 74.086 28.749 102.325.51l67.2-67.19c28.191-28.191 28.073-73.757 0-101.83-3.701-3.694-7.429-6.564-10.341-8.569a16.037 16.037 0 0 1-6.947-12.606c-.396-10.567 3.348-21.456 11.698-29.806l21.054-21.055c5.521-5.521 14.182-6.199 20.584-1.731a152.482 152.482 0 0 1 20.522 17.197zM467.547 44.449c-59.261-59.262-155.69-59.27-214.96 0l-67.2 67.2c-.12.12-.25.25-.36.37-58.566 58.892-59.387 154.781.36 214.59a152.454 152.454 0 0 0 20.521 17.196c6.402 4.468 15.064 3.789 20.584-1.731l21.054-21.055c8.35-8.35 12.094-19.239 11.698-29.806a16.037 16.037 0 0 0-6.947-12.606c-2.912-2.005-6.64-4.875-10.341-8.569-28.073-28.073-28.191-73.639 0-101.83l67.2-67.19c28.239-28.239 74.3-28.069 102.325.51 27.75 28.3 26.872 73.934-1.155 101.96l-13.087 13.087c-4.35 4.35-5.769 10.79-3.783 16.612 5.864 17.194 9.042 34.999 9.69 52.721.509 13.906 17.454 20.446 27.294 10.606l37.106-37.106c59.271-59.259 59.271-155.699.001-214.959z"
              />
            </svg>
          </a>
        </div>
        <div className="text" title="Click to copy">
          <span>
            Auto-Close Notifications: Automatically closes notifications after a
            set time
          </span>
        </div>
        <div className="item-tools">
          <div className="buttons has-addons">
            <button className="button item-favorite-btn" title="Make favorite">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="star"
                className="svg-inline--fa fa-star fa-w-18 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M528.1 171.5L382 150.2 316.7 17.8c-11.7-23.6-45.6-23.9-57.4 0L194 150.2 47.9 171.5c-26.2 3.8-36.7 36.1-17.7 54.6l105.7 103-25 145.5c-4.5 26.3 23.2 46 46.4 33.7L288 439.6l130.7 68.7c23.2 12.2 50.9-7.4 46.4-33.7l-25-145.5 105.7-103c19-18.5 8.5-50.8-17.7-54.6zM388.6 312.3l23.7 138.4L288 385.4l-124.3 65.3 23.7-138.4-100.6-98 139-20.2 62.2-126 62.2 126 139 20.2-100.6 98z"
                />
              </svg>
            </button>
            <button className="button" title="Edit">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="edit"
                className="svg-inline--fa fa-edit fa-w-18 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M402.3 344.9l32-32c5-5 13.7-1.5 13.7 5.7V464c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V112c0-26.5 21.5-48 48-48h273.5c7.1 0 10.7 8.6 5.7 13.7l-32 32c-1.5 1.5-3.5 2.3-5.7 2.3H48v352h352V350.5c0-2.1.8-4.1 2.3-5.6zm156.6-201.8L296.3 405.7l-90.4 10c-26.2 2.9-48.5-19.2-45.6-45.6l10-90.4L432.9 17.1c22.9-22.9 59.9-22.9 82.7 0l43.2 43.2c22.9 22.9 22.9 60 .1 82.8zM460.1 174L402 115.9 216.2 301.8l-7.3 65.3 65.3-7.3L460.1 174zm64.8-79.7l-43.2-43.2c-4.1-4.1-10.8-4.1-14.8 0L436 82l58.1 58.1 30.9-30.9c4-4.2 4-10.8-.1-14.9z"
                />
              </svg>
            </button>
            <button className="button btn-send" title="To Cloud Pro">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="paper-plane"
                className="svg-inline--fa fa-paper-plane fa-w-16 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z"
                />
              </svg>
            </button>
            <button className="button item-delete-btn" title="Delete">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="times"
                className="svg-inline--fa fa-times fa-w-11 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 352 512"
              >
                <path
                  fill="currentColor"
                  d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z"
                />
              </svg>
            </button>
          </div>
        </div>
        <div className="item-size" title="Item length: 77">
          <span>77</span>
        </div>
      </div>
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Popup />);
