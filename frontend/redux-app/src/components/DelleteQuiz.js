
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const DelleteQuiz = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/users/quizzes');
        setQuizzes(response.data);
      } catch (error) {
        console.error('Error fetching quizzes', error);
      }
    };
    fetchQuizzes();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this quiz?')) {
      try {
        await axios.delete(`http://localhost:5000/auth/users/quizzes/${id}`);
        alert('Quiz deleted successfully!');
        setQuizzes(quizzes.filter((quiz) => quiz._id !== id));
      } catch (error) {
        console.error('Error deleting quiz', error);
      }
    }
  };

  return (
    <div className="container quizcontainer w-75 h-auto rounded-3 topnav shadow-sm animate__animated animate__fadeIn " style={{ marginLeft: '270px', marginRight: 'auto' }}>
      {/* <h5 className="text-center mb-4 text-primary">Delete a Quiz</h5> */}
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz._id} className="mb-4 text-dark mt-4 p-3  rounded" style={{ marginBottom: '20px' }}>
            {/* <h6 className="font-weight-bold text-primary">{quiz.title}</h6> */}
            {quiz.questions.map((question, qIndex) => (
              <div key={question._id} className="mb-2">
                <h6 className="font-weight-bold text-primary">Question : {question.questionText}</h6>
                <div className="row mb-2">
                  {question.options.map((option) => (
                    <div key={option._id} className="col-12 col-md-6 mb-2">
                      <div className="option-card p-2 border rounded bg-light shadow-sm animate__animated animate__zoomIn" style={{ marginBottom: '10px' }}>
                        <h6 className="text-primary">{option.optionText}</h6>
                      </div>
                    </div>
                  ))}
                </div>
                {/* <p className='text-primary'><strong>Correct Answer:</strong> {question.correctAnswer}</p> */}
                {/* <p className='text-primary'><strong>Difficulty:</strong> {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}</p> */}
              </div>
            ))}
            <button className="btn btn-danger mb-3" onClick={() => handleDelete(quiz._id)}>Delete Quiz</button>
            <hr />
          </div>
        ))
      ) : (
        <p className="text-dark text-center">No quizzes available for delete</p>
      )}
    </div>
  );
};

export default DelleteQuiz;

























































