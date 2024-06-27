import React, { useState, useEffect,useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../stylecss/UpdateProblem.css'
const UpdateProblem = () => {
    const { userId } = useContext(AuthContext);
    const { id } = useParams(); 
    const navigate = useNavigate(); 
    const [problemData, setProblemData] = useState({
        problem_name: '',
        problem_statement: '',
        author: '',
        difficulty: ''
    });
    useEffect(() => {
        async function fetchProblem() {
            try {
                const response = await axios.get(`http://localhost:8080/problems/${id}`);
                const { problem_name, problem_statement, author, difficulty } = response.data;
                setProblemData({ problem_name, problem_statement, author, difficulty });
            } catch (err) {
                console.error('Error fetching problem:', err);
            }
        }
        fetchProblem();
    }, [id]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProblemData({ ...problemData, [name]: value });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8080/edit_problem/${id}`, { problem: problemData,userId});
            if (response.status === 200) {
                alert('Problem updated successfully');
                navigate('/all-problems');
            }
        } catch (err) {
            console.error('Error updating problem:', err);
            alert('Error updating problem');
        }
    };
    return (
        <div className="update-problem-container">
            <h2>Update Problem</h2>
            <form onSubmit={handleSubmit} className="update-problem-form">
                <label htmlFor="problem_name">Problem Name:</label>
                <input
                    type="text"
                    id="problem_name"
                    name="problem_name"
                    value={problemData.problem_name}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="problem_statement">Problem Statement:</label>
                <textarea
                    rows=""
                    id="problem_statement"
                    name="problem_statement"
                    value={problemData.problem_statement}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="author">Author:</label>
                <input
                    type="text"
                    id="author"
                    name="author"
                    value={problemData.author}
                    onChange={handleChange}
                    required
                />
                <label htmlFor="difficulty">Difficulty:</label>
                <select
                    id="difficulty"
                    name="difficulty"
                    value={problemData.difficulty}
                    onChange={handleChange}
                    required
                >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};
export default UpdateProblem;
