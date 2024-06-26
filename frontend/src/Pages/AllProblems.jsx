import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../stylecss/AllProblems.css'
function AllProblems() {
    const [problems, setProblems] = useState([]);
    useEffect(() => {
        async function fetchProblems() {
            try {
                const response = await axios.get('http://localhost:8080/problems');
                setProblems(response.data);
            } catch (err) {
                console.error("Error fetching the problems", err);
            }
        }
        fetchProblems();
    }, []);
    return (
        <div className="all-problems-container">
            {problems.length === 0 && <p>No problems found</p>} 
            {problems.map((problem) => (
                <Link to={`/all-problems/${problem._id}`} key={problem._id} className="problem-link">
                    <div className="problem-card">
                        <div className="problem-card-content">
                            <h3 className="problem-card-title">{problem.problem_name}</h3> 
                            <p className="problem-card-author">Created by {problem.author}</p>
                        </div>
                        <div className={`problem-card-difficulty ${problem.difficulty.toLowerCase()}`}>
                            {problem.difficulty}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
    );
}
export default AllProblems;
