import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import Icons from '../ui/components/Icons';
import { TabList, TabContent } from '../ui/components/Tabs';

import {
  InterfaceTab,
  BackupTab,
  HistoryListTab,
  CloudProTab,
  LockTab,
  PageWidgeTab,
  OtherTab,
} from './_tabs';

function Options() {
  const [activeTab, setActiveTab] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    function handleSubmit(event) {
      event.preventDefault();
      const setting = document.getElementById('setting').value;
      chrome.storage.sync.set({ setting }, () => {
        console.log('Setting saved');
      });
    }

    function handleDOMContentLoaded() {
      chrome.storage.sync.get(['setting'], (result) => {
        if (result.setting) {
          document.getElementById('setting').value = result.setting;
        }
      });
    }

    document.addEventListener('submit', handleSubmit, { signal });
    document.addEventListener('DOMContentLoaded', handleDOMContentLoaded, {
      signal,
    });
    return () => {
      controller.abort();
    };
  }, []);

  const tabs = [
    {
      label: 'Interface',
      icon: <Icons.Interface />,
      content: <InterfaceTab />,
    },
    { label: 'Backup', icon: <Icons.Backup />, content: <BackupTab /> },
    {
      label: 'History',
      icon: <Icons.HistoryList />,
      content: <HistoryListTab />,
    },
    { label: 'Cloud pro', icon: <Icons.CloudPro />, content: <CloudProTab /> },
    { label: 'Lock', icon: <Icons.Lock />, content: <LockTab /> },
    {
      label: 'Page Widget',
      icon: <Icons.PageWidget />,
      content: <PageWidgeTab />,
    },
    { label: 'Other', icon: <Icons.Other />, content: <OtherTab /> },
  ];

  return (
    <>
      <header className="header">
        <img src="icons/icon128.png" alt="Extension logo" className="logo" />
      </header>
      <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <main className="content-container">
        <TabContent content={tabs[activeTab].content} />
        <div className="column is-12">
          <div className="has-text-centered">
            <button
              className="button is-success is-medium is-outlined"
              disabled
            >
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
      </main>
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Options />);
