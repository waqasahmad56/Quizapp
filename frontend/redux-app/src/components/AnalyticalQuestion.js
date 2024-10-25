import React, { useEffect, useState } from 'react';
import HomeNav from './HomeNav';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './AnalyticalQuestion.css';
import { useNavigate } from 'react-router-dom'; 

const AnalyticalQuestion = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(1800);
  const [isTimeOver, setIsTimeOver] = useState(false);
  const [studentId, setStudentId] = useState('');
  const [startTime, setStartTime] = useState(null);
  const [questionTimes, setQuestionTimes] = useState([]);
  const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/users/quizques');
        setQuizzes(response.data);
        setStartTime(Date.now());
        setQuestionTimes(new Array(response.data.reduce((acc, quiz) => acc + quiz.questions.length, 0)).fill(0));
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          setIsTimeOver(true);
          handleSubmit();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/auth/users/profile');
      if (response.data._id) {
        setStudentId(response.data._id);
      } else {
        console.error('Student ID not found in profile data.');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    if (currentQuestionStartTime) {
      const currentTime = Date.now();
      const timeSpent = Math.floor((currentTime - currentQuestionStartTime) / 1000);
      const questionIndex = currentQuizIndex * quizzes[currentQuizIndex]?.questions.length + currentQuestionIndex;

      setQuestionTimes((prev) => {
        const newTimes = [...prev];
        newTimes[questionIndex] += timeSpent;
        return newTimes;
      });
    }

    setCurrentQuestionStartTime(Date.now());
  }, [currentQuizIndex, currentQuestionIndex]);

  const handleOptionChange = (option) => {
    const currentQuestion = quizzes[currentQuizIndex]?.questions[currentQuestionIndex];
    if (!currentQuestion) return;

    const previousOption = selectedOptions[`${currentQuizIndex}-${currentQuestionIndex}`];

    setSelectedOptions((prev) => ({
      ...prev,
      [`${currentQuizIndex}-${currentQuestionIndex}`]: option,
    }));

    if (option === currentQuestion.correctAnswer) {
      setCorrectCount((prev) => prev + (previousOption === currentQuestion.correctAnswer ? 0 : 1));
    } else if (previousOption === currentQuestion.correctAnswer) {
      setCorrectCount((prev) => prev - 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionStartTime) {
      const currentTime = Date.now();
      const timeSpent = Math.floor((currentTime - currentQuestionStartTime) / 1000);
      const questionIndex = currentQuizIndex * quizzes[currentQuizIndex]?.questions.length + currentQuestionIndex;

      setQuestionTimes((prev) => {
        const newTimes = [...prev];
        newTimes[questionIndex] += timeSpent;
        return newTimes;
      });
    }

    const isLastQuestion = currentQuestionIndex === quizzes[currentQuizIndex]?.questions.length - 1;
    const isLastQuiz = currentQuizIndex === quizzes.length - 1;

    if (isLastQuestion && isLastQuiz) {
      handleSubmit();
    } else if (currentQuestionIndex < quizzes[currentQuizIndex]?.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(currentQuizIndex + 1);
      setCurrentQuestionIndex(0);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    } else if (currentQuizIndex > 0) {
      setCurrentQuizIndex(currentQuizIndex - 1);
      setCurrentQuestionIndex(quizzes[currentQuizIndex - 1].questions.length - 1);
    }
  };

  const handlePageClick = (quizIndex, questionIndex) => {
    setCurrentQuizIndex(quizIndex);
    setCurrentQuestionIndex(questionIndex);
  };

  const handleSubmit = async () => {
    const currentQuiz = quizzes[currentQuizIndex];

    if (!currentQuiz) {
      console.error('Current quiz not found. Cannot submit results.');
      return;
    }

    const totalQuestions = quizzes.reduce((acc, quiz) => acc + quiz.questions.length, 0);
    const calculatedPercentage = (correctCount / totalQuestions) * 100;

    const correctAnswersList = quizzes.flatMap((quiz) => 
      quiz.questions.map((question) => question.correctAnswer)
    );
    const resultData = {
      quizId: currentQuiz._id,
      studentId,
      totalQuestions,
      correctAnswers: correctCount,
      incorrectAnswers: totalQuestions - correctCount,
      percentage: calculatedPercentage,
      status: calculatedPercentage >= 50 ? 'pass' : 'fail',
      startTime: new Date(startTime),
      endTime: new Date(),
      timeSpent: Math.floor((new Date() - startTime) / 1000),
      questionTimes,
      correctAnswersList,
    };

    try {
      await axios.post('http://localhost:5000/auth/users/savequizresult', resultData);
      console.log('Quiz results submitted:', resultData);
      navigate('/studentresult');
    } catch (error) {
      console.error('Error submitting results:', error);
    }
  };

  return (
    <>
      <HomeNav />

      <div className="container-fluid question-container" style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
        <div className="timer bg-secondary text-white text-center p-3 rounded mytimer border border-2 border-white shadow-sm">
          Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
        </div>

        {quizzes.length > 0 ? (
          <div className="row">
            <div className="col-md-6 text-section">
              <p>{quizzes[currentQuizIndex]?.questions[currentQuestionIndex]?.questionParagraph}</p>
            </div>
            <div className="col-md-6 options-section d-flex flex-column">
              <div className="option-list">
                {quizzes[currentQuizIndex]?.questions[currentQuestionIndex]?.options.map((option, index) => {
                  const optionKey = `${currentQuizIndex}-${currentQuestionIndex}`;
                  const isChecked = selectedOptions[optionKey] === option.optionText;
                  return (
                    <div key={option._id} className="form-check2 option-wrapper">
                      <input
                        className="form-check-input2"
                        type="radio"
                        name={`quizOptions${currentQuestionIndex}`}
                        id={`option${currentQuizIndex}-${currentQuestionIndex}-${index}`}
                        value={option.optionText}
                        checked={isChecked}
                        onChange={() => handleOptionChange(option.optionText)}
                      />
                      <label
                        className={`option-label ${isChecked ? 'selected' : ''}`}
                        htmlFor={`option${currentQuizIndex}-${currentQuestionIndex}-${index}`}
                      >
                        <div className={`circle-option shadow ${isChecked ? 'selected' : ''}`}>
                          {String.fromCharCode(65 + index)}
                        </div>
                      </label>
                      <span className="option-text">{option.optionText}</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : (
          <p>Loading quiz...</p>
        )}
      </div>

      <div className="pagination">
        <button className='button-disb' onClick={handlePrevQuestion} disabled={currentQuizIndex === 0}>
          &laquo; Prev
        </button>
        {quizzes.map((quiz, quizIndex) =>
          quiz.questions.map((_, questionIndex) => (
            <button
              key={`${quizIndex}-${questionIndex}`}
              className={`pagination-button ${quizIndex === currentQuizIndex && questionIndex === currentQuestionIndex ? 'active' : ''}`}
              onClick={() => handlePageClick(quizIndex, questionIndex)}
            >
              {quizIndex + 1}
            </button>
          ))
        )}
        <button className='button-disb' onClick={handleNextQuestion}>
          Next &raquo;
        </button>
      </div>
    </>
  );
};

export default AnalyticalQuestion;
























































































































































































































































































































































// import React, { useEffect, useState } from 'react';
// import HomeNav from './HomeNav';
// import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './AnalyticalQuestion.css';
// import { useNavigate } from 'react-router-dom'; 

// const AnalyticalQuestion = () => {
//   const [quizzes, setQuizzes] = useState([]);
//   const [selectedOptions, setSelectedOptions] = useState({});
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
//   const [correctCount, setCorrectCount] = useState(0);
//   const [timeLeft, setTimeLeft] = useState(1800);
//   const [isTimeOver, setIsTimeOver] = useState(false);
//   const [studentId, setStudentId] = useState('');
//   const [startTime, setStartTime] = useState(null);
//   const [questionTimes, setQuestionTimes] = useState([]);
//   const [currentQuestionStartTime, setCurrentQuestionStartTime] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchQuizzes = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/auth/users/quizques');
//         setQuizzes(response.data);
//         setStartTime(Date.now());
//         setQuestionTimes(new Array(response.data.reduce((acc, quiz) => acc + quiz.questions.length, 0)).fill(0));
//       } catch (error) {
//         console.error('Error fetching quizzes:', error);
//       }
//     };

//     fetchQuizzes();

//     const timer = setInterval(() => {
//       setTimeLeft((prevTime) => {
//         if (prevTime <= 1) {
//           clearInterval(timer);
//           setIsTimeOver(true);
//           handleSubmit();
//           return 0;
//         }
//         return prevTime - 1;
//       });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/auth/users/profile');
//         if (response.data._id) {
//           setStudentId(response.data._id);
//         } else {
//           console.error('Student ID not found in profile data.');
//         }
//       } catch (error) {
//         console.error('Error fetching user data:', error);
//       }
//     };

//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     if (currentQuestionStartTime) {
//       const currentTime = Date.now();
//       const timeSpent = Math.floor((currentTime - currentQuestionStartTime) / 1000);
//       const questionIndex = currentQuizIndex * quizzes[currentQuizIndex]?.questions.length + currentQuestionIndex;

//       setQuestionTimes((prev) => {
//         const newTimes = [...prev];
//         newTimes[questionIndex] += timeSpent;
//         return newTimes;
//       });
//     }

//     setCurrentQuestionStartTime(Date.now());
//   }, [currentQuizIndex, currentQuestionIndex]);

//   const handleOptionChange = (option) => {
//     const currentQuestion = quizzes[currentQuizIndex]?.questions[currentQuestionIndex];
//     if (!currentQuestion) return;

//     const previousOption = selectedOptions[`${currentQuizIndex}-${currentQuestionIndex}`];

//     setSelectedOptions((prev) => ({
//       ...prev,
//       [`${currentQuizIndex}-${currentQuestionIndex}`]: option,
//     }));

//     if (option === currentQuestion.correctAnswer) {
//       setCorrectCount((prev) => prev + (previousOption === currentQuestion.correctAnswer ? 0 : 1));
//     } else if (previousOption === currentQuestion.correctAnswer) {
//       setCorrectCount((prev) => prev - 1);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionStartTime) {
//       const currentTime = Date.now();
//       const timeSpent = Math.floor((currentTime - currentQuestionStartTime) / 1000);
//       const questionIndex = currentQuizIndex * quizzes[currentQuizIndex]?.questions.length + currentQuestionIndex;

//       setQuestionTimes((prev) => {
//         const newTimes = [...prev];
//         newTimes[questionIndex] += timeSpent;
//         return newTimes;
//       });
//     }

//     const isLastQuestion = currentQuestionIndex === quizzes[currentQuizIndex]?.questions.length - 1;
//     const isLastQuiz = currentQuizIndex === quizzes.length - 1;

//     if (isLastQuestion && isLastQuiz) {
//       handleSubmit();
//     } else if (currentQuestionIndex < quizzes[currentQuizIndex]?.questions.length - 1) {
//       setCurrentQuestionIndex(currentQuestionIndex + 1);
//     } else if (currentQuizIndex < quizzes.length - 1) {
//       setCurrentQuizIndex(currentQuizIndex + 1);
//       setCurrentQuestionIndex(0);
//     }
//   };

//   const handlePrevQuestion = () => {
//     if (currentQuestionIndex > 0) {
//       setCurrentQuestionIndex(currentQuestionIndex - 1);
//     } else if (currentQuizIndex > 0) {
//       setCurrentQuizIndex(currentQuizIndex - 1);
//       setCurrentQuestionIndex(quizzes[currentQuizIndex - 1].questions.length - 1);
//     }
//   };

//   const handlePageClick = (quizIndex, questionIndex) => {
//     setCurrentQuizIndex(quizIndex);
//     setCurrentQuestionIndex(questionIndex);
//   };

//   const handleSubmit = async () => {
//     const currentQuiz = quizzes[currentQuizIndex];

//     if (!currentQuiz) {
//       console.error('Current quiz not found. Cannot submit results.');
//       return;
//     }

//     const totalQuestions = quizzes.reduce((acc, quiz) => acc + quiz.questions.length, 0);
//     const calculatedPercentage = (correctCount / totalQuestions) * 100;

//     const correctAnswersList = quizzes.flatMap((quiz) => 
//       quiz.questions.map((question) => question.correctAnswer)
//     );

//     const resultData = {
//       quizId: currentQuiz._id,
//       studentId,
//       totalQuestions,
//       correctAnswers: correctCount,
//       incorrectAnswers: totalQuestions - correctCount,
//       percentage: calculatedPercentage,
//       status: calculatedPercentage >= 50 ? 'pass' : 'fail',
//       startTime: new Date(startTime),
//       endTime: new Date(),
//       timeSpent: Math.floor((new Date() - startTime) / 1000),
//       questionTimes,
//       correctAnswersList,
//     };

//     try {
//       await axios.post('http://localhost:5000/auth/users/savequizresult', resultData);
//       console.log('Quiz results submitted:', resultData);
//       navigate('/studentresult');
//     } catch (error) {
//       console.error('Error submitting results:', error);
//     }
//   };

//   return (
//     <>
//       <HomeNav />

//       <div className="container-fluid question-container" style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
//         <div className="timer bg-secondary text-white text-center p-3 rounded mytimer border border-2 border-white shadow-sm">
//           Time Left: {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
//         </div>

//         {quizzes.length > 0 ? (
//           <div className="row">
//             <div className="col-md-6 text-section">
//               <p>{quizzes[currentQuizIndex]?.questions[currentQuestionIndex]?.questionParagraph}</p>
//             </div>
//             <div className="col-md-6 options-section d-flex flex-column">
//               <div className="option-list">
//                 {quizzes[currentQuizIndex]?.questions[currentQuestionIndex]?.options.map((option, index) => {
//                   const optionKey = `${currentQuizIndex}-${currentQuestionIndex}`;
//                   const isChecked = selectedOptions[optionKey] === option.optionText;
//                   return (
//                     <div key={option._id} className="form-check2 option-wrapper">
//                       <input
//                         className="form-check-input2"
//                         type="radio"
//                         name={`quizOptions${currentQuestionIndex}`}
//                         id={`option${currentQuizIndex}-${currentQuestionIndex}-${index}`}
//                         value={option.optionText}
//                         checked={isChecked}
//                         onChange={() => handleOptionChange(option.optionText)}
//                       />
//                       <label
//                         className={`option-label ${isChecked ? 'selected' : ''}`}
//                         htmlFor={`option${currentQuizIndex}-${currentQuestionIndex}-${index}`}
//                       >
//                         <div className={`circle-option shadow ${isChecked ? 'selected' : ''}`}>
//                           {String.fromCharCode(65 + index)}
//                         </div>
//                       </label>
//                       <span className="option-text">{option.optionText}</span>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p>Loading quiz...</p>
//         )}
//       </div>

//       <div className="pagination">
//         <button className='button-disb' onClick={handlePrevQuestion} disabled={currentQuizIndex === 0}>
//           &laquo; Prev
//         </button>
//         {quizzes.map((quiz, quizIndex) =>
//           quiz.questions.map((_, questionIndex) => (
//             <button
//               key={`${quizIndex}-${questionIndex}`}
//               className={`pagination-button ${quizIndex === currentQuizIndex && questionIndex === currentQuestionIndex ? 'active' : ''}`}
//               onClick={() => handlePageClick(quizIndex, questionIndex)}
//             >
//               {quizIndex + 1}
//             </button>
//           ))
//         )}
//         <button className='button-disb' onClick={handleNextQuestion}>
//           Next &raquo;
//         </button>
//       </div>

//       <div className="footer">
//         <button className="btn btn-primary" onClick={handleSubmit}>
//           Submit Quiz
//         </button>
//       </div>
//     </>
//   );
// };

// export default AnalyticalQuestion;


















































































 