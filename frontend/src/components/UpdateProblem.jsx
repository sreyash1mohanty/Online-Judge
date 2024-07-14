import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import '../stylecss/UpdateProblem.css';

const UpdateProblem = () => {
    const { userId } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();
    const [problemData, setProblemData] = useState({
        problem_name: '',
        problem_statement: '',
        author: '',
        difficulty: '',
    });
    const [testCases, setTestCases] = useState([{ input: '', output: '' }]);
    useEffect(() => {
        async function fetchProblem() {
            try {
                const response = await axios.get(`http://13.126.241.75:8080/problems/${id}`);
                const { problem_name, problem_statement, author, difficulty, testCases } = response.data;
                setProblemData({ problem_name, problem_statement, author, difficulty });
                setTestCases(testCases)
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

    const handleTestCaseChange = (index, e) => {
        const { name, value } = e.target;
        const newTestCases = [...testCases];
        newTestCases[index] = { ...newTestCases[index], [name]: value };
        setTestCases(newTestCases);
    };

    const handleAddTestCase = () => {
        setTestCases([...testCases, { input: '', output: '' }]);
    };

    const handleRemoveTestCase = (index) => {
        const newTestCases = testCases.filter((_, i) => i !== index);
        setTestCases(newTestCases);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://13.126.241.75:8080/edit_problem/${id}`, { problem: { ...problemData, testCases }, userId });
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
                    rows="4"
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
                {testCases.map((testCase, index) => (
                    <div key={index} className="test-case">
                        <label>Test Case {index + 1} Input:</label>
                        <input
                            type="text"
                            name="input"
                            value={testCase.input}
                            onChange={(e) => handleTestCaseChange(index, e)}
                            required
                        />
                        <label>Test Case {index + 1} Output:</label>
                        <input
                            type="text"
                            name="output"
                            value={testCase.output}
                            onChange={(e) => handleTestCaseChange(index, e)}
                            required
                        />
                        <button type="button" onClick={() => handleRemoveTestCase(index)} disabled={testCases.length === 1}>Remove</button>
                    </div>
                ))}

                <button type="button" onClick={handleAddTestCase}>Add Test Case</button>
                <button type="submit">Update</button>
            </form>
        </div>
    );
};
export default UpdateProblem;
