
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Card } from 'react-bootstrap';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import '../App.css';

const MainContent = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/users/results');
        setResults(response.data);
        console.log('Results fetched:', response.data);
      } catch (error) {
        console.error('Error fetching results:', error);
      }
    };

    fetchResults();
  }, []);

  const dates = results.map(result => new Date(result.startTime).toLocaleDateString());
  const timeSpent = results.map(result => Math.min(result.timeSpent / 60, 30)); 

  return (
    <div className="main-content" style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
      <div className="text-start mt-5">
        <h5 className='text-danger'>Recommended Focus:</h5>
        <p className='text-warning'>1. <a href="/" className="link-underline-info text-info">Take a PT</a></p>
        <p className='text-warning'>2. <a href="/" className="link-underline-secondary text-secondary">Take an RC Section</a></p>
        <p className='text-warning'>3. <a href="/" className="link-underline-secondary text-secondary">Flaw</a></p>
        <p className='text-warning'>4. <a href="/" className="link-underline-secondary text-secondary">Structural</a></p>
      </div>

      <h6 className='text-danger'>Latest PTs:</h6>
      <Card className="mt-1 bg-light p-2 w-50">
        <BarChart
          xAxis={[{ scaleType: 'band', data: dates }]}
          series={[{ data: results.map(result => result.percentage) }]}
          width={380}
          height={150}
          tooltip={{ enable: true }}
        />
      </Card>

      <h6 className='text-danger mt-2'>Latest Timed Sections:</h6>
      <Card className="my-2 bg-light w-50">
        <Card.Body>
          <LineChart
            xAxis={[{ data: dates }]}
            series={[{
              data: timeSpent,
              label: 'Time Spent (minutes)',
              stroke: '#ff6347',
              strokeWidth: 2,
              point: {
                shape: 'circle',
                size: 5,
                fill: '#ff6347',
              },
            }]}
            width={380}
            height={140}
            tooltip={{ enable: true }}
            connectNulls={true}
            curve="linear" 
          />
        </Card.Body>
      </Card>
    </div>
  );
};

export default MainContent;












