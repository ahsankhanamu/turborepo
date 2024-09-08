import React from 'react';

function OptionsFooter() {
  return (
    <>
      <div className="column is-12">
        <div className="has-text-centered">
          <button className="button is-success is-medium is-outlined" disabled>
            <span className="icon is-small">
              <svg
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="check-circle"
                className="svg-inline--fa fa-check-circle fa-w-16 "
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"
                />
              </svg>
            </span>
            <span>Save &amp; Close</span>
          </button>
        </div>
      </div>
      <div className="column is-12 has-text-centered is-size-7 has-text-grey-light">
        <br />
        <span>v3.17.3</span>
        <span className="footer-separator" />
        <span>
          <a
            href="https://clipboardextension.com/policy.html"
            className="has-text-grey-light"
            target="_blank"
            rel="noopener noreferrer"
          >
            Privacy Policy
          </a>
        </span>
        <span className="footer-separator" />
        <span>
          <a className="has-text-grey-light">Debug info</a>
        </span>
      </div>
    </>
  );
}

export default OptionsFooter;
