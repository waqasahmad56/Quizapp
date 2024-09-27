import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchQuizzes, selectAllQuizzes, selectQuizzesStatus } from '../features/questionsSlice';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'; 

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
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg" style={{ backgroundColor: 'black', height: '70px' }}>
                <div className="container myicon ">
                    <button className="btn btn-light " onClick={() => navigate('/homepage')}>
                        <FontAwesomeIcon icon={faArrowLeft} /> 
                    </button>
                    <div className="d-flex justify-content-center w-100">
                        <a className="navbar-brand text-white mx-5" href="#">Quizzes</a>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <div className="d-flex ms-auto">
                            <input
                                type="text"
                                className="form-control me-4"
                                placeholder="Search by title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                style={{ width: '250px' }}
                            />
                            <input
                                type="text"
                                className="form-control me-4"
                                placeholder="Search by difficulty"
                                value={difficulty}
                                onChange={(e) => setDifficulty(e.target.value)}
                                style={{ width: '250px' }}
                            />
                            <button className="btn btn-success" onClick={handleFetch} style={{ width: '150px' }}>Fetch Quizzes</button>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="text-center mb-4">
                <h2>Available Quizzes</h2>
            </div>
            
            <div>
                {quizzes.length > 0 ? (
                    quizzes.map((quiz) => (
                        <div key={quiz._id} className="quiz-card mb-4 p-3 border rounded shadow">
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














































































