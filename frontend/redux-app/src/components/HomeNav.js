import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './HomeNav.css';
import { useSelector } from 'react-redux';


const HomeNav = () => {
  const profile = useSelector((state) => state.profile);
  const firstLetter = profile.firstName ? profile.firstName.charAt(0).toUpperCase() : '';
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); 

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false); 
  };

  return (
    <>
    
    <nav className="navbar navbar-light topnav d-flex justify-content-between align-items-center shadow-sm">
      
      {(location.pathname === '/quizdata' || location.pathname === '/analyticalquestion') && (
        <div>
          <img src="/testportal-logo.svg" alt="Logo" className="logo" />
        </div>
      )}
      <ul className="navbar-nav2 mx-auto d-flex justify-content-center mt-2">
        <li className="nav-item">
          <Link to="/home" className="nav-link fw-normal">Launchpad</Link>
        </li>
        <li className="nav-item">
          <Link to="/quizdata" className="nav-link">Quiz Questions</Link>
        </li>
        <li className="nav-item">
          <Link to="/testtables" className="nav-link">Test & Sections</Link>
        </li>
      </ul>
      <div className="dropdown">
        <div 
          className="circle bg-info text-white border border-3 border-white shadow-lg d-flex align-items-center justify-content-center"
          onClick={toggleDropdown}
          aria-expanded={isDropdownOpen}
          style={{ cursor: 'pointer', width: '40px', height: '40px' }} 
        >
          {firstLetter}
        </div>
        {isDropdownOpen && (
          <div className="bg-light w-50 p-2 rounded ">
            <Link className="dropdown-item" to="/homepage" onClick={handleLinkClick}>User Profile</Link>
          </div>
        )}
      </div>
    </nav>
    </>
  );
};

export default HomeNav;







