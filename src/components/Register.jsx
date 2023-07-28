// RegistrationPage.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthContext from './AuthContext';

const RegistrationPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate= useNavigate();
  const { setAuthenticated } = useContext(AuthContext);
  const handleRegister = async () => {
    try {
      const response = await axios.post('/register', { email, password });
      // Handle successful registration 
      setAuthenticated(true);
      const { token } = response.data;
      console.log(response.data);
      localStorage.setItem('authToken', token);
      navigate('/');
    } catch (error) {
      // Handle registration error (e.g., show an error message)
      console.error(error.response.data);
    }
  };

  return (
    <div>
      <h2>Registration</h2>
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleRegister}>Register</button>
    </div>
  );
};

export default RegistrationPage;
