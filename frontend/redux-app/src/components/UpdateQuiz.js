import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


const UpdateQuiz = ({ quiz, onUpdate }) => {
  const [updatedQuiz, setUpdatedQuiz] = useState(quiz);
  const [isEditing, setIsEditing] = useState(false);


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
    setIsEditing(true);
  };

  return (
    <div className="container-fluid">
     
      <div className="container mt-1 w-75 myquiz bg-light ">
     
        {!isEditing && quiz.questions.map((question, qIndex) => (
          <div key={question._id} className="quiz-card mb-4 p-3 border rounded shadow">
            <p className="font-weight-bold fs-5">Question: {question.questionText}</p>
            <div className="d-flex flex-wrap gap-3">
              {question.options.map((option, optIndex) => (
                <button key={optIndex} className="btn btn-outline-secondary me-4">
                  {option.optionText}
                </button>
              ))}
            </div>

            {!isEditing && (
          <div className="mt-4">
            <button className="btn btn-primary mb-2" onClick={toggleEditMode}>
              Update Quiz
            </button>
          </div>
        )}

          </div>
        ))}

        {isEditing && (
          <form onSubmit={handleSubmit} className="mt-4">
            <div className="quiz-card mb-4 p-3 border rounded shadow">
              <div className="mb-3">
                <label className="form-label text-dark">Quiz Title:</label>
                <input
                  type="text"
                  className="form-control"
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
                      className="form-control"
                      placeholder="Enter Question"
                      value={question.questionText}
                      onChange={(e) => handleQuestionChange(qIndex, e)}
                      required
                    />
                  </div>

                  <div className="row mb-3">
                    {question.options.map((option, optIndex) => (
                      <div key={optIndex} className="col-3">
                        <input
                          type="text"
                          className="form-control"
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
                      className="form-control"
                      placeholder="Enter Correct Answer"
                      value={question.correctAnswer}
                      onChange={(e) => handleCorrectAnswerChange(qIndex, e)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Difficulty:</label>
                    <select
                      className="form-control"
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

            <div className="text-center">
              <button type="submit" className="btn btn-primary mb-3">Update Changes</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateQuiz;









































































































































































