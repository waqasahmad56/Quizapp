import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'; 
// import { Link } from 'react-router-dom';
import '../App.css'

const Navbar = () => {
  const navigate = useNavigate();

//   const handleNavigation = () => {
//     navigate('/homepage'); 
//   };

  return (
    <nav className="navbar topnav  p-3 d-flex align-items-center shadow-sm"  style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
    
      <div className="  " onClick={() => navigate('/homepage')}>
                        {/* <FontAwesomeIcon icon={faBackward} />  */}
                        <FontAwesomeIcon icon={faAngleLeft} />
                    </div>
                    <div className="">
        <img src="/testportal-logo.svg" alt="Logo" className="logo" />
        
      </div>
      <div className=" custom-profile text-center flex-grow-1 fs-5">
        <span>Profile</span>
      </div>
    </nav>
  );
};

export default Navbar;
