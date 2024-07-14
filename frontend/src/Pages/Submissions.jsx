import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../stylecss/Submissions.css';
const Submissions = () => {
    const [submissions, setSubmissions] = useState([]);
    useEffect(() => {
        async function fetchSubmissions() {
            try {
                const response = await axios.get('https://backend.codeloft.online/all_submissions');
                setSubmissions(response.data.submissions);
            } catch (err) {
                console.error('Error fetching submissions: ' + err);
            }
        }
        fetchSubmissions();
    }, []);
    return (
        <div className="submissions-container">
            <h2>All Submissions</h2>
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Problem</th>
                        <th>Verdict</th>
                        <th>Submission Time</th>
                    </tr>
                </thead>
                <tbody>
                    {submissions.map((submission) => (
                        <tr key={submission._id}>
                            <td>{`${submission.userId.firstname} ${submission.userId.lastname}`}</td>
                            <td>{submission.problemId.problem_name}</td>
                            <td>{submission.verdict}</td>
                            <td>{new Date(submission.submissionTime).toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Submissions;
