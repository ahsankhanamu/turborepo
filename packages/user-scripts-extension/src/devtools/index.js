import React from 'react';
import { createRoot } from 'react-dom/client';
import PerformanceMeasure from './_components/PerformanceMeasure';
import '../css/global.css';

chrome.devtools.panels.create('Action recorder', 'icons/icon48.png', 'devtools.html', (panel) => {
  console.log('DevTools panel created.');

  panel.onShown.addListener((window) => {});
});

function Devtools() {
  return (
    <>
      <PerformanceMeasure />
    </>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Devtools />);
