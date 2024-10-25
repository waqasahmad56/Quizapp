import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import RecordNav from './RecordNav';
import Modal from 'react-modal';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

Modal.setAppElement('#root');

const RecordPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [studentStats, setStudentStats] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/users/results');
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };
 
    fetchResults();
  }, []);
  
  const openModal = (studentId) => {
    setSelectedStudentId(studentId);
    setStudentStats(calculateStudentStats(studentId));
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
    setSelectedStudentId(null);
    setStudentStats(null);
  };

  const calculateStudentStats = (studentId) => {
    const studentResults = results.filter(result => result.studentId === studentId);
    if (studentResults.length === 0) return null;

    const totalAttempts = studentResults.length;
    const totalQuestions = studentResults.reduce((sum, result) => sum + result.totalQuestions, 0);
    const totalCorrectAnswers = studentResults.reduce((sum, result) => sum + result.correctAnswers, 0);
    const overallPercentage = (totalCorrectAnswers / totalQuestions) * 100;
    const status = overallPercentage >= 40 ? 'pass' : 'fail';

    return {
      totalAttempts,
      totalQuestions,
      totalCorrectAnswers,
      overallPercentage,
      status,
    };
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return <div className="text-center"><p>Loading results...</p></div>;
  }

  const customModalStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      width: '700px',
      height: '470px',
      overflow: 'hidden',
      borderRadius: '15px',
      boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
      backgroundColor: '#f8f9fa',
    },
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.5)', 
    },
  };

  return (
    <>
      <RecordNav />
      <div className="container my-5 mytable2" style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}>
        <h2 className="text-center mb-1 border bg-primary text-white p-3 shadow">Analytical Quiz Results Table</h2>
        <table className="table table-bordered table-hover table-striped text-center shadow">
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Total Questions</th>
              <th>Correct Answers</th>
              <th>Incorrect Answers</th>
              <th>Result Percentage</th>
              <th>Total Time</th>
              <th>Status</th>
              <th>Start Time</th>
              <th>End Time</th>
            </tr>
          </thead>
          <tbody>
            {results.length > 0 ? (
              results.map((result, index) => (
                <tr key={result._id} onClick={() => openModal(result.studentId)} style={{ cursor: 'pointer' }}>
                  <td>{index + 1}</td>
                  <td>{result.totalQuestions}</td>
                  <td>{result.correctAnswers}</td>
                  <td>{result.incorrectAnswers}</td>
                  <td>{result.percentage}%</td>
                  <td>{formatTime(result.timeSpent)}</td>
                  <td>
                    {result.status === 'pass' ? (
                      <span className="badge bg-success">✔ Pass</span>
                    ) : (
                      <span className="badge bg-danger">✘ Fail</span>
                    )}
                  </td>
                  <td>{new Date(result.startTime).toLocaleString()}</td>
                  <td>{new Date(result.endTime).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="9" className="text-center">No Results Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <Modal 
        isOpen={modalIsOpen} 
        onRequestClose={closeModal} 
        contentLabel="Result Details" 
        style={customModalStyles}
      >
        <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
          <span 
            style={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer', color: '#dc3545' }} 
            onClick={closeModal}
          >
            <i className="fas fa-times fa-lg fs-2"></i>
          </span>
          <h2 style={{ color: '#007bff' }}>Test Attempt Summary</h2>
          <hr />
          {studentStats && (
            <div>
              <h4 className='mt-2' style={{ color: '#343a40' }}>Total Attempts: {studentStats.totalAttempts}</h4>
              <h4 style={{ color: '#343a40' }}>Total Questions: {studentStats.totalQuestions}</h4>
              <h4 style={{ color: '#343a40' }}>Correct Answers: {studentStats.totalCorrectAnswers}</h4>
              <h4 style={{ color: '#28a745' }}>Overall Percentage: {studentStats.overallPercentage.toFixed(2)}%</h4>
              <div style={{ width: '170px', height: '170px', margin: '5px auto' }}>
                <CircularProgressbar value={studentStats.overallPercentage} text={`${studentStats.overallPercentage.toFixed(0)}%`} />
                <p className='mt-2'><b>Status:</b> <span className={`badge ${studentStats.status === 'pass' ? 'bg-success' : 'bg-danger'} p-2`}>
                  {studentStats.status.charAt(0).toUpperCase() + studentStats.status.slice(1)}
                </span></p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
};

export default RecordPage;















































































































































































































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.css';
// import RecordNav from './RecordNav';
// import Modal from 'react-modal';
// import { CircularProgressbar } from 'react-circular-progressbar';
// import 'react-circular-progressbar/dist/styles.css';
// import { useNavigate } from 'react-router-dom';
// import '@fortawesome/fontawesome-free/css/all.min.css'; 

// Modal.setAppElement('#root');

// const RecordPage = () => {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalIsOpen, setModalIsOpen] = useState(false);
//   const [selectedResult, setSelectedResult] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/auth/users/results');
//         setResults(response.data);
//       } catch (error) {
//         console.error('Error fetching results:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResults();
//   }, []);

//   const openModal = (result) => {
//     setSelectedResult(result);
//     setModalIsOpen(true);
//   };

//   const closeModal = () => {
//     setModalIsOpen(false);
//     setSelectedResult(null);
//   };

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs.toString().padStart(2, '0')}`;
//   };

//   const calculateAverage = () => {
//     if (!selectedResult) return 0;
//     const totalQuestions = selectedResult.totalQuestions;
//     const correctAnswers = selectedResult.correctAnswers;
//     return (correctAnswers / totalQuestions) * 100;
//   };

//   if (loading) {
//     return <div className="text-center"><p>Loading results...</p></div>;
//   }

//   const customModalStyles = {
//     content: {
//       top: '50%',
//       left: '50%',
//       right: 'auto',
//       bottom: 'auto',
//       marginRight: '-50%',
//       transform: 'translate(-50%, -50%)',
//       width: '650px', 
//       height: '350px', 
//       overflow: 'hidden', 
//       borderRadius:'15px',

//       boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
//     },
//   };

//   return (
//     <>
//       <RecordNav />
//       <div className="container my-5 mytable2" style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
//         <h2 className="text-center mb-1 border bg-primary text-white p-3 shadow">Analytical Quiz Results Table</h2>
//         <table className="table table-bordered table-hover table-striped text-center shadow">
//           <thead className="table-primary">
//             <tr>
//               <th>#</th>
//               <th>Total Questions</th>
//               <th>Correct Answers</th>
//               <th>Incorrect Answers</th>
//               <th>Result Percentage</th>
//               <th>Total Time</th>
//               <th>Status</th>
//               <th>Start Time</th>
//               <th>End Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.length > 0 ? (
//               results.map((result, index) => (
//                 <tr key={result._id} onClick={() => openModal(result)} style={{ cursor: 'pointer' }}>
//                   <td>{index + 1}</td>
//                   <td>{result.totalQuestions}</td>
//                   <td>{result.correctAnswers}</td>
//                   <td>{result.incorrectAnswers}</td>
//                   <td>{result.percentage}%</td>
//                   <td>{formatTime(result.timeSpent)}</td>
//                   <td>
//                     {result.status === 'pass' ? (
//                       <span className="badge bg-success">✔ Pass</span>
//                     ) : (
//                       <span className="badge bg-danger">✘ Fail</span>
//                     )}
//                   </td>
//                   <td>{new Date(result.startTime).toLocaleString()}</td>
//                   <td>{new Date(result.endTime).toLocaleString()}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center">No Results Available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>

//       <Modal isOpen={modalIsOpen} onRequestClose={closeModal} contentLabel="Result Details" style={customModalStyles}>
//         <div style={{ padding: '20px', textAlign: 'center' }}>
//           <span 
//             style={{ position: 'absolute', top: '15px', right: '15px', cursor: 'pointer' }} 
//             onClick={closeModal}
//           >
//             <i className="fas fa-times fa-lg fs-2"></i>
//           </span>
//           <h2>Test Attempt Details</h2>
//           {selectedResult && (
//             <div>
//               <h4 className='mt-4'>Overall Percentage: {calculateAverage().toFixed(2)}%</h4>
//               <div style={{ width: '140px', height: '140px', margin: '20px auto' }}>
//                 <CircularProgressbar value={calculateAverage()} text={`${calculateAverage().toFixed(0)}%`} />
//               </div>
//               <p><b>Status:</b> <span className='badge bg-info p-2 '>{selectedResult.status}</span></p>
//             </div>
//           )}
//         </div>
//       </Modal>
//     </>
//   );
// };

// export default RecordPage;









































































































































































































































































































































































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import '../App.css';
// import RecordNav from './RecordNav';
// import { useNavigate } from 'react-router-dom';
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// // import { faAngleLeft } from '@fortawesome/free-solid-svg-icons';

// const RecordPage = () => {
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/auth/users/results');
//         setResults(response.data);
//         console.log('Results fetched:', response.data);
//       } catch (error) {
//         console.error('Error fetching results:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchResults();
//   }, []);

//   const formatTime = (seconds) => {
//     const minutes = Math.floor(seconds / 60);
//     const secs = seconds % 60;
//     return `${minutes}:${secs.toString().padStart(2, '0')}`;
//   };

//   if (loading) {
//     return <div className="text-center"><p>Loading results...</p></div>;
//   }

//   return (
//     <>
//       <RecordNav />
//       <div className="container my-5 mytable2" style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
//         <h2 className="text-center mb-1 border bg-primary text-white p-3 shadow">Analytical Quiz Results Table</h2>
//         <table className="table table-bordered table-hover table-striped text-center shadow">
//           <thead className="table-primary">
//             <tr>
//               <th>#</th>
//               <th>Total Questions</th>
//               <th>Correct Answers</th>
//               <th>Incorrect Answers</th>
//               <th>Result Percentage</th>
//               <th>Total Time</th>
//               <th>Status</th>
//               <th>Start Time</th>
//               <th>End Time</th>
//             </tr>
//           </thead>
//           <tbody>
//             {results.length > 0 ? (
//               results.map((result, index) => (
//                 <tr key={result._id}>
//                   <td>{index + 1}</td>
//                   <td>{result.totalQuestions}</td>
//                   <td>{result.correctAnswers}</td>
//                   <td>{result.incorrectAnswers}</td>
//                   <td>{result.percentage}%</td>
//                   <td>{formatTime(result.timeSpent)}</td>
//                   <td>
//                     {result.status === 'pass' ? (
//                       <span className="badge bg-success">✔ Pass</span>
//                     ) : (
//                       <span className="badge bg-danger">✘ Fail</span>
//                     )}
//                   </td>
//                   <td>{new Date(result.startTime).toLocaleString()}</td>
//                   <td>{new Date(result.endTime).toLocaleString()}</td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="9" className="text-center">No Results Available</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default RecordPage;









