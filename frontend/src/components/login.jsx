import React, { useState } from 'react';
import { TextField, Button, Box, Typography, Container } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
const handleSubmit = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.post('http://localhost:8080/login', {
        email,
        password
        });
        alert('Login successful');
        console.log(response.data);
        navigate('/home');
    console.log(response.data);
    }catch (error) {
        alert('Error logging in: ' + (error.response?.data?.message || error.message));
        console.error('Error logging in:', error);
    }
};
    return (
        <Container component="main" maxWidth="xs">
        <Box
            sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            }}
        >
            <Typography component="h1" variant="h5">
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
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
            >
            Login
            </Button>
            </Box>
        </Box>
        </Container>
    );
}
