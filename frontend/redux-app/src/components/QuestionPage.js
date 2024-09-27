import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';

const QuestionPage = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timer, setTimer] = useState(3600);
  const [answers, setAnswers] = useState([]);
  const [correctAnswersCount, setCorrectAnswersCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [studentId, setStudentId] = useState('');
  const navigate = useNavigate();

  
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/users/quizzes');
        setQuizzes(response.data);
        setStartTime(Date.now());
      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    };

    fetchQuizzes();

    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 0) {
          clearInterval(interval);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  
  useEffect(() => {
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

    fetchUserData();
  }, []);

  
  const handleAnswerChange = (optionId) => {
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuizIndex] = updatedAnswers[currentQuizIndex] || [];
    updatedAnswers[currentQuizIndex][currentQuestionIndex] = optionId;
    setAnswers(updatedAnswers);

    const currentQuestion = quizzes[currentQuizIndex].questions[currentQuestionIndex];
    const selectedOption = currentQuestion.options.find(option => option._id === optionId);

    if (selectedOption && selectedOption.optionText === currentQuestion.correctAnswer) {
      setCorrectAnswersCount(prev => prev + 1);
    }
  };

  
  const handleNext = () => {
    if (currentQuestionIndex < quizzes[currentQuizIndex].questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else if (currentQuizIndex < quizzes.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      handleSubmit();
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentQuizIndex > 0) {
      setCurrentQuizIndex(prev => prev - 1);
      setCurrentQuestionIndex(quizzes[currentQuizIndex - 1].questions.length - 1);
    }
  };

  const handleSubmit = async () => {
    const endTime = Date.now();
    const totalQuestions = quizzes.reduce((total, quiz) => total + quiz.questions.length, 0);
    const wrongAnswers = totalQuestions - correctAnswersCount;
    const timeSpent = Math.floor((endTime - startTime) / 1000);
    const percentage = (correctAnswersCount / totalQuestions) * 100;
    const status = percentage >= 50 ? 'pass' : 'fail';

    try {
      const result = {
        quizId: quizzes[currentQuizIndex]._id,
        studentId,
        startTime,
        endTime,
        totalQuestions,
        correctAnswers: correctAnswersCount,
        incorrectAnswers: wrongAnswers,
        duration: timeSpent,
        resultPercentage: percentage,
        status
      };

      await axios.post('http://localhost:5000/auth/users/results', result);
      navigate('/resultpage');
    } catch (error) {
      console.error('Error saving quiz results:', error);
    }
  };

  const currentQuestion = quizzes[currentQuizIndex]?.questions[currentQuestionIndex];
  const totalQuestions = quizzes.reduce((total, quiz) => total + quiz.questions.length, 0);


  const overallQuestionIndex = quizzes.slice(0, currentQuizIndex).reduce((total, quiz) => total + quiz.questions.length, 0) + currentQuestionIndex + 1;

  return (
    <>
      <div className='bg-dark p-3 text-white text-center fs-5'>
        <p>QUIZ PORTAL</p>
      </div>

      <div className="container mt-5 d-flex justify-content-center w-50">
        <div className="card p-4 shadow-lg border-0 rounded-lg quizform w-100" style={{ minHeight: '400px' }}>
          {currentQuestion && (
            <>
              <div className="card-header text-center">
                <h5 className="mb-0">Question {overallQuestionIndex}/{totalQuestions}</h5>
              </div>
              
              <div className="card-body">
                <h6 className="card-title mt-3 mx-2">{currentQuestion.questionText}</h6>
                <form>
                  <div className="row d-flex gap-1">
                    {currentQuestion.options.map((option) => (
                      <div className="col-6 mb-2" key={option._id}>
                        <div className="form-check">
                          <input
                            type="radio"
                            className="form-check-input"
                            name={`question-${currentQuestionIndex}`} 
                            value={option._id}
                            checked={answers[currentQuizIndex]?.[currentQuestionIndex] === option._id}
                            onChange={() => handleAnswerChange(option._id)}
                          />
                          <label className="form-check-label ms-2">{option.optionText}</label>
                        </div>
                      </div>
                    ))}
                  </div>
                </form>
              </div>

              <div className="card-footer d-flex justify-content-between">
                <button className='btn btn-primary mybutton px-4' onClick={handlePrev} disabled={currentQuizIndex === 0 && currentQuestionIndex === 0}>
                  Prev
                </button>
                <button className='btn btn-primary px-4' onClick={handleNext}>
                  {currentQuestionIndex === quizzes[currentQuizIndex].questions.length - 1 && currentQuizIndex === quizzes.length - 1 ? 'Submit' : 'Next'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      <div className='bg-success text-white p-2 rounded position-absolute top-0 end-0 mx-3 mt-3'>
        <h6>Time Remaining: {Math.floor(timer / 60)}:{('0' + (timer % 60)).slice(-2)}</h6>
      </div>
    </>
  );
};

export default QuestionPage;












































































































































































































































































































































































































































































































































































































































































































































































































































































































































