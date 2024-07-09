import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import '../stylecss/ProblemDetails.css';

function ProblemDetails() {
    const { id } = useParams();
    const [problem, setProblem] = useState(null);
    const [code, setCode] = useState(`#include <iostream>
using namespace std;

int main() {
    // Write your code here
    return 0;
}`);
    const [input, setInput] = useState('');
    const [output, setOutput] = useState('');

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

    const handleRunCode = async () => {
        try {
            const response = await axios.post('http://localhost:8080/run', { language: 'cpp', code, input });
            setOutput(response.data.output);
        } catch (err) {
            console.error("Unable to run code: " + err);
            setOutput("Error running code");
        }
    };

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
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                ></textarea>
                <textarea
                    className="input-editor"
                    placeholder="Input for your code..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                ></textarea>
                <div className="button-container">
                    <button className="run-code-button" onClick={handleRunCode}>Run Code</button>
                    <button className="submit-code-button">Submit Code</button>
                </div>
                {output && (
                    <div className="code-output">
                        <h2 className="output-title">Output:</h2>
                        <pre>{output}</pre>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProblemDetails;


