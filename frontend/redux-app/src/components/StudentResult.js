import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './StudentResult.css'; 
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'; 
import { Tooltip } from 'react-tooltip'; 

const StudentResult = () => {
  const [latestResult, setLatestResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLatestResult = async () => {
      try {
        const resultsResponse = await axios.get('http://localhost:5000/auth/users/results'); 
        const results = resultsResponse.data;

        if (results.length > 0) {
          results.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
          setLatestResult(results[0]); 

          const profileResponse = await axios.get('http://localhost:5000/auth/users/profile'); 
          setStudentName(`${profileResponse.data.firstName} ${profileResponse.data.lastName}`);
        }
        setLoading(false);
      } catch (error) {
        console.error('Error fetching results:', error);
        setLoading(false);
      }
    };

    fetchLatestResult();
  }, []);

  const formatTime = (timeInSeconds) => {
    if (timeInSeconds >= 60) {
      const minutes = Math.floor(timeInSeconds / 60);
      const seconds = timeInSeconds % 60;
      return `${minutes}m ${seconds}s`;
    }
    return `${timeInSeconds}s`;
  };

  if (loading) {
    return <div className="text-center"><p>Loading results...</p></div>;
  }

  if (!latestResult) {
    return <div className="text-center"><p>No results found.</p></div>;
  }

  return (
    <>
      <div className='topnav text-center text-dark w-100 p-4 shadow-sm' style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
        <button className="btn position-absolute top-0 start-0 mx-3 mt-3" onClick={() => navigate('/home')}>
          <FontAwesomeIcon icon={faAngleLeft} />
        </button>
        Student Result
      </div>
      
      <div className="container mt-3" style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
        <div className="row mb-4">
          <div className="col-md-6">
            <div className="card mb-4 shadow mytable4" style={{ width: '1100px' }}>
              <div className="card-body bg-light">
                <h5 className="card-title text-center">Result Summary</h5>
                <table className="table table-bordered table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Name</th>
                      <th>Total Time Spent</th>
                      <th>Total Questions</th>
                      <th>Correct Answers</th>
                      <th>Incorrect Answers</th>
                      <th>Percentage</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{studentName}</td>
                      <td>{formatTime(latestResult.timeSpent)}</td> 
                      <td>{latestResult.totalQuestions}</td>
                      <td>{latestResult.correctAnswers}</td>
                      <td>{latestResult.incorrectAnswers}</td>
                      <td>{latestResult.percentage}%</td>
                      <td>{latestResult.status}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="col-md-6">
            <div className="card shadow mytable5" style={{ width: '1100px' }}>
              <div className="card-body bg-light">
                <div className="table-responsive">
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Question No</th>
                        <th>Result</th>
                        <th>Time Spent</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.from({ length: latestResult.totalQuestions }, (_, index) => {
                        const timeSpent = latestResult.questionTimes[index] || 0; 
                        const isCorrect = index < latestResult.correctAnswers; 
                        const correctAnswer = latestResult.correctAnswersList[index] || 'N/A';

                        return (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>
                              {isCorrect ? (
                                <span className="text-success">Correct</span>
                              ) : (
                                <span 
                                  className="text-danger"
                                  data-tooltip-id={`tooltip-${index}`} 
                                >
                                  Incorrect
                                </span>
                              )}
                              <Tooltip id={`tooltip-${index}`} place="top" effect="solid">
                                {correctAnswer}
                              </Tooltip>
                            </td>
                            <td>{formatTime(timeSpent)}</td> 
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentResult;











































































































































































































































































































// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import './StudentResult.css'; 
// import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'; 
// import { Tooltip } from 'react-tooltip'; 

// const StudentResult = () => {
//   const [latestResult, setLatestResult] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [studentName, setStudentName] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchLatestResult = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/auth/users/results'); 
//         const results = response.data;

//         if (results.length > 0) {
//           results.sort((a, b) => new Date(b.startTime) - new Date(a.startTime));
//           setLatestResult(results[0]); 

//           const profileResponse = await axios.get('http://localhost:5000/auth/users/profile');
//           setStudentName(`${profileResponse.data.firstName} ${profileResponse.data.lastName}`);
//         }
//         setLoading(false);
//       } catch (error) {
//         console.error('Error fetching results:', error);
//         setLoading(false);
//       }
//     };

//     fetchLatestResult();
//   }, []);

//   const formatTime = (timeInSeconds) => {
//     if (timeInSeconds >= 60) {
//       const minutes = Math.floor(timeInSeconds / 60);
//       const seconds = timeInSeconds % 60;
//       return `${minutes}m ${seconds}s`;
//     }
//     return `${timeInSeconds}s`;
//   };

//   if (loading) {
//     return <div className="text-center"><p>Loading results...</p></div>;
//   }

//   if (!latestResult) {
//     return <div className="text-center"><p>No results found.</p></div>;
//   }

//   return (
//     <>
//       <div className='topnav text-center text-dark w-100 p-4 shadow-sm' style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
//         <button className="btn position-absolute top-0 start-0 mx-3 mt-3" onClick={() => navigate('/home')}>
//           <FontAwesomeIcon icon={faAngleLeft} />
//         </button>
//         Student Result
//       </div>
      
//       <div className="container mt-3" style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
//         <div className="row mb-4">
//           <div className="col-md-6">
//             <div className="card mb-4 shadow mytable4" style={{ width: '1100px' }}>
//               <div className="card-body bg-light">
//                 <h5 className="card-title text-center">Result Summary</h5>
//                 <table className="table table-bordered table-hover">
//                   <thead className="table-light">
//                     <tr>
//                       <th>Name</th>
//                       <th>Total Time Spent</th>
//                       <th>Total Questions</th>
//                       <th>Correct Answers</th>
//                       <th>Incorrect Answers</th>
//                       <th>Percentage</th>
//                       <th>Status</th>
//                     </tr>
//                   </thead>
//                   <tbody>
//                     <tr>
//                       <td>{studentName}</td>
//                       <td>{formatTime(latestResult.timeSpent)}</td> 
//                       <td>{latestResult.totalQuestions}</td>
//                       <td>{latestResult.correctAnswers}</td>
//                       <td>{latestResult.incorrectAnswers}</td>
//                       <td>{latestResult.percentage}%</td>
//                       <td>{latestResult.status}</td>
//                     </tr>
//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>

//           <div className="col-md-6">
//             <div className="card shadow mytable5" style={{ width: '1100px' }}>
//               <div className="card-body bg-light">
//                 <div className="table-responsive">
//                   <table className="table table-striped table-bordered">
//                     <thead>
//                       <tr>
//                         <th>Question No</th>
//                         <th>Result</th>
//                         <th>Time Spent</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {Array.from({ length: latestResult.totalQuestions }, (_, index) => {
//                         const timeSpent = latestResult.questionTimes[index] || 0; 
//                         const isCorrect = index < latestResult.correctAnswers; 
//                         const correctAnswer = latestResult.correctAnswersList[index] || 'N/A';

//                         return (
//                           <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>
//                               {isCorrect ? (
//                                 <span className="text-success">Correct</span>
//                               ) : (
//                                 <span 
//                                   className="text-danger"
//                                   data-tooltip-id={`tooltip-${index}`} 
//                                 >
//                                   Incorrect
//                                 </span>
//                               )}
//                               <Tooltip id={`tooltip-${index}`} place="top" effect="solid">
//                                 {correctAnswer}
//                               </Tooltip>
//                             </td>
//                             <td>{formatTime(timeSpent)}</td> 
//                           </tr>
//                         );
//                       })}
//                     </tbody>
//                   </table>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default StudentResult;













