import React, { useState,useContext,useEffect } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
import { AuthContext } from '../context/AuthContext';
export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login,isAuthenticated } = useContext(AuthContext);
const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('https://backend.codeloft.online/login', {
        email,
        password
        });
        const { data } = response;
        alert('Login successful');
        login(data.token);  // Update the context
        navigate('/home');
    // console.log(response.data);
    }catch (error) {
        alert('Error logging in: ' + (error.response?.data?.message || error.message));
        console.error('Error logging in:', error);
    }
};
    useEffect(() => {
    if(isAuthenticated ){
        navigate('/home');
    }
    }, [isAuthenticated]);
    return (
        <Container component="main" maxWidth="xs" >
        <Box
            sx={{
                marginTop: 8,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                padding: '20px',
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
            }}
        >
            <Typography component="h1" variant="h5" sx={{ marginBottom: '20px' }}>
            Login
            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ marginBottom: '15px' }}
            />
            <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ marginBottom: '15px' }}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    '&:hover': {
                        backgroundColor: '#0056b3',
                    },
                }}
            >
            Login
            </Button>
            </Box>
        </Box>
        </Container>
    );
}
