
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';


const ResultPage = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/auth/users/resultss')
      .then((response) => {
        setResults(response.data);
        console.log('Results fetched:', response.data);  
      })
      .catch((error) => {
        console.error('Error fetching results:', error);
      });
  }, []);

  return (
    <>
      <div className="container d-flex justify-content-center  mytable">
        <div className="">
          <h2 className="text-center mb-1 border bg-primary text-white p-4 shadow">Simple Quiz Results Table</h2>
          <table className="table table-bordered table-hover table-striped text-center shadow ">      
            <thead className="table-primary">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Total Questions</th>
                <th>Correct Answers</th>
                <th>Incorrect Answers</th>
                <th>Result Percentage</th>
                <th>Total Time</th>
                <th>Status</th> 
                <th>Start Time</th>
                <th>End Time</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={result._id}>
                  <td>{index + 1}</td>
                  
                  <td>{result.studentId?.firstName} {result.studentId?.lastName}</td>
                  <td>{result.totalQuestions}</td>
                  <td>{result.correctAnswers}</td>
                  <td>{result.incorrectAnswers}</td>
                  <td>{result.resultPercentage}%</td>
                  <td>{formatTime(result.duration)}</td>
                  <td>
                    {result.status === 'pass' ? (
                      <span className="badge bg-success">✔ Pass </span>
                    ) : (
                      <span className="badge bg-danger">✘ Fail </span>
                    )}
                  </td>
                  <td>{new Date(result.startTime).toLocaleString()}</td>
                  <td>{new Date(result.endTime).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};


const formatTime = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs.toString().padStart(2, '0')}`;
};

export default ResultPage;




































































































