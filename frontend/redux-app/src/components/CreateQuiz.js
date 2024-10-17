import React, { useState } from 'react';
import axios from 'axios';
import '../App.css'

const CreateQuiz = () => {
  const [quizTitle, setQuizTitle] = useState('');
  const [question, setQuestion] = useState({
    questionText: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    difficulty: 'easy', 
  });
  
  const handleQuizTitleChange = (e) => {
    setQuizTitle(e.target.value);
  };
 
  const handleQuestionChange = (event) => {
    setQuestion({ ...question, questionText: event.target.value });
  };

  const handleOptionChange = (oIndex, event) => {
    const newOptions = [...question.options];
    newOptions[oIndex] = event.target.value;
    setQuestion({ ...question, options: newOptions });
  };

  const handleCorrectAnswerChange = (event) => {
    setQuestion({ ...question, correctAnswer: event.target.value });
  };

  const handleDifficultyChange = (event) => {
    setQuestion({ ...question, difficulty: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const quizData = {
      title: quizTitle,
      questions: [question], 
    };

    try {
      const response = await axios.post('http://localhost:5000/auth/users/create-quiz', quizData);
      alert('Quiz created successfully!');
      console.log(response.data);

      setQuizTitle('');
      setQuestion({
        questionText: '',
        options: ['', '', '', ''],
        correctAnswer: '',
        difficulty: 'easy', 
      });
    } catch (error) {
      console.error('There was an error creating the quiz!', error);
    }
  };

  return (
    <div className="container quizcontainer topnav w-75 h-100 rounded-3 shadow-sm " style={{ marginLeft: '270px' }}>
      <h1 className="text-center mb-4 text-dark">Create a New Quiz</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label text-dark ">Quiz Title:</label>
          <input
            type="text"
            className="form-control formselect"
            value={quizTitle}
            onChange={handleQuizTitleChange}
            required
            placeholder="Enter Quiz Title"
          />
        </div>

        <div className="mb-4 text-dark">
          <h5>Question</h5>
          <div className="mb-3">
            <input
              type="text"
              className="form-control formselect"
              placeholder="Enter Question"
              value={question.questionText}
              onChange={handleQuestionChange}
              required
            />
          </div>

          <div className="row mb-3">
            {question.options.map((option, oIndex) => (
              <div key={oIndex} className="col-3">
                <input
                  type="text"
                  className="form-control formselect"
                  placeholder={`Option ${oIndex + 1}`}
                  value={option}
                  onChange={(e) => handleOptionChange(oIndex, e)}
                  required
                />
              </div>
            ))}
          </div>
          
          <div className="mb-3">
            <label className="form-label ">Correct Answer:</label>
            <input
              type="text"
              className="form-control formselect"
              placeholder="Enter Correct Answer"
              value={question.correctAnswer}
              onChange={handleCorrectAnswerChange}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Difficulty Level:</label>
            <select
              className="form-select"
              value={question.difficulty}
              onChange={handleDifficultyChange}
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

export default CreateQuiz;













































































































