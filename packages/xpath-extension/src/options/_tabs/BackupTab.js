import React from 'react';

function BackupTab() {
  return (
    <>
      <h3 className="section-header">Backup</h3>
      <div className="columns is-multiline">
        <div className="column is-12">
          <p>Export clipboard history items</p>
          <br />
          <button className="button is-info">
            <span className="icon is-small">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="file-export"
                className="svg-inline--fa fa-file-export fa-w-18 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 576 512"
              >
                <path
                  fill="currentColor"
                  d="M384 121.9c0-6.3-2.5-12.4-7-16.9L279.1 7c-4.5-4.5-10.6-7-17-7H256v128h128zM571 308l-95.7-96.4c-10.1-10.1-27.4-3-27.4 11.3V288h-64v64h64v65.2c0 14.3 17.3 21.4 27.4 11.3L571 332c6.6-6.6 6.6-17.4 0-24zm-379 28v-32c0-8.8 7.2-16 16-16h176V160H248c-13.2 0-24-10.8-24-24V0H24C10.7 0 0 10.7 0 24v464c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V352H208c-8.8 0-16-7.2-16-16z"
                />
              </svg>
            </span>
            <span>Save backup file</span>
          </button>
        </div>
        <div className="column is-12 is-hidden">
          <div className="notification is-success">
            Saved file: <br /> <strong />
          </div>
        </div>
        <div className="column is-12 has-text-warning is-hidden">
          <div className="notification is-warning">
            There are no items for export
          </div>
        </div>
      </div>
      <h3 className="section-header">Restore</h3>
      <div className="columns is-multiline">
        <div className="column is-12">
          <p>
            Import clipboard history from file.
            <br />
            <small className="has-text-grey">
              Your current items will not disappear and will be combined with
              items from backup.
            </small>
          </p>
          <br />
          <div className="columns">
            <div className="column is-8 is-7-mobile">
              <div className="file has-name is-fullwidth">
                <label className="file-label">
                  <input className="file-input" type="file" name="resume" />
                  <div className="file-cta">
                    <span className="file-icon">
                      <svg
                        aria-hidden="true"
                        focusable="false"
                        data-prefix="fas"
                        data-icon="upload"
                        className="svg-inline--fa fa-upload fa-w-16 "
                        role="img"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="currentColor"
                          d="M296 384h-80c-13.3 0-24-10.7-24-24V192h-87.7c-17.8 0-26.7-21.5-14.1-34.1L242.3 5.7c7.5-7.5 19.8-7.5 27.3 0l152.2 152.2c12.6 12.6 3.7 34.1-14.1 34.1H320v168c0 13.3-10.7 24-24 24zm216-8v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h136v8c0 30.9 25.1 56 56 56h80c30.9 0 56-25.1 56-56v-8h136c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"
                        />
                      </svg>
                    </span>
                    <span className="file-label">Choose a file</span>
                  </div>
                  <div className="file-name" />
                </label>
              </div>
            </div>
            <div className="column is-3">
              <button className="button is-info is-outlined" disabled>
                <span className="icon is-small">
                  <svg
                    aria-hidden="true"
                    focusable="false"
                    data-prefix="fas"
                    data-icon="file-import"
                    className="svg-inline--fa fa-file-import fa-w-16 "
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                  >
                    <path
                      fill="currentColor"
                      d="M16 288c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h112v-64zm489-183L407.1 7c-4.5-4.5-10.6-7-17-7H384v128h128v-6.1c0-6.3-2.5-12.4-7-16.9zm-153 31V0H152c-13.3 0-24 10.7-24 24v264h128v-65.2c0-14.3 17.3-21.4 27.4-11.3L379 308c6.6 6.7 6.6 17.4 0 24l-95.7 96.4c-10.1 10.1-27.4 3-27.4-11.3V352H128v136c0 13.3 10.7 24 24 24h336c13.3 0 24-10.7 24-24V160H376c-13.2 0-24-10.8-24-24z"
                    />
                  </svg>
                </span>
                <span>Import backup file</span>
              </button>
            </div>
          </div>
        </div>
        <div className="column is-12 is-hidden">
          <div className="notification is-success">
            <span>Items from backup file has been successfully imported</span>
          </div>
        </div>
        <div className="column is-12 is-hidden">
          <div className="notification is-info">
            <span>
              Auto-cleaning has been disabled in order to keep the whole
              history.
              <br />
              Please press Save &amp; Close to keep restored items
            </span>
          </div>
        </div>
        <div className="column is-12 is-hidden">
          <div className="notification is-danger" />
        </div>
      </div>
    </>
  );
}

export default BackupTab;
