import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'; 

const TestForm = () => {
  const navigate = useNavigate();

  const startTest = () => {
    navigate('/questions'); 
  };
  const startTestAnalitical = () => {
    navigate('/analyticalquestion'); 
  };

  return (
    <>
      <div>
        
        <div className='border topnav text-dark p-3 text-center  shadow-sm d-flex'  style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
        <div className="">
        <img src="/testportal-logo.svg" alt="Logo" className="logo" />
        
      </div>
           
          <button className="btn  position-absolute start-0 mx-3 d-flex" onClick={() => navigate('/homepage')}>
            {/* <FontAwesomeIcon icon={faBackward} />  */}
            <FontAwesomeIcon icon={faAngleLeft} />
            
          </button>
          <div className='custom-testportal'>
          Test Portal
          </div>
        </div>
      </div>

      <div className='container mt-2 w-75'>
        <div className='content p-4 bg-primary text-white rounded shadow text-center'  style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
          <h2>Welcome to Our Test Portal</h2>
        </div>

        <div className='d-flex justify-content-between mt-2'  style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
          <div className='content p-5 bg-light rounded shadow w-50 me-2'>
            <h5 className='text-primary'>SIMPLE REASONING INSTRUCTIONS</h5>
            <p>The Test consists of many quizzes. Each <b>Question</b> has four options. Select only one <b>Correct Option</b>.</p>
            <p>When the quiz starts, the timer will also start, so you can manage your time <b>Effectively</b>.</p>
            <p><b>Make Sure</b> you have enough time to attempt the <b>Quiz</b>.</p>
            <p>Once the test starts, you cannot stop the quiz.</p>
            
            <div className='text-center mt-4'>
            <button className='btn btn-primary' onClick={startTest}>Start Simple Test</button>
           </div>


          </div>

          <div className='content p-5 bg-light rounded shadow w-50 ms-2'>
            <h5 className='text-primary'>ANALYTICAL REASONING INSTRUCTIONS</h5>
            <p>
              The analytical reasoning quiz consists of multiple quizzes. you should select only one correct answer. Careful consideration is crucial, as your choice will determine your overall score.
            </p>
            <p>
              Make sure you are adequately prepared and have enough time set aside to complete the quiz without interruptions. Once you start the test, please note that it cannot be paused or stopped. This means you should be fully focused and ready to engage with the questioN. Good luck!
            </p>

            <div className='text-center mt-3'>
            <button className='btn btn-primary' onClick={startTestAnalitical}>Start Analytical Test</button>
            </div>



          </div>
        </div>

       
      </div>
    </>
  );
};

export default TestForm;



































































































































































































