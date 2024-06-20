import React from 'react';
import Navbar from './Navbar';
import '../stylecss/Home.css'
function Home() {
    return (
    <div className="home">
        <Navbar/>
        <div className="home-content">
        <img src="/images/codebag.jpeg" alt="Description of image" className="home-image" />
    </div>
    </div>
    );
}
export default Home;

