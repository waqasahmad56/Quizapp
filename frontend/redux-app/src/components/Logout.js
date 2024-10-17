import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
// import { faRightFromBracket } from '@fortawesome/free-solid-svg-icons'; 
import '../App.css';
function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 
  const location = useLocation();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };


  const isDashboard = location.pathname === '/dashboard';

  return (
    <div className=''>
      
      {isDashboard ? (
            <FontAwesomeIcon className='iconSize position-fixed z-3 top-0 start-0 mt-2' icon={faSlack} /> 

      ) : (
        <img src="/testportal-logo.svg" alt="Logo" className="logo position-absolute z-3 top-0 start-0 mt-4" />
      )}

      <button className='btn btn-primary position-absolute z-3 top-0 end-0 mt-4 m-3' style={{ fontFamily: 'Tahoma Verdana sans-serif' }} onClick={handleLogout}>Logout</button>
      {/* <FontAwesomeIcon className='btn btn-dark position-fixed z-3 top-0 end-0 mt-4 m-3' onClick={handleLogout} icon={faRightFromBracket} /> */}

    </div>
  );
}

export default Logout;






































































