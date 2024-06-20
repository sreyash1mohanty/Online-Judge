
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../stylecss/SignUp.css'
export default function SignupForm() {
const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        role: 'user'
});

const navigate = useNavigate();
const handleChange = (e) => {
        setFormData({
        ...formData,
        [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
        const response = await axios.post('http://localhost:8080/signup', formData);
        alert('Signup successful');
        navigate('/login');
        } catch (error) {
        alert('Signup failed: ' + (error.response?.data?.message || error.message));
        }
    };

    return (
        <div className="signup-container">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
            <div className="form-group">
            <label>First Name:</label>
            <input type="text" name="firstname" value={formData.firstname} onChange={handleChange} required />
            </div>
            <div className="form-group">
            <label>Last Name:</label>
            <input type="text" name="lastname" value={formData.lastname} onChange={handleChange} required />
            </div>
            <div className="form-group">
            <label>Email:</label>
            <input type="email" name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="form-group">
            <label>Password:</label>
            <input type="password" name="password" value={formData.password} onChange={handleChange} required />
            </div>
            <div className="form-group">
            <label>Role:</label>
            <select name="role" value={formData.role} onChange={handleChange}>
                <option value="user">User</option>
                <option value="admin">Admin</option>
            </select>
            </div>
            <button type="submit">Signup</button>
        </form>
        </div>
    );
}
