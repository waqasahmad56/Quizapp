import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
// import './CreateQuizz.css'; 

const CreateQuizz = () => {
  const [title, setTitle] = useState('');
  const [questionParagraph, setQuestionParagraph] = useState('');
  const [options, setOptions] = useState(['', '', '', '']);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [difficulty, setDifficulty] = useState('easy');

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const quizData = {
      title,
      questions: [{
        questionParagraph,
        options: options.map(option => ({ optionText: option })), 
        correctAnswer,
        difficulty,
      }],
    };

    try {
      const response = await axios.post('http://localhost:5000/auth/users/quizques', quizData, {
        headers: { 'Content-Type': 'application/json' },
      });

      alert('Quiz created successfully!');
      
      setTitle('');
      setQuestionParagraph('');
      setOptions(['', '', '', '']);
      setCorrectAnswer('');
      setDifficulty('easy');
    } catch (error) {
      const errorMessage = error.response?.data?.error || 'Error creating quiz';
      alert(errorMessage);
    }
  };

  return (
    <div className="container quizcontainer topnav w-75 h-100 rounded-3 shadow-sm" style={{ marginLeft: '270px' }}>
      <h1 className="text-center mb-4 text-dark">Create a New Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-dark">Quiz Title:</label>
          <input
            type="text"
            className="form-control formselect"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Enter Quiz Title"
          />
        </div>

        <div className="mb-4 text-dark">
          <h6>Question</h6>
          <div className="mb-3">
            <input
              type="text"
              className="form-control formselect"
              placeholder="Enter Question"
              value={questionParagraph}
              onChange={(e) => setQuestionParagraph(e.target.value)}
              required
            />
          </div>

          <div className="row mb-3">
            {options.map((option, oIndex) => (
              <div key={oIndex} className="col-3">
                <input
                  type="text"
                  className="form-control formselect"
                  placeholder={`Option ${oIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(oIndex, e.target.value)}
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
              value={correctAnswer}
              onChange={(e) => setCorrectAnswer(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Difficulty Level:</label>
            <select
              className="form-select"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
              required
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
          </div>
        </div>

        <button type="submit" className="btn btn-success mb-3">
          Create Quiz
        </button>
      </form>
    </div>
  );
};

export default CreateQuizz;










