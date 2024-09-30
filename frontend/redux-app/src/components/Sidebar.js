import React, { useState } from 'react';
import { FaFileAlt } from 'react-icons/fa'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPenToSquare, faSquarePollHorizontal, faDeleteLeft, faPlus, faUser } from '@fortawesome/free-solid-svg-icons';
import CreateQuiz from './CreateQuiz';
import QuizList from './QuizList';
import DelleteQuiz from './DelleteQuiz';
import QuizListData from './QuizListData';
import UserManagement from './UserManagement';
import ResultPage from './ResultPage';

function Dashboard() {
  return <div className='bg-light text-dark w-75 h-100 dash rounded-3 shadow-lg usermanagementform'>
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
    <ResultPage/>
  </div>;
}

function DelleteQuiZ() {
  return <div><DelleteQuiz/></div>;
}

function RecordS() {
  return <div><QuizListData/></div>;
}

function Sidebar() {
  const [activePage, setActivePage] = useState('dashboard');
  const [isVisible, setIsVisible] = useState(true);

  const handlePageClick = (page) => {
    setActivePage(page);
    setIsVisible(false); // Hide sidebar when a page is selected
  };

  const handleMainContentClick = () => {
    setIsVisible(true); // Show sidebar when main content is clicked
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
      <div className={`sidebar position-fixed bg-dark text-white p-3 ${isVisible ? 'visible' : 'hidden'}`} style={{
        width: '250px',
        height: '100%',
        top: '90px', 
        left: 0,
        transition: 'transform 0.3s ease',
        transform: isVisible ? 'translateX(0)' : 'translateX(-100%)'
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
              <FontAwesomeIcon className='me-2' icon={faSquarePollHorizontal} />
              Student Results
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




























































































































































































































































































// import React, { useState } from 'react';
// import {  FaFileAlt } from 'react-icons/fa'; 
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPenToSquare,faSquarePollHorizontal,faDeleteLeft,faPlus,faUser } from '@fortawesome/free-solid-svg-icons';
// import CreateQuiz from './CreateQuiz';
// import QuizList from './QuizList';
// import DelleteQuiz from './DelleteQuiz';
// import QuizListData from './QuizListData';
// import UserManagement from './UserManagement';
// import ResultPage from './ResultPage';


// function Dashboard() {
//   return <div className='bg-light text-dark w-75 h-100 dash rounded-3 shadow-lg usermanagementform'>
//     <UserManagement/>

//   </div>;
// }

// function CreateQuiZ() {
//   return <div><CreateQuiz/></div>;
// }

// function UpdateQuiZ() {
//   return <div className='quiz'><QuizList/></div>;
// }

// function ResultS() {
//   return <div className='dash'>
//     <ResultPage/>
    
//   </div>;
// }

// function DelleteQuiZ() {
//   return <div><DelleteQuiz/></div>;
// }

// function RecordS() {
//   return <div className=''>
//   <QuizListData/>
// </div>;
// }

// function Sidebar() {
//   const [activePage, setActivePage] = useState('dashboard');

//   const renderPageContent = () => {
//     switch (activePage) {
//       case 'dashboard':
//         return <Dashboard />;
//       case 'createquiz':
//         return <CreateQuiZ />;
//       case 'updatequiz':
//         return <UpdateQuiZ />;
//       case 'results':
//         return <ResultS />;
//       case 'delletequiz':
//         return <DelleteQuiZ />;
//       case 'records':
//         return <RecordS />;
//       default:
//         return <div>Select a page</div>;
//     }
//   };

//   return (
//     <div className="d-flex position-relative">
//       <div className=" position-relative">
//       <div className=" position-absolute inset-0 bg-dark text-white p-3  " style={{ width: '250px',top: '-15px', left: '0px',height:'100%' , minHeight: '650px', // Set your desired minimum height here
//     maxHeight: '100%',}}>
         
//         <div className="mb-4">
//           <h2 className="text-white">INOVAQO</h2>
//         </div>

//         <ul className="nav flex-column gap-4">
//           <li className="nav-item">
//             <button
//               className={`nav-link text-white d-flex align-items-center rounded-2  ${activePage === 'dashboard' ? 'active bg-success' : ''}`}
//               onClick={() => setActivePage('dashboard')}
//             >
//               {/* <FaTachometerAlt className="me-2" /> */}
//               <FontAwesomeIcon icon={faUser} className='me-2' /> 
//               User Management
//             </button>
//           </li>
//           <li className="nav-item">
//             <button
//               className={`nav-link text-white d-flex align-items-center rounded-2 ${activePage === 'createquiz' ? 'active bg-success' : ''}`}
//               onClick={() => setActivePage('createquiz')}
//             >
//               <FontAwesomeIcon className='me-2' icon={faPlus} />
//               {/* <FaCalendarAlt className="me-2" /> */}
//               Create Quiz
//             </button>
//           </li>
//           <li className="nav-item">
//             <button
//               className={`nav-link text-white d-flex align-items-center rounded-2 ${activePage === 'updatequiz' ? 'active bg-success' : ''}`}
//               onClick={() => setActivePage('updatequiz')}
//             >
//                <FontAwesomeIcon className='me-2' icon={faPenToSquare} />
//               {/* <FaUserAlt className="me-2" /> */}
//               Update Quiz
//             </button>
//           </li>

//           <li className="nav-item">
//             <button
//               className={`nav-link text-white d-flex align-items-center rounded-2 ${activePage === 'delletequiz' ? 'active bg-success' : ''}`}
//               onClick={() => setActivePage('delletequiz')}
//             >
//               <FontAwesomeIcon className='me-2' icon={faDeleteLeft} />
//               {/* <FaMoneyBill className="me-2" /> */}
//               Dellete Quiz
//             </button>
//           </li>

//           <li className="nav-item">
//             <button
//               className={`nav-link text-white d-flex align-items-center rounded-2 ${activePage === 'results' ? 'active bg-success' : ''}`}
//               onClick={() => setActivePage('results')}
//             >
//              <FontAwesomeIcon className='me-2' icon={faSquarePollHorizontal}/>
//               {/* <FaTasks className="me-2" /> */}
//                Student Results
//             </button>
//           </li>
      
//           <li className="nav-item">
//             <button
//               className={`nav-link text-white d-flex align-items-center rounded-2 ${activePage === 'records' ? 'active bg-success' : ''}`}
//               onClick={() => setActivePage('records')}
//             >
//               <FaFileAlt className="me-2" />
//               Questions
//             </button>
//           </li>
//         </ul>
//       </div>
//       </div>
      
     

//       {/* Main Content */}
//       <div className="flex-grow-1 mx-2">
//         {renderPageContent()}
//       </div>
//     </div>
//   );
// }

// export default Sidebar;
