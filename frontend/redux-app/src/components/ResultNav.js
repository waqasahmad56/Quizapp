import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import ResultPage from './ResultPage';


const ResultNav = () => {
    const navigate = useNavigate();
   
  return (
    <div>
         <div className='border bg-dark text-white p-4 text-center fs-5'>
          Student Records
        <button className="btn btn-light position-absolute start-0 mx-3" onClick={() => navigate('/profile')}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
      </div>
      <ResultPage/>
    </div>
  )
}

export default ResultNav
