import React from 'react';

function OtherTab() {
  return (
    <>
      <h3 className="section-header">Permissions</h3>
      <div className="columns is-multiline">
        <div className="column is-12 vertical-center">
          <label className="checkbox has-text-grey">
            <input type="checkbox" disabled defaultChecked />
            Read &amp; change clipboard
          </label>
          <div>
            <small className="has-text-grey is-small">
              The core permission required by the extension
            </small>
          </div>
        </div>
        <div className="column is-12 vertical-center">
          <label className="checkbox">
            <input type="checkbox" name="tabs" />
            Detect source URL of copied text
          </label>
          <div>
            <small className="has-text-grey is-small">
              Allows to detect and save the URL, where a text was copied from
            </small>
          </div>
        </div>
      </div>
      <h3 className="section-header">Popup keyboard navigation</h3>
      <div className="columns is-multiline">
        <div className="column is-12">
          You can use arrows <kbd>up</kbd> and <kbd>down</kbd> to navigate
          items, <kbd>Enter</kbd> to copy chosen and <kbd>f</kbd> to switch
          between view modes.
        </div>
        <div className="column is-12">
          <a href="#">
            <span>Configure global keyboard shortcuts</span>
          </a>
        </div>
      </div>
      <h3 className="section-header">Danger zone</h3>
      <div className="columns is-multiline">
        <div className="column is-12">
          <label className="checkbox">
            <input type="checkbox" name="isTimeLimited" />I want to reset all
            settings to defaults
          </label>
        </div>
        <div className="column is-12">
          <button className="button is-danger is-outlined" disabled>
            Reset settings &amp; reload extension now
          </button>
        </div>
      </div>
    </>
  );
}

export default OtherTab;
