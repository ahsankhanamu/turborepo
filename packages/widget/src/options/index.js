import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';

import Icons from '../ui/components/Icons';

function Options() {
  return (
    <header className="header">
      <img src="icons/icon128.png" alt="Extension logo" className="logo" />
    </header>
  );
}

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Options />);
