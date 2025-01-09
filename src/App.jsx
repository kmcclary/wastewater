import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './css/style.css';
import './charts/ChartjsConfig';
import Dashboard from './pages/Dashboard';

function App() {
  console.log('App rendering'); // Add debugging

  return (
    <div className="app-wrapper">
      <Routes>
        <Route path="/" element={
          <React.Suspense fallback={<div>Loading...</div>}>
            <Dashboard />
          </React.Suspense>
        } />
      </Routes>
    </div>
  );
}

export default App;
