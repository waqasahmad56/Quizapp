import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateQuiz from './UpdateQuiz';

const QuizList = () => {
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

  
  const handleUpdateQuiz = async (id, updatedQuiz) => {
    try {
      await axios.put(`http://localhost:5000/auth/users/quizzes/${id}`, updatedQuiz);
      alert('Quiz updated successfully!');
    } catch (error) {
      console.error('Error updating quiz', error);
    }
  };

  return (
    <div className='quizcontainer'>
      {quizzes.map((quiz) => (
        <div key={quiz._id}>
          <UpdateQuiz quiz={quiz} onUpdate={handleUpdateQuiz} />
        </div>
      ))}
    </div>
  );
};

export default QuizList;
































































































