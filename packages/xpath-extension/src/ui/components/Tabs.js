import React, { useState } from 'react';

import PropTypes from 'prop-types';

const Tabs = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <TabList tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />
      <TabContent content={tabs[activeTab].content} />
    </>
  );
};

const TabList = ({ tabs, activeTab, setActiveTab }) => (
  <nav>
    <div className="tabs is-centered view-tabs">
      <ul>
        {tabs.map((tab, index) => (
          <li
            key={index}
            className={` ${index === activeTab ? 'is-active' : ''}`}
            onClick={() => setActiveTab(index)}
          >
            <a>
              <span className="icon is-small">{tab.icon}</span>
              <span>{tab.label}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  </nav>
);

const TabContent = ({ content }) => (
  <div className="tabs-content-box">{content}</div>
);

Tabs.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      content: PropTypes.node.isRequired,
    })
  ).isRequired,
};

TabList.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  activeTab: PropTypes.number.isRequired,
  setActiveTab: PropTypes.func.isRequired,
};

TabContent.propTypes = {
  content: PropTypes.node.isRequired,
};

export { Tabs, TabList, TabContent };
