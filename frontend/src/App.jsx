
import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import './App.css';
import AllProblems from './Pages/AllProblems';
import CreateProblem from './Pages/CreateProblem';
import ProblemDetails from './components/ProblemDetails.jsx';
import Home from './Pages/Home';
import Blank from './Pages/Blank';
import LoginForm from './components/login';
import SignupForm from './components/SignUp';
import { AuthContext } from './context/AuthContext.jsx';
import Navbar from './Pages/Navbar';
import UpdateProblem from './components/UpdateProblem.jsx';

function PrivateRoute({ children }) {
    const { isAuthenticated } = useContext(AuthContext);
    return isAuthenticated ? children : <Navigate to="/login" />;
}
function AdminRoute({ children }) {
    const { isAuthenticated, userRole } = useContext(AuthContext);
    return isAuthenticated && userRole === 'admin' ? children : <Navigate to="/login" />;
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
                <Route path="/all-problems" element={<PrivateRoute><AllProblems /></PrivateRoute>} />
                <Route path="/all-problems/:id" element={<PrivateRoute><ProblemDetails /></PrivateRoute>} />
                <Route path="/create-problem" element={<AdminRoute><CreateProblem /></AdminRoute>} />
                <Route path="/edit-problem/:id" element={<AdminRoute><UpdateProblem /></AdminRoute>} />
            </Routes>
        </Router>

    );
}

export default App;

