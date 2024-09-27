
import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSlack } from '@fortawesome/free-brands-svg-icons';
import '../App.css';


function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); 

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
  <>
  <FontAwesomeIcon className='iconSize position-absolute top-0 start-0 mt-2' icon={faSlack} />
  <button className='btn btn-primary position-absolute top-0 end-0 mt-4 m-3' onClick={handleLogout}>Logout</button>;
  </>
  );
}

export default Logout;
