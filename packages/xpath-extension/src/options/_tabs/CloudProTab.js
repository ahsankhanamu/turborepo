import React from 'react';

function CloudProTab() {
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
      <div className="no-subs-section">
        <h3 className="section-header">Cloud Pro Auto-Clean</h3>
        <div className="columns is-multiline">
          <div className="column is-7 vertical-center">
            <label className="checkbox">
              <input type="checkbox" name="isCloudProItemsLimited" />
              Maximum number of stored items
            </label>
          </div>
          <div className="column is-5 is-5-mobile">
            <p className="control">
              <input
                className="input"
                type="number"
                placeholder="count"
                min={1}
                name="cloudProItemsLimit"
                pattern="[0-9]*"
                disabled
                defaultValue={150}
              />
            </p>
          </div>
          <div className="column is-7 vertical-center">
            <label className="checkbox">
              <input type="checkbox" name="isCloudProTimeLimited" />
              Remove items older than
            </label>
          </div>
          <div className="column is-5">
            <div className="field has-addons">
              <p className="control">
                <input
                  className="input"
                  type="number"
                  placeholder="count"
                  min={1}
                  pattern="[0-9]*"
                  name="cloudProTimeCount"
                  disabled
                  defaultValue={1}
                />
              </p>
              <div className="control">
                <div className="select">
                  <select name="cloudProTimePeriod" disabled>
                    <option value="m">minutes</option>
                    <option value="h">hours</option>
                    <option value="d">days</option>
                    <option value="w">weeks</option>
                    <option value="M">month</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h3 className="section-header">Sync</h3>
        <div className="columns is-multiline">
          <div className="column is-12 vertical-center">
            <label className="checkbox">
              <input type="checkbox" name="autoSyncCloudPro" />
              Automatically send new text to Cloud Pro (Not-recommended!)
            </label>
            <br />
            <small className="has-text-grey">
              When enabled, the extension will send every new item from the
              extension to the Cloud Pro.
              <br />
              It is not recommended, as it might sync the data you do not want
              to send.
            </small>
          </div>
          <div className="column is-12 vertical-center">
            <label className="checkbox">
              <input type="checkbox" name="syncItemsDeletion" />
              Synchronize items deletion between local list and Cloud Pro
            </label>
            <br />
            <small className="has-text-grey">
              Deleted local items will be also removed from the Cloud Pro
              database and vice versa.
            </small>
          </div>
        </div>
        <h3 className="section-header">Cloud Pro account</h3>
        <div className="columns is-multiline">
          <div className="column is-12">
            <div className="sign-in-line">
              <span>Please</span>
              <button className="button is-small is-link cloud-pro-sign-in">
                <span>Sign In</span>
              </button>
              <span>to use the Cloud Pro</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CloudProTab;
