import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
export default function Navbar() {
    const { isAuthenticated, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#333' }}>
                <Toolbar>
                    <Typography variant="h6" component={Link} to="/home" sx={{ flexGrow: 1, color: 'white', textDecoration: 'none' }}>
                        Codeloft
                    </Typography>
                    {isAuthenticated ? (
                        <Button onClick={handleLogout} sx={{ color: 'white', backgroundColor: 'transparent' }}>
                            Logout
                        </Button>
                    ) : (
                        <>
                            <Button component={Link} to="/login" sx={{ color: 'white', backgroundColor: 'transparent' }}>
                                Login
                            </Button>
                            <Button component={Link} to="/signup" sx={{ color: 'white', backgroundColor: 'transparent' }}>
                                Signup
                            </Button>
                        </>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}

