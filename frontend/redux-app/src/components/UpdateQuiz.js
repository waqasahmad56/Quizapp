import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';

const UpdateQuiz = ({ quiz, onUpdate }) => {
  const [updatedQuiz, setUpdatedQuiz] = useState(quiz);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setUpdatedQuiz(quiz);
  }, [quiz]);

  const handleTitleChange = (event) => {
    setUpdatedQuiz({ ...updatedQuiz, title: event.target.value });
  };

  const handleQuestionChange = (index, event) => {
    const updatedQuestions = [...updatedQuiz.questions];
    updatedQuestions[index].questionText = event.target.value;
    setUpdatedQuiz({ ...updatedQuiz, questions: updatedQuestions });
  };

  const handleOptionChange = (qIndex, optIndex, event) => {
    const updatedQuestions = [...updatedQuiz.questions];
    updatedQuestions[qIndex].options[optIndex].optionText = event.target.value;
    setUpdatedQuiz({ ...updatedQuiz, questions: updatedQuestions });
  };

  const handleCorrectAnswerChange = (qIndex, event) => {
    const updatedQuestions = [...updatedQuiz.questions];
    updatedQuestions[qIndex].correctAnswer = event.target.value;
    setUpdatedQuiz({ ...updatedQuiz, questions: updatedQuestions });
  };
 
  const handleDifficultyChange = (qIndex, event) => {
    const updatedQuestions = [...updatedQuiz.questions];
    updatedQuestions[qIndex].difficulty = event.target.value;
    setUpdatedQuiz({ ...updatedQuiz, questions: updatedQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate(quiz._id, updatedQuiz);
    setIsEditing(false);
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div className="container-fluid mycontainer">
      <div className="container mt-1 w-75 myquiz ">
        {!isEditing ? (
          <>
            {quiz.questions.map((question, qIndex) => (
              <div key={question._id} className="quiz-card mb-3 p-2 border rounded shadow-sm topnav">
                <p className="font-weight-bold fs-5">Question: {question.questionText}</p>
                <div className="d-flex flex-wrap gap-2">
                  {question.options.map((option, optIndex) => (
                    <button key={option._id} className="btn btn-outline-secondary me-2">
                      {option.optionText}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <button className="btn btn-primary mb-2" onClick={toggleEditMode}>
                    Update Quiz
                  </button>
                </div>
              </div>
            ))}
          </>
        ) : (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="quiz-card mb-4 p-3 border rounded shadow-sm topnav">
              <div className="mb-3">
                <label className="form-label text-dark">Quiz Title:</label>
                <input
                  type="text"
                  className="form-control formselect"
                  value={updatedQuiz.title}
                  onChange={handleTitleChange}
                  required
                  placeholder="Enter Quiz Title"
                />
              </div>
              {updatedQuiz.questions.map((question, qIndex) => (
                <div key={question._id} className="mb-4">
                  <h5>Question {qIndex + 1}</h5>
                  <div className="mb-3">
                    <input
                      type="text"
                      className="form-control formselect"
                      placeholder="Enter Question"
                      value={question.questionText}
                      onChange={(e) => handleQuestionChange(qIndex, e)}
                      required
                    />
                  </div>
                  <div className="row mb-3">
                    {question.options.map((option, optIndex) => (
                      <div key={option._id} className="col-3">
                        <input
                          type="text"
                          className="form-control formselect"
                          placeholder={`Option ${optIndex + 1}`}
                          value={option.optionText}
                          onChange={(e) => handleOptionChange(qIndex, optIndex, e)}
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Correct Answer:</label>
                    <input
                      type="text"
                      className="form-control formselect"
                      placeholder="Enter Correct Answer"
                      value={question.correctAnswer}
                      onChange={(e) => handleCorrectAnswerChange(qIndex, e)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Difficulty:</label>
                    <select
                      className="form-control formselect"
                      value={question.difficulty}
                      onChange={(e) => handleDifficultyChange(qIndex, e)}
                      required
                    >
                      <option value="easy">Easy</option>
                      <option value="medium">Medium</option>
                      <option value="hard">Hard</option>
                    </select>
                  </div>
                </div>
              ))}
            </div>
            <div className=" d-flex gap-2 text-center ">
              <button type="submit" className="btn btn-primary ">Update Changes</button>
              <button type="button" className="btn btn-secondary" onClick={toggleEditMode}>Cancel</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateQuiz;
























































