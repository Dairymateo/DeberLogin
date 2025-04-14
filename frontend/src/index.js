/* eslint-disable react/jsx-no-undef */
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthContext } from './Context/AuthContext';
import { BrowserRouter as Router } from 'react-router-dom'; // Importa BrowserRouter como Router

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContext.Provider value={{ token: null, updateToken: () => {} }}> 
      <Router> 
        <App />
      </Router>
    </AuthContext.Provider>
  </React.StrictMode>
);

reportWebVitals();