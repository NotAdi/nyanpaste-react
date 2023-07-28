import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewPage from './components/NewPage';
import CodePage from './components/CodePage';
import RegistrationPage from './components/Register';
import LoginPage from './components/Login';
import { AuthProvider } from './components/AuthContext';
import './App.css';
import 'highlight.js/styles/base16/dracula.css';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = baseUrl;
const App = () => {
  return (
    <AuthProvider>
    <Router>
      <Routes>
        <Route path="/" element={<CodePage />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/:id" element={<CodePage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </Router>
  </AuthProvider>
  );
};

export default App;
