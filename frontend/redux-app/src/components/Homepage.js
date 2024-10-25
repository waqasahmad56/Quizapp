import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; 
import StudentPortal from './StudentPortal';
import ChatBox from './ChatBox';


const Navbars = () => {
    const location = useLocation();

    return (
        <>
        <div className="topnav position-fixed w-100 z-3 d-flex justify-content-between align-items-center shadow-sm p-2">
            <Link to="/home" className="navbar-logo">
                <img src="/testportal-logo.svg" alt="Logo" className="logo" />
            </Link>
            <div className="nav-links d-flex justify-content-center flex-grow-1">
                <Link className={`nav-link ${location.pathname === '/home' ? 'active' : ''}`} to="/home">Launchpad</Link>
                <Link className={`nav-link ${location.pathname === '/profile' ? 'active' : ''}`} to="/profile">Profile</Link>
                <Link className={`nav-link ${location.pathname === '/quiz' ? 'active' : ''}`} to="/quiz">Quiz</Link>
                <Link className={`nav-link ${location.pathname === '/test' ? 'active' : ''}`} to="/test">Test Portal</Link>
                {/* <Link className={`nav-link ${location.pathname === '/recordpage' ? 'active' : ''}`} to="/recordpage">Reports</Link> */}
            </div>
        </div>
        </>
    );
};

const Homepage = () => {
    return (
        <div>
            <Navbars />
            <div style={{ padding: '70px 20px 20px' }}> 
                <StudentPortal />
            </div>
            <ChatBox/>

        </div>
    );
};

export default Homepage;







