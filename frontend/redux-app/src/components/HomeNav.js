import React, { useState} from 'react';
import {useNavigate, Link, useLocation } from 'react-router-dom';
import './HomeNav.css';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import NotificationList from './NotificationList';

const HomeNav = () => {

  const profile = useSelector((state) => state.profile);
  const firstLetter = profile.firstName ? profile.firstName.charAt(0).toUpperCase() : ''; 
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const location = useLocation(); 
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLinkClick = () => {
    setIsDropdownOpen(false); 
  };
  

  return (
    <>


    <nav className="navbar navbar-light topnav d-flex justify-content-between align-items-center shadow-sm ">
      
      {(location.pathname === '/quizdata' || location.pathname === '/analyticalquestion') && (
         <div>
         <img src="/testportal-logo.svg" alt="Logo" className="logo position-absolute z-3 top-0 start-0 mt-4" />
       </div>
      )}
      <ul className="navbar-nav2 mx-auto d-flex gap-4 justify-content-center mt-2">
      <div>
          <img src="/testportal-logo.svg" alt="Logo" className="logo position-absolute z-3 top-0 start-0 mt-4" />
        </div>
        <li className="nav-item">
          <Link to="/home" className="nav-link fw-normal">Launchpad</Link>
        </li> 
        <li className="nav-item">
          <Link to="/quizdata" className="nav-link">Quiz Questions</Link>
        </li>
        <li className="nav-item">
          <Link to="/testtables" className="nav-link">Test & Sections</Link>
        </li>
        <li className="nav-item">
          <Link to="/studentresultpage" className="nav-link">Reports</Link>
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
          <div className="bg-light w-50 p-1 rounded ">
            {/* position-absolute z-5 top-0 start-0 mt-4 */}
            <Link className="dropdown-item text-center" to="/homepage" onClick={handleLinkClick}>User Profile</Link>
            <Link className="dropdown-item text-center" to="/login" onClick={handleLogout}>Logout</Link>

          </div>
        )}
      </div>
          <NotificationList/>
    </nav>
    </>
  );
};

export default HomeNav;







