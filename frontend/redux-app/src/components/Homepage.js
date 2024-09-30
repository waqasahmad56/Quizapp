import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import StudentPortal from './StudentPortal';

const Navbars = () => {
    return (
        // <div className=''>
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark p-3 shadow-sm position-fixed w-100 z-3">
            <div className="container d-flex justify-content-center">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-center" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link className="nav-link" to="/home">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/quiz">Quiz</Link>
                        </li>
                        {/* <li className="nav-item">
                            <Link className="nav-link" to="/question">Question</Link>
                        </li> */}
                        <li className="nav-item">
                            <Link className="nav-link" to="/reports">Reports</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
        // </div>
    );
};

const Homepage = () => {
    return (
        <div>
            <Navbars />
            <StudentPortal/>
        </div>
    );
};

export default Homepage;



































































































































































