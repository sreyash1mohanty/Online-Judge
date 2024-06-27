import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '../stylecss/ProblemDetails.css';
function ProblemDetails() {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    useEffect(() => {
        async function fetchProblem() {
            try {
                const response = await axios.get(`http://localhost:8080/problems/${id}`);
                setProblem(response.data);
            } catch (err) {
                console.error("Error fetching the problem", err);
            }
        }
        fetchProblem();
    },[id]);
    if (!problem) {
        return <div>Loading...</div>;
    }
    return (
        <div className="problem-details-container">
            <div className="problem-details">
                <h2>{problem.problem_name}</h2>
                <p>Created by: {problem.author}</p>
                <p>Difficulty: {problem.difficulty}</p>
                <p>Q-:{problem.problem_statement}</p>
            </div>
            <div className="problem-compiler">
                <h2>Code Editor</h2>
            </div>
        </div>
    );
}
export default ProblemDetails;
