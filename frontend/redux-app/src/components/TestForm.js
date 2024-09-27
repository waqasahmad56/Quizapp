import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; 

const TestForm = () => {
  const navigate = useNavigate();

  const startTest = () => {
    navigate('/questions'); 
  };

  return (
    <>
      <div>
        <div className='border bg-dark text-white p-4 text-center fs-5'>
          <button className="btn btn-light position-absolute start-0 mx-3 d-flex" onClick={() => navigate('/homepage')}>
            <FontAwesomeIcon icon={faArrowLeft} /> 
          </button>
          Test Portal
        </div>
      </div>

      <div className='container mt-2 w-100'>
        <div className='content p-4 bg-primary text-white rounded shadow text-center'>
          <h2>Welcome to Our Test Portal</h2>
        </div>

        <div className='content p-4 bg-light rounded shadow mt-2 text-center'>
          <h4 className='text-primary'>INSTRUCTIONS</h4>
          <p>The Test consists of many quizzes. Each <b>Question</b> has four options. Select only one <b>Correct Option</b>.</p>
          <p>When the quiz starts, the timer will also start, so you can manage your time <b>Effectively</b>.</p>
          <p><b>Make Sure</b> you have enough time to attempt the <b>Quiz</b>.</p>
          <p>Once the test starts, you cannot stop the quiz.</p>

          <h4 className='text-primary'>Tips for Success:</h4>
          <ul className='text-left'>
            <p>Read each question carefully before selecting your answer.<br></br>
              If you're unsure about an answer, it might help to move on and come back later.<br></br>
              Keep an eye on the timer to ensure you complete all questions.
              Stay calm and focused throughout the test.</p>
          </ul>
          
          <p>Remember, this test is an opportunity to assess your knowledge, so do your best!</p>
          <button className='btn btn-primary' onClick={startTest}>Start Test</button>
        </div>
      </div>
    </>
  );
};

export default TestForm;

















