import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NewPage from './components/NewPage';
import CodePage from './components/CodePage';
import './App.css';
import 'highlight.js/styles/base16/dracula.css';
import axios from 'axios';

const baseUrl = process.env.REACT_APP_BASE_URL;
axios.defaults.baseURL = baseUrl;
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CodePage />} />
        <Route path="/new" element={<NewPage />} />
        <Route path="/:id" element={<CodePage />} />
      </Routes>
    </Router>
  );
};

export default App;
