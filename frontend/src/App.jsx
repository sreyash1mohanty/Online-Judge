import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css'
import Home from './Pages/Home.jsx'
import LoginForm from './components/login.jsx'
import SignupForm from './components/SignUp.jsx';
function App() {
  return (
    <Router>
      <Home/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" component={<SignupForm/>} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}
export default App
