import { createRoot } from 'react-dom/client';
import React, { useState, useEffect } from 'react';
// import '../ui/popup.css';

function Popup() {
  const [isControlCenterActive, setControlCenterActive] = useState(false);

  useEffect(() => {
    // Load initial state from Chrome storage
    chrome.storage.sync.get('controlCenterActive', (data) => {
      setControlCenterActive(data.controlCenterActive || false);
    });
  }, []);

  // Toggle Control Center state
  const handleToggleChange = () => {
    const newState = !isControlCenterActive;
    setControlCenterActive(newState);

    // Save state and notify background
    chrome.storage.sync.set({ controlCenterActive: newState });
    chrome.runtime.sendMessage({ type: 'toggleControlCenter', active: newState });
  };

  return (
    <div className="popup-container">
      <h2 className="popup-heading">Control Center</h2>
      <label className="popup-toggle">
        <input type="checkbox" checked={isControlCenterActive} onChange={handleToggleChange} />
        {isControlCenterActive ? 'Activated' : 'Deactivated'}
      </label>
    </div>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Popup />);
