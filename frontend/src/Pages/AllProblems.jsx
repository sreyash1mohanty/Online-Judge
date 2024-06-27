import React, { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { Link,useNavigate } from 'react-router-dom';
import '../stylecss/AllProblems.css'
import { AuthContext } from '../context/AuthContext';
function AllProblems() {
    const { userId, userRole } = useContext(AuthContext);
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
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this problem?")) {
            try {
                const response = await axios.delete(`http://localhost:8080/delete/${id}`, {
                    data: { userId }} );
                if (response.status === 200) {
                    alert('Problem deleted successfully');
                    

                }
            } catch (err) {
                console.error("Error deleting the problem", err);
                alert('Error deleting problem');
            }
        }
    };
    return (
        <>
        <div className='header'>
        <h1>Dive in to Solve!!</h1>
        </div>
        <div className="all-problems-container">
            {problems.length === 0 && <p>No problems found</p>} 
            {problems.map((problem) => (
                <Link to={`/all-problems/${problem._id}`} key={problem._id} className="problem-link">
                    <div className="problem-card">
                        <div className="problem-card-content">
                            <h3 className="problem-card-title">{problem.problem_name}</h3> 
                            <p className="problem-card-author">Created by {problem.author}</p>
                        </div>
                        {userRole === 'admin' && (
                                <>
                                    <button className='delete-btn' onClick={() => handleDelete(problem._id)}>Delete</button>
                                    <Link to={`/edit-problem/${problem._id}`}><button className='update-btn'>Update</button></Link>
                                </>
                            )}
                        <div className={`problem-card-difficulty ${problem.difficulty.toLowerCase()}`}>
                            {problem.difficulty}
                        </div>
                    </div>
                </Link>
            ))}
        </div>
        </>
    );
}
export default AllProblems;
