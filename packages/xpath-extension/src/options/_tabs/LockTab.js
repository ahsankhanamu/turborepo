import React from 'react';

function LockTab() {
  return (
    <>
      <div className="notification is-warning no-subs-box">
        This option is for users with activated <strong>Pro features</strong>.
        <br />
        <br />
        <a className="button is-success is-fullwidth">
          Try Pro features free for two weeks
        </a>
      </div>
      <h3 className="section-header">Lock</h3>
      <div className="columns is-multiline no-subs-section">
        <div className="column is-4 vertical-center">
          <label className="checkbox">
            <input type="checkbox" name="lockEnabled" disabled />
            Enable Lock feature
          </label>
        </div>
        <div className="column is-7 is-5-mobile">
          <button className="button is-fullwidth" disabled>
            Set password
          </button>
        </div>
        <div className="column is-4 vertical-center">
          <span>Auto-Lock timer</span>
        </div>
        <div className="column is-7">
          <div className="select is-full">
            <select name="lockTimer" disabled>
              <option value="off">off (lock manually)</option>
              <option value="immediately">Immediately</option>
              <option value={30000}>30 seconds</option>
              <option value={60000}>1 minute</option>
              <option value={300000}>5 minutes</option>
              <option value={900000}>15 minutes</option>
            </select>
          </div>
        </div>
        <div className="column is-10 vertical-center">
          <label className="checkbox">
            <input
              type="checkbox"
              name="lockChangeBadge"
              disabled
              defaultChecked
            />
            Change icon color to yellow when history is locked
          </label>
        </div>
        <div className="column is-8 vertical-center">
          <label className="checkbox">
            <input type="checkbox" name="lockButtonHidden" disabled />
            Do not show Lock button in the popup header
          </label>
        </div>
        <div className="column is-12 vertical-center">
          <small className="has-text-grey">
            Please note that paste from context menu will not be possible when
            history is locked.
            <br />
          </small>
          <a
            href="https://clipboardextension.com/pro.html?utm_campaign=options&utm_medium=extension&utm_source=lock_tab#lock-feature"
            className="external-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            &gt; Read more about Lock
          </a>
        </div>
      </div>
    </>
  );
}

export default LockTab;
