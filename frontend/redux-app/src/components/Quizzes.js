import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizzes, selectAllQuizzes, selectQuizzesStatus } from '../features/questionsSlice';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft } from '@fortawesome/free-solid-svg-icons'; 

const Quizzes = () => {
    const dispatch = useDispatch();
    const quizzes = useSelector(selectAllQuizzes);
    const quizzesStatus = useSelector(selectQuizzesStatus);
    const [title, setTitle] = useState('');
    const [difficulty, setDifficulty] = useState('');
    const navigate = useNavigate();

    const handleFetch = () => {
        dispatch(fetchQuizzes({ title, difficulty }));
    };

    useEffect(() => {
        handleFetch(); 
    }, []);

    if (quizzesStatus === 'loading') {
        return <div className="text-center"><h2>Loading...</h2></div>;
    }

    return (
        <div className="container-fluid " style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
            <nav className="navbar navbar-expand-lg shadow-sm  z-3 w-100" style={{backgroundColor: '#ddd', height: '70px' }}>
                <div className="container myicon">
                    <button className="btn " onClick={() => navigate('/homepage')}>
                        {/* <FontAwesomeIcon icon={faBackward} />  */}
                        <FontAwesomeIcon icon={faAngleLeft} />

                    </button>
                     <div className="custom-quiz"> 
                   <img src="/testportal-logo.svg" alt="Logo" className="logo" />
        
                   </div> 
                    <div className="d-flex justify-content-center w-100">
                        <p className="navbar-brand text-dark  mt-3" >Quizzes</p>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="d-flex ms-auto">
                            <select
                                className="form-select me-4"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ width: '250px', border: 'none' }} 
                            >
                                <option value="">Select Title</option>
                                <option value="Math">Math</option>
                                <option value="Physics">Physics</option>
                                <option value="Chemistry">Chemistry</option>
                                <option value="Biology">Biology</option>
                                <option value="General Knowledge">General Knowledge</option>
                            </select>
                            <select
                                className="form-select me-4"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                style={{ width: '250px', border: 'none' }} 
                            >
                                <option value="">Select Difficulty</option>
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="hard">Hard</option>
                            </select>
                            <button className="btn btn-success btn-sm" onClick={handleFetch} style={{ width: '100px' }}>Fetch Quizzes</button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="text-center mb-2">
                {/* <h2>Available Quizzes</h2> */}
            </div>
            
            <div>
                {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <div key={quiz._id} className="quiz-card mb-2 p-3 border rounded shadow-sm topnav  ">
                            <h3 className="mb-3">{quiz.title}</h3>
                            {quiz.questions.map((question) => (
                                <div key={question._id} className="mb-3">
                                    <p className="font-weight-bold">Question</p>
                                    <p>{question.questionText}</p>
                                    <div className="d-flex flex-wrap gap-4">
                                        {question.options.map((option) => (
                                            <button key={option._id} className="btn btn-outline-secondary me-4 mb-1">
                                                {option.optionText || option.text || option}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ))
                ) : (
                    <div className="text-center"><h4>No quizzes found.</h4></div>
                )}
            </div>
        </div>
    );
};

export default Quizzes;








