import React, { useEffect, useState } from 'react';
import axios from 'axios';
import QuizData from './QuizData'; 

const QuizListData = () => {
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

  return (
    <div className='quizcontainer'>
      {quizzes.map((quiz) => (
        <div key={quiz._id}>
        
          <QuizData quiz={quiz} />
        </div>
      ))}
    </div>
  );
};

export default QuizListData;
