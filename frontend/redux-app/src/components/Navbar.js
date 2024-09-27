import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; 


const Navbar = () => {
  const navigate = useNavigate();

//   const handleNavigation = () => {
//     navigate('/homepage'); 
//   };

  return (
    <nav className="navbar bg-dark text-white p-3 d-flex align-items-center">
    
      <button className="btn btn-light " onClick={() => navigate('/homepage')}>
                        <FontAwesomeIcon icon={faArrowLeft} /> 
                    </button>
      <div className="mx-auto text-center flex-grow-1 fs-5">
        <span>Profile</span>
      </div>
    </nav>
  );
};

export default Navbar;
