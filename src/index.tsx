import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './containers/App';
import './index.css';
import './styles/main.css'; // Import your CSS file

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);