import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../App.css';


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
    <div className="container mt-4 bg-light w-75  rounded-3 shadow-lg " style={{ marginLeft: '300px',minheight:"700px" }}>
      <h1 className="text-center mb-5 text-dark">Delete a Quiz</h1>
      {quizzes.length > 0 ? (
        quizzes.map((quiz) => (
          <div key={quiz._id} className="mb-4 text-dark">
            <h4>{quiz.title}</h4>
            {quiz.questions.map((question, qIndex) => (
              <div key={question._id} className="mb-4">
                <h6>Question {qIndex + 1}: {question.questionText}</h6>
                
              
                <div className="row mb-2">
                  {question.options.map((option, oIndex) => (
                    <div key={option._id} className="col-3">
                      <input
                        type="text"
                        className="form-control"
                        value={option.optionText}
                        readOnly
                      />
                    </div>
                  ))}
                </div>

                <p><strong>Correct Answer:</strong> {question.correctAnswer}</p>
                
                <p><strong>Difficulty:</strong> {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}</p>

              </div>
              
            ))}
            <button className="btn btn-danger" onClick={() => handleDelete(quiz._id)}>Delete Quiz</button>
            <hr />
          </div>
        ))
      ) : (
        <p className="text-dark">No quizzes available for delete</p>
      )}
    </div>
  );
};

export default DelleteQuiz;

















































