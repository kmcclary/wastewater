import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';
import ThemeProvider from './utils/ThemeContext';
import App from './App';

const root = document.getElementById('root');
console.log('Root element:', root); // Add debugging

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <HashRouter basename="">
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </HashRouter>
  </React.StrictMode>
);
