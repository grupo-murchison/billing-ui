import React from 'react';
import ReactDOM from 'react-dom/client';

import { AppMain } from '@app/container/app-main';

import '@assets/styles/index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AppMain />
  </React.StrictMode>,
);
