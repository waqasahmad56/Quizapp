import React, { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare,  faDeleteLeft, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import CreateQuiz from './CreateQuiz';
import QuizList from './QuizList';
import DelleteQuiz from './DelleteQuiz';
import UserManagement from './UserManagement';
import CreateQuizz from './CreateQuizz';
import QuizData from './QuizData';


function Dashboard() {
  return <div className='topnav text-dark w-75 h-100 dash rounded-3 shadow-lg usermanagementform'>
    <UserManagement/>
  </div>;
}

function CreateQuiZ() {
  return <div><CreateQuiz/></div>;
}

function UpdateQuiZ() {
  return <div className='quiz'><QuizList/></div>;
}

function ResultS() {
  return <div className='dash'>
    <CreateQuizz/>
  </div>;
}

function DelleteQuiZ() {
  return <div><DelleteQuiz/></div>;
}

function RecordS() {
  return <div className='mydataquiz'><QuizData/></div>;
}

function Sidebar() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isVisible, setIsVisible] = useState(true);

  const handlePageClick = (page) => {
    setActivePage(page);
    setIsVisible(false); 
  };

  const handleMainContentClick = () => {
    setIsVisible(true); 
  };

  const renderPageContent = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'createquiz':
        return <CreateQuiZ />;
      case 'updatequiz':
        return <UpdateQuiZ />;
      case 'results':
        return <ResultS />;
      case 'delletequiz':
        return <DelleteQuiZ />;
      case 'records':
        return <RecordS />;
      default:
        return <div>Select a page</div>;
    }
  };

  return (
    <div className="d-flex position-relative">
      <div className={`sidebar position-fixed bg-dark text-white p-3 `} style={{
                                                                    // ${isVisible ? 'visible' : 'hidden'}
        width: '250px',
        height: '100%',
        top: '90px', 
        left: 0,
        // transition: 'transform 0.3s ease',
        // transform: isVisible ? 'translateX(0)' : 'translateX(-100%)'
      }}>
        <div className="mb-4">
          <h2 className="text-white">Admin Panel</h2>
        </div>

        <ul className="nav flex-column gap-4">
          <li className="nav-item">
            <button
              className={`nav-link text-white d-flex align-items-center rounded-2 ${activePage === 'dashboard' ? 'active bg-success' : ''}`}
              onClick={() => handlePageClick('dashboard')}
            >
              <FontAwesomeIcon icon={faUser} className='me-2' /> 
              User Management
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white d-flex align-items-center rounded-2 ${activePage === 'createquiz' ? 'active bg-success' : ''}`}
              onClick={() => handlePageClick('createquiz')}
            >
              <FontAwesomeIcon className='me-2' icon={faPlus} />
              Create Quiz
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white d-flex align-items-center rounded-2 ${activePage === 'updatequiz' ? 'active bg-success' : ''}`}
              onClick={() => handlePageClick('updatequiz')}
            >
              <FontAwesomeIcon className='me-2' icon={faPenToSquare} />
              Update Quiz
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white d-flex align-items-center rounded-2 ${activePage === 'delletequiz' ? 'active bg-success' : ''}`}
              onClick={() => handlePageClick('delletequiz')}
            >
              <FontAwesomeIcon className='me-2' icon={faDeleteLeft} />
              Delete Quiz
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white d-flex align-items-center rounded-2 ${activePage === 'results' ? 'active bg-success' : ''}`}
              onClick={() => handlePageClick('results')}
            >
              <FontAwesomeIcon className='me-2' icon={faPlus} />

              Create Analytical Quiz 
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link text-white d-flex align-items-center rounded-2 ${activePage === 'records' ? 'active bg-success' : ''}`}
              onClick={() => handlePageClick('records')}
            >
              <FaFileAlt className="me-2" />
              Questions
            </button>
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-grow-1 mx-2" onClick={handleMainContentClick}>
        {renderPageContent()}
      </div>
    </div>
  );
}

export default Sidebar;



























































































































































































































