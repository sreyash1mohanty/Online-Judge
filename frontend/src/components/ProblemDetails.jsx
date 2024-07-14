import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import MonacoEditor from '@monaco-editor/react';
import '../stylecss/ProblemDetails.css';
import { AuthContext } from '../context/AuthContext';
function ProblemDetails() {
    const  {userId}=useContext(AuthContext);
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
    const [testResults, setTestResults] = useState([]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [allTestCasesPassed, setAllTestCasesPassed] = useState(false);
    useEffect(() => {
        async function fetchProblem() {
            try {
                const response = await axios.get(`https://backend.codeloft.online/problems/${id}`);
                setProblem(response.data);
            } catch (err) {
                console.error("Unable to fetch problem: " + err);
            }
        }
        fetchProblem();
    }, [id]);

    const handleRunCode = async () => {
        try {
            const response = await axios.post('https://backend.codeloft.online/run', { language: 'cpp', code, input });
            setOutput(response.data.output);
        } catch (err) {
            console.error("Unable to run code: " + err);
            setOutput("Error running code");
        }
    };
    const handleSubmitCode = async () => {
        try {
            setIsSubmitting(true);
            const testCases = problem.testCases || []; 
            const results = await Promise.all(testCases.map(async (testCase) => {
                const response = await axios.post('https://backend.codeloft.online/run', { language: 'cpp', code, input: testCase.input });
                return {
                    input: testCase.input,
                    expectedOutput: testCase.output,
                    actualOutput: response.data.output,
                    passed: response.data.output.trim() === testCase.output.trim()
                };
            }));
            setTestResults(results);
            const allPassed = results.every(result => result.passed);
            setAllTestCasesPassed(allPassed);
            setShowResults(true);
            // const userId = userId; 
            await axios.post('https://backend.codeloft.online/submit', {
                userId,
                problemId: id,
                verdict: allPassed ? 'Accepted' : 'Rejected'
            });
            if (allPassed) {
                alert('All test cases passed. Problem submitted successfully!');
            }
        } catch (err) {
            console.error("Error running code: " + err);
            setTestResults([]);
            setShowResults(false);
            alert('Error submitting problem');
        } finally {
            setIsSubmitting(false);
        }
    };
    const renderTestResults = () => {
        return (
            <div className="test-results">
                {testResults.map((result, index) => (
                    <div key={index} className={`test-case-result ${result.passed ? 'passed' : 'failed'}`}>
                        <h3>Test Case {index + 1}</h3>
                        <div>
                            <strong>Input:</strong> {result.input}
                        </div>
                        <div>
                            <strong>Expected Output:</strong> {result.expectedOutput}
                        </div>
                        <div>
                            <strong>Actual Output:</strong> {result.actualOutput}
                        </div>
                        {result.passed ? (
                            <div className="test-case-passed">Test case passed!</div>
                        ) : (
                            <div className="test-case-failed">Test case failed</div>
                        )}
                    </div>
                ))}
            </div>
        );
    };
    return (
        <>
        <div className='parent'>
        <div className="problem-details-container">
            <div className="problem-details">
                <h2 className="problem-title">{problem?.problem_name}</h2>
                <p className="problem-author">Created by: {problem?.author}</p>
                <p className="problem-difficulty">Difficulty: {problem?.difficulty}</p>
                <p className="problem-statement">Q: {problem?.problem_statement}</p>
                {output && (
                    <div className="code-output">
                        <h2 className="output-title">Output:</h2>
                        <pre>{output}</pre>
                    </div>
                )}
            </div>
            <div className="problem-compiler">
                <h2 className="compiler-title">Code Editor</h2>
                <MonacoEditor
                    height="calc(70vh - 200px)"
                    language="cpp"
                    theme="vs-dark"
                    value={code}
                    onChange={(value) => setCode(value)}
                    options={{
                        automaticLayout: true,
                    }}
                />
                <textarea
                    className="input-editor"
                    placeholder="Enter your input here..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                ></textarea>
                <div className="button-container">
                    <button className="run-code-button" onClick={handleRunCode}>Run Code</button>
                    <button className="submit-code-button" onClick={handleSubmitCode} disabled={isSubmitting}>
                        {isSubmitting ? 'Submitting...' : 'Submit Code'}
                    </button>
                </div>
            </div>
        </div>
        <div className='error-show'>
        {showResults && testResults.length > 0 && !allTestCasesPassed && (
                    <div className="test-case-results">
                        <h2 className="test-case-header">Test Case Results:</h2>
                        {renderTestResults()}
                    </div>
                )}
        </div>
    </div>
    
    </>);
}

export default ProblemDetails;
