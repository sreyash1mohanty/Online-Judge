import React, { useContext } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
export default function Navbar() {
    const { isAuthenticated, logout,userRole } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="fixed" sx={{ backgroundColor: '#333' }}>
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1, color: 'white', textDecoration: 'none' }}>
                        <Button sx={{ flexGrow: 1, color: 'white', textDecoration: 'none' }} component={Link} to="/home">Codeloft</Button>
                    </Typography>
                    {isAuthenticated ? (
                        <>                       
                            {userRole ==='admin' && (
                                        <>
                                            <Button component={Link} to="/create-problem" sx={{ color: 'white', backgroundColor: 'transparent' }}>
                                                Create Problem
                                            </Button>
                                            <Button component={Link} to="/all-problems" sx={{ color: 'white', backgroundColor: 'transparent' }}>
                                                All Problems
                                            </Button>
                                        </>
                            )}
                            {userRole === 'user' && (
                                <Button   component={Link} to="/all-problems" sx={{ color: 'white', backgroundColor: 'transparent' }}>
                                    All Problems
                                </Button>
                            )}
                            <Button onClick={handleLogout} sx={{ color: 'white', backgroundColor: 'transparent' }}>
                                Logout
                            </Button>
                        

                        </>

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

