import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import Home from './Pages/Home';
import Blank from './Pages/Blank';
import LoginForm from './components/login';
import SignupForm from './components/SignUp';
import { AuthContext } from './context/AuthContext.jsx';
import Navbar from './Pages/Navbar';

function PrivateRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Blank />} />
                <Route path="/home" element={<PrivateRoute><Home /></PrivateRoute>} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>

    );
}

export default App;

