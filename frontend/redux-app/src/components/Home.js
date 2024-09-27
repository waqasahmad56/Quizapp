import React from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { LineChart } from '@mui/x-charts/LineChart';
import { BarChart } from '@mui/x-charts/BarChart';
import '../App.css';
import Navbar from './Navbar'; 


const Home = () => {
  
  const profile = useSelector((state) => state.profile);

  return (
    <>
    <Navbar/>
    <div className='bg-light




'>
    <div className='mx-4 my-2 '>
    <h6>Student Profile</h6>
    </div>
    <Container className='charts' style={{ position: 'relative', minHeight: '400px' }}>
    

    
      <div
        style={{
          position: 'fixed',
          top: '100px',
          left: '30px',
          textAlign: 'center',
          zIndex: 1000, 
        }}
      >
        <img
          src={`http://localhost:5000/uploads/${profile.profilePic}` || 'defaultProfile.jpg'} 
          alt="Student Profile"
          className="rounded-circle"
          style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%', 
            objectFit: 'cover', 
          }}
        />
        <h6 style={{ marginTop: '10px', color: '#000' }}>{profile.firstName} {profile.lastName}</h6>
      </div>
      
      <Row>
        <Col md={6}>
          <Card className="my-5 bg-secondary-subtle
">
            <Card.Body>
              <h5>Line Chart</h5>
              <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[{ data: [2, 5.5, 2, 8.5, 1.5, 5] }]}
                width={500}
                height={300}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="my-5 bg-secondary-subtle
">
            <Card.Body>
              <h5>Bar Chart</h5>
              <BarChart
                xAxis={[{ scaleType: 'band', data: ['group A', 'group B', 'group C'] }]}
                series={[{ data: [4, 3, 5] }, { data: [1, 6, 3] }, { data: [2, 5, 6] }]}
                width={500}
                height={300}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </div>
    </>
  );
};

export default Home;

















