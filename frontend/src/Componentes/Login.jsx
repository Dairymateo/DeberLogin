import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { updateToken } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3000/auth/login', { email, password })
      .then((response) => {
        updateToken(response.data.accessToken);
        navigate('/crud');
      })
      .catch((error) => {
        console.error(error);
        alert('Login failed. Please try again.');
      });
  };

  return (
    <div className='wrapper'>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div className='input-box'>
          <input
            type='text'
            placeholder='Email'
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <FaUser className='icon' />
        </div>

        <div className='input-box'>
          <input
            type='password'
            placeholder='Password'
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <FaLock className='icon' />
        </div>

        <div className='remember-forgot'>
          <label><input type="checkbox" /> Remember me </label>
          <a href="#">Forgot password?</a>
        </div>

        <button type='submit'>Login</button>

        <div className='register-link'>
          <p>Don't have an account? <a href='http://localhost:3001/signup'>Register</a></p>
        </div>
      </form>
    </div>
  );
}

export default Login;