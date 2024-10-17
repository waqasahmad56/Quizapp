import React from 'react';
import HomeNav from './HomeNav'
import { useNavigate } from 'react-router-dom';
import './TestsButton.css'; 

const TestsButton = () => {
    const navigate=useNavigate();
  const handleClick = () => {
    navigate('/questions')
    
  };

  return (
    <>
    <HomeNav/>
    <div className="mybutton-container d-flex gap-3">
    <p className='bg-info-subtle  random-content shadow-sm'>The Test consists of many quizzes. Each <b>Question</b> has four options.<br></br> Select only one <b>Correct Option</b>.<br></br>
       When the quiz starts, the timer will also start,<br></br> so you can manage your time <b>Effectively</b>.<br></br>
     <b>Make Sure</b> you have enough time to attempt the <b>Quiz</b>.
     <br></br>Once the test starts, you cannot stop the quiz.</p><br></br>
      <button className="mycircle-button shadow-sm" onClick={handleClick}>
        Start Test
      </button>
    </div>
    </>

  );
};

export default TestsButton;
