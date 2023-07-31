import 'highlight.js/styles/base16/dracula.css';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';

import './css/App.css';
import { AuthProvider } from './components/AuthContext';
import CodePage from './components/CodePage';
import LoginPage from './components/Login';
import NewPage from './components/NewPage';
import Dashboard from './components/Dashboard';
import RegistrationPage from './components/Register';

// const baseUrl = process.env.REACT_APP_BASE_URL;
// axios.defaults.baseURL = baseUrl;
const App = () => {
    return (
        <AuthProvider>
            <Router>
                <Routes>
                    <Route path='/' element={<CodePage />} />
                    <Route path='/new' element={<NewPage />} />
                    <Route path='/:id' element={<CodePage />} />
                    <Route path='/register' element={<RegistrationPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                </Routes>
            </Router>
        </AuthProvider>
    );
};

export default App;
