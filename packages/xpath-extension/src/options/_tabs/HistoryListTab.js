import React from 'react';

function HistoryListTab() {
  return (
    <>
      <h3 className="section-header">Local History Auto-Clean</h3>
      <div className="columns is-multiline">
        <div className="column is-12 has-text-grey">
          <small>
            These settings are applicable to local history list only ("All")
            <br />
            You also may configure Auto-Clean options for{' '}
            <a href="#cloud">Cloud Pro</a>.
          </small>
        </div>
        <div className="column is-7 vertical-center">
          <label className="checkbox">
            <input type="checkbox" name="isTimeLimited" />
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
                name="timeCount"
                disabled
                defaultValue={1}
              />
            </p>
            <div className="control">
              <div className="select">
                <select name="timePeriod" disabled>
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
        <div className="column is-7 vertical-center">
          <label className="checkbox">
            <input type="checkbox" name="isItemsLimited" />
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
              name="itemsLimit"
              pattern="[0-9]*"
              disabled
              defaultValue={150}
            />
          </p>
        </div>
        <div className="column is-7 vertical-center">
          <label className="checkbox">
            <input type="checkbox" name="isCharsLimited" />
            Do not save text bigger than
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
                name="charsLimit"
                disabled
                defaultValue={5000}
              />
            </p>
            <p className="control">
              <a className="button is-static no-border-color">symbols</a>
            </p>
          </div>
        </div>
      </div>
      <h3 className="section-header">Sort history by</h3>
      <div className="columns is-multiline">
        <div className="column is-12">
          <div className="control">
            <label className="radio">
              <input type="radio" name="sortMethod" defaultValue="dateAdded" />
              <span>date created</span>
              <small className="has-text-grey"> (never move items)</small>
            </label>
            <br />
            <label className="radio">
              <input
                type="radio"
                name="sortMethod"
                defaultValue="dateLastCopied"
                defaultChecked
              />
              <span>date used</span>
              <small className="has-text-grey">
                {' '}
                (recently used items move on top)
              </small>
            </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default HistoryListTab;
