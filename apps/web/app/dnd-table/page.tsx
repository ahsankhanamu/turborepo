'use client';
import React from 'react';
import '@atlaskit/css-reset';
import AppProvider from '@atlaskit/app-provider';
import App from './client-page';

function DNDTable() {
  return (
    <AppProvider>
      <App />
    </AppProvider>
  );
}

export default DNDTable;
