import React from 'react';
import ReactDOM from 'react-dom/client';
import Demo from './Demo';
import './index.css';

if (import.meta.env.DEV) {
  const { worker } = await import('./mocks/server.ts');
  worker.start();
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Demo />
  </React.StrictMode>
);
