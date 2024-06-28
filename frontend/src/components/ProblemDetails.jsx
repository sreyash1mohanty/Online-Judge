import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
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
                console.error("Unable to fetch problem: " + err);
            }
        }
        fetchProblem();
    }, [id]);

    if (!problem) return <div>Loading...</div>;

    return (
        <div className="problem-details-container">
            <div className="problem-details">
                <h2 className="problem-title">{problem.problem_name}</h2>
                <p className="problem-author">Created by: {problem.author}</p>
                <p className="problem-difficulty">Difficulty: {problem.difficulty}</p>
                <p className="problem-statement">Q: {problem.problem_statement}</p>
            </div>
            <div className="problem-compiler">
                <h2 className="compiler-title">Code Editor</h2>
                <textarea
                    className="code-editor"
                    placeholder="Write your code here..."
                    defaultValue={`#include <iostream>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`}
                ></textarea>
                <div className="button-container">
                    <button className="run-code-button">Run Code</button>
                    <button className="submit-code-button">Submit Code</button>
                </div>
            </div>
        </div>
    );
}

export default ProblemDetails;
