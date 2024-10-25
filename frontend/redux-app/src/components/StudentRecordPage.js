import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';
import RecordNav from './RecordNav';
import { useNavigate } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const StudentRecordPage = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  const studentName = localStorage.getItem('studentName');
  console.log("Student Name Retrieved:", studentName);  

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/users/results');
        setResults(response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchResults();
  }, []);
  
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  if (loading) {
    return <div className="text-center"><p>Loading results...</p></div>;
  }

  return (
    <>
      <RecordNav />
      <div className="container w-100 my-5" style={{ fontFamily: 'Tahoma, Verdana, sans-serif' }}>
        <h2 className="text-center mb-1  border bg-primary text-white p-3 shadow">Student Results</h2>
        <div className="table-responsive">
          <table className="table table-bordered table-hover table-striped text-center shadow">
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
              {results.length > 0 ? (
                results.map((result, index) => (
                  <tr key={result._id} style={{ cursor: 'pointer' }}  >
                    <td>{index + 1}</td>
                    <td>{studentName || "Name Not Available"}</td>
                    <td>{result.totalQuestions}</td>
                    <td>{result.correctAnswers}</td>
                    <td>{result.incorrectAnswers}</td>
                    <td>{result.percentage}%</td>
                    <td>{formatTime(result.timeSpent)}</td>
                    <td>
                      {result.status === 'pass' ? (
                        <span className="badge bg-success">✔ Pass</span>
                      ) : (
                        <span className="badge bg-danger">✘ Fail</span>
                      )}
                    </td>
                    <td>{new Date(result.startTime).toLocaleString()}</td>
                    <td>{new Date(result.endTime).toLocaleString()}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="10" className="text-center">No Results Available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default StudentRecordPage;


