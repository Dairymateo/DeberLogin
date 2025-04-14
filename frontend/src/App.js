import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import Products from './Componentes/Products';
import Login from './Componentes/Login';
import Signup from './Componentes/Signup';
import { AuthContext } from './Context/AuthContext';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [isLoggedIn, setIsLoggedIn] = useState(!!token);
  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('token', token || '');
    setIsLoggedIn(!!token);
  }, [token]);

  const updateToken = (newToken) => {
    setToken(newToken);
  };

  const logout = () => {
    setToken(null);
  };

  const showHeader = location.pathname !== '/login' && location.pathname !== '/signup';

  return (
    <AuthContext.Provider value={{ token, updateToken }}>
      {showHeader && (
        <header className="app-header">
          <h1>Login con React y NestJS</h1>
          <nav>
            <ul>
              {!isLoggedIn && (
                <>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/signup">Signup</Link></li>
                </>
              )}
              {isLoggedIn && (
                <li><button onClick={logout}>Logout</button></li>
              )}
            </ul>
          </nav>
        </header>
      )}
      <main className="app-main">
        <Routes>
          <Route path="/" element={<Products isLoggedIn={isLoggedIn} />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </main>
    </AuthContext.Provider>
  );
}

export default App;