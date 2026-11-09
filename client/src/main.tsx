import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './index.css';
import { setupAxiosInterceptors } from './services/apiClient';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);

setupAxiosInterceptors();

if (import.meta.env.MODE === 'development') {
  console.log('Running in development mode');
  import('./mocks/browser')
    .then(({ worker }) => worker.start())
    .catch(console.error);
}