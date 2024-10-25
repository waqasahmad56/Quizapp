import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ResultPage from './ResultPage';
import { useSelector } from 'react-redux';

 
const ResultNav = () => {
  const profile = useSelector((state) => state.profile);
  const firstLetter =  profile.firstName.charAt(0).toUpperCase();
    const navigate = useNavigate();
   
  return (
    <div>
    
          <div className='border  text-dark p-4 text-center fs-5 shadow-sm topnav'>
          Student Records
        <button className="btn  position-absolute start-0 mx-3 fs-5" onClick={() => navigate('/home')}>
          {/* <FontAwesomeIcon icon={faBackward} /> */}
          <FontAwesomeIcon icon={faAngleLeft} />

          
        </button>
      </div> 
      <div className="circle bg-info text-white border border-4 border-white shawdow-lg position-absolute top-0 end-0 mx-5 mt-4">
          {firstLetter}
        </div>
      <ResultPage/>
    </div>
  )
}

export default ResultNav
