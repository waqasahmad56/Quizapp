import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const QuizData = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [questionsPerPage] = useState(2);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchQuizzes = async () => {
    try {
      const [quizquesResponse, quizzesResponse] = await Promise.all([
        axios.get('http://localhost:5000/auth/users/quizques'),
        axios.get('http://localhost:5000/auth/users/quizzes')
      ]);

      setQuizzes([...quizquesResponse.data, ...quizzesResponse.data]);
    } catch (error) {
      console.error('Error fetching quizzes', error);
      setError('Failed to load quizzes');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const totalQuestions = quizzes.reduce((total, quiz) => total + quiz.questions.length, 0);
  const totalPages = Math.ceil(totalQuestions / questionsPerPage);

  const startIndex = (currentPage - 1) * questionsPerPage;
  const endIndex = startIndex + questionsPerPage;

  const allQuestions = quizzes.flatMap(quiz => quiz.questions).slice(startIndex, endIndex);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <div className="text-center">Loading quiz data...</div>;
  if (error) return <div className="text-center text-danger">{error}</div>;

  return (
    <>
    
      <div className="container content-container mt-5 w-75  h-auto animate__animated animate__fadeIn" 
        style={{ marginLeft: '189px', marginRight: 'auto',fontFamily: 'Tahoma Verdana sans-serif' }}>
        
        <div className="questions-container mb-2">
          {allQuestions.map((question, qIndex) => (
            <div key={question._id} className=" text-dark  rounded">
              <p style={{ textDecoration:'underline' }}>Question Statement:</p>
              <p className="text-dark  " > {question.questionText || question.questionParagraph}</p>
              <div className="row mb-1">
                {question.options.map((option, optIndex) => (
                  <div key={optIndex} className="col-12 col-md-6 mb-2">
                    <div className="option-card p-2 border rounded shadow-sm animate__animated animate__zoomIn">
                      <p className="text-dark">{option.optionText}</p>
                    </div>
                  </div>
                ))}

              </div>

            </div>
          ))}
        </div>

        

        
        <div className="pagination2 d-flex justify-content-between mt-2 ">
          <div>
            <button
              className="pagination-button mx-1"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
                &laquo; Prev
            </button>

          
            {[...Array(totalPages)].map((_, pageIndex) => (
              <button
                key={pageIndex}
                className={`pagination-button mx-1 ${currentPage === pageIndex + 1 ? 'active' : ''}`}
                onClick={() => handlePageChange(pageIndex + 1)}
              >
                {pageIndex + 1}
              </button>
            ))}

            <button
              className="pagination-button mx-1"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next  &raquo;
            </button>
          </div>
        </div>

      </div>
    </>
  );
};

export default QuizData;









