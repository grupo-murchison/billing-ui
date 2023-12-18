import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';

import AppMain from '@app';

import '@assets/scss/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppMain />
  </React.StrictMode>,
);
