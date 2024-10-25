import React from 'react';
import { Link } from 'react-router-dom';
import './HomeNav.css';
import { useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';



const RecordNav = () => {

  const navigate = useNavigate();
  const profile = useSelector((state) => state.profile);
  const firstLetter =  profile.firstName.charAt(0).toUpperCase();

  return (
    <nav className="navbar navbar-light topnav d-flex justify-content-between align-items-center shadow-sm ">
          <button className="btn   position-absolute start-0 mx-2 fs-5" onClick={() => navigate('/home')}>
          {/* <FontAwesomeIcon icon={faBackward} /> */}
          <FontAwesomeIcon icon={faAngleLeft} />

        </button>
      <div className="">
        <img src="/testportal-logo.svg" alt="Logo" className="logo" />
        
      </div>
      <ul className="navbar-nav2  mx-auto d-flex justify-content-center">
       
        <li className="nav-item mt-3">
          <Link to="/recordpage" className="nav-link text-dark">Analytical Record</Link>
        </li>
        
      </ul>
      <div className="circle bg-info text-white border border-4 border-white shawdow-lg ">
        {firstLetter}
      </div>
    </nav>
  );
}

export default RecordNav;
