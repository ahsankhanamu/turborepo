import React from 'react';

function InterfaceTab() {
  return (
    <>
      <h3 className="section-header">Interface</h3>
      <div className="columns is-multiline">
        <div className="column is-12 vertical-center">
          <label className="checkbox">
            <input type="checkbox" name="showBadgeCount" defaultChecked />
            Show number of clipboard items on the extension icon
          </label>
        </div>
        <div className="column is-12 vertical-center">
          <label className="checkbox">
            <input type="checkbox" name="copyFreshlyMerged" />
            Auto-copy freshly merged items
          </label>
        </div>
        <div className="column is-5 vertical-center">
          <span>Context menu mode</span>
        </div>
        <div className="column is-7">
          <div className="select fullwidth-select-box">
            <select name="contextMenuMode">
              <option value="smart">Show only recent when no favorites</option>
              <option value="favorites">Show only favorites</option>
              <option value="recent">Show only recent</option>
              <option value="both">Show recent and favorites</option>
              <option value="disabled">Disabled</option>
            </select>
          </div>
        </div>
        <div className="column is-5 vertical-center">
          <span>Default view mode</span>
        </div>
        <div className="column is-7">
          <div className="select fullwidth-select-box">
            <select name="defaultViewMode">
              <option value="all">All items</option>
              <option value="fav">Favorites list</option>
              <option value="cloudPro">Cloud Pro items</option>
            </select>
          </div>
        </div>
        <div className="column is-5 vertical-center">
          <span>Selected text action</span>
        </div>
        <div className="column is-7">
          <div className="select fullwidth-select-box">
            <select name="selectedTextAction">
              <option value="auto">Auto</option>
              <option value="send">Send to Cloud Pro (requires Pro)</option>
              <option value="save">Save to clipboard list</option>
              <option value="fav">Save to favorites list</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="column is-5 vertical-center">
          <span>Color mode</span>
        </div>
        <div className="column is-7">
          <div className="select fullwidth-select-box">
            <select name="theme">
              <option value="auto">Auto (System preference)</option>
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
}

export default InterfaceTab;
