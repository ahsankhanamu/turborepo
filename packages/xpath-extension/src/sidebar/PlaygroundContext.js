// PlaygroundContext.js
import React, { createContext, useContext, useState } from 'react';

const PlaygroundContext = createContext();

export const PlaygroundProvider = ({ children }) => {
  const [selector, setSelector] = useState({
    selector: '',
    forcedStrategy: '',
    currentHistoryIndex: null,
    history: [],
    selectorOptions: [
      { value: 'auto-detect', label: 'css (detected)' },
      { value: 'css', label: 'css' },
      { value: 'link-text', label: 'link-text' },
      { value: 'xpath', label: 'xpath' },
      { value: 'rxpath', label: 'rxpath' },
    ],
    numberOfFoundElements: 0,
  });
  const [inputHasFocus, setInputHasFocus] = useState(false);
  const [notificationSettings, setNotificationSettings] = useState({});

  return (
    <PlaygroundContext.Provider
      value={{
        selector,
        setSelector,
        inputHasFocus,
        setInputHasFocus,
        notificationSettings,
        setNotificationSettings,
      }}
    >
      {children}
    </PlaygroundContext.Provider>
  );
};

export const usePlaygroundContext = () => {
  const context = useContext(PlaygroundContext);
  if (!context) {
    throw new Error('usePlaygroundContext must be used within a PlaygroundProvider');
  }
  return context;
};
