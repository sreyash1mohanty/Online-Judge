import React, { useState, useContext } from 'react';
import { TextField, Button, Box, Container, Typography, IconButton } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
function CreateProblem() {
    const { userId } = useContext(AuthContext);
    const [problemData, setProblemData] = useState({
        problem_name: '',
        problem_statement: '',
        author: '',
        difficulty: '',
        testCases: [{ input: '', output: '' }] // Initialize with one empty test case
    });
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProblemData({ ...problemData, [name]: value });
    };
    const handleTestCaseChange = (index, e) => {
        const { name, value } = e.target;
        const newTestCases = problemData.testCases.map((testCase, i) => (
            i === index ? { ...testCase, [name]: value } : testCase
        ));
        setProblemData({ ...problemData, testCases: newTestCases });
    };
    const handleAddTestCase = () => {
        setProblemData({
            ...problemData,
            testCases: [...problemData.testCases, { input: '', output: '' }]
        });
    };

    const handleRemoveTestCase = (index) => {
        const newTestCases = problemData.testCases.filter((_, i) => i !== index);
        setProblemData({ ...problemData, testCases: newTestCases });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/create_problem', { ...problemData, userId });
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
                        sx={{ backgroundColor: 'white' }}
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
                        sx={{ backgroundColor: 'white' }}
                    />
                    <TextField
                        name="author"
                        label="Author"
                        fullWidth
                        required
                        margin="normal"
                        value={problemData.author}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white' }}
                    />
                    <TextField
                        name="difficulty"
                        label="Difficulty"
                        fullWidth
                        required
                        margin="normal"
                        value={problemData.difficulty}
                        onChange={handleChange}
                        sx={{ backgroundColor: 'white' }}
                    />

                    {problemData.testCases.map((testCase, index) => (
                        <Box key={index} sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                            <TextField
                                name="input"
                                label={`Test Case ${index + 1} Input`}
                                fullWidth
                                required
                                margin="normal"
                                value={testCase.input}
                                onChange={(e) => handleTestCaseChange(index, e)}
                                sx={{ backgroundColor: 'white' }}
                            />
                            <TextField
                                name="output"
                                label={`Test Case ${index + 1} Output`}
                                fullWidth
                                required
                                margin="normal"
                                value={testCase.output}
                                onChange={(e) => handleTestCaseChange(index, e)}
                                sx={{ backgroundColor: 'white', ml: 2 }}
                            />
                            <IconButton onClick={() => handleRemoveTestCase(index)} disabled={problemData.testCases.length === 1}>
                                <RemoveCircleIcon />
                            </IconButton>
                        </Box>
                    ))}

                    <Button onClick={handleAddTestCase} startIcon={<AddCircleIcon />} sx={{ mt: 2 }}>
                        Add Test Case
                    </Button>

                    <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>Create</Button>
                </Box>
            </Box>
        </Container>
    );
}

export default CreateProblem;
