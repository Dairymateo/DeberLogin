import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './Componentes/Header';
import Signup from './Componentes/Signup';
import Login from './Componentes/Login';
import Products from './Componentes/Products'; // Importa Products
import { AuthContext } from './Context/AuthContext';

function App() {
  return (
    <AuthContext.Provider value={{ token: null, updateToken: () => {}, clearToken: () => {} }}>
      <Router>
        <Header className="app-header" />
        <div className="app-content">
          <Routes>
            <Route path="/" element={<Products className="products-list" />} /> {/* Products en la ruta raíz */}
            <Route path="/signup" element={<Signup className="signup-form" />} />
            <Route path="/login" element={<Login className="login-form" />} />
          </Routes>
        </div>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;