import React, { useState,useContext } from 'react';
import { TextField, Button, Box, Container, Typography } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
function CreateProblem() {
    const { userId } = useContext(AuthContext);
    const [problemData, setProblemData] = useState({
        problem_name: '',
        problem_statement: '',
        author: '',
        difficulty: ''
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProblemData({ ...problemData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/create_problem',{...problemData,userId});
            if (response.data.success) {
                alert('Problem created successfully');
                navigate('/all-problems');
            }
        } catch (err) {
            console.error('Error creating problem:', err);
            alert('Error creating problem');
        }
    };
    return (
        <Container component="main" maxWidth="xs">
            <Box sx={{ marginTop: 8, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">Create Problem</Typography>
                <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <TextField
                        name="problem_name"
                        label="Problem Name"
                        fullWidth
                        required
                        margin="normal"
                        value={problemData.problem_name}
                        onChange={handleChange}
                    />
                    <TextField
                        name="problem_statement"
                        label="Problem Statement"
                        fullWidth
                        required
                        multiline
                        rows={4}
                        margin="normal"
                        value={problemData.problem_statement}
                        onChange={handleChange}
                    />
                    <TextField
                        name="author"
                        label="Author"
                        fullWidth
                        required
                        margin="normal"
                        value={problemData.author}
                        onChange={handleChange}
                    />
                    <TextField
                        name="difficulty"
                        label="Difficulty"
                        fullWidth
                        required
                        margin="normal"
                        value={problemData.difficulty}
                        onChange={handleChange}
                    />
                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Create</Button>
                </Box>
            </Box>
        </Container>
    );
}

export default CreateProblem;
