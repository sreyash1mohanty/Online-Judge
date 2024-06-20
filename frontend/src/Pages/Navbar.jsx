import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

export default function Navbar() {
    return (
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="fixed" sx={{ backgroundColor: '#333' }}>
          <Toolbar>
            <Typography   variant="h6" 
            component={Link} 
            to="/" 
            sx={{ flexGrow: 1, color: 'white', textDecoration: 'none' }}>
              Codeloft
            </Typography>
            <Button  component={Link} to="/login"   sx={{ color: 'white', backgroundColor: 'transparent' }}>Login</Button>
            <Button  component={Link} to="/signup"   sx={{ color: 'white', backgroundColor: 'transparent' }}>SignUp</Button>
          </Toolbar>
        </AppBar>
      </Box>
    );
}
