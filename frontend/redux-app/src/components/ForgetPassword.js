
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


function ForgetPassword() {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/auth/users/forgot-password', { email });
      alert('Password reset link sent to your email.');
      navigate('/login');
    } catch (err) {
      console.error('Error requesting password reset:', err);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100" style={{ background: 'white' }}>
      <div className="row shadow-lg rounded-3 p-5" style={{ backgroundColor: '#25797d', maxWidth: '1000px', width: '100%' }}>
        <div className="d-flex gap-4">
          <div className="col-md-6 text-white d-flex flex-column justify-content-center align-items-center box">
            <h1 className="mb-4" style={{ fontWeight: 'bold', fontSize: '36px' }}>INOVAQO</h1>
            <h5 className="text-center mb-4" style={{ fontSize: '18px' }}>WHERE PEOPLE MEET EXCELLENCE</h5>
            <p className="text-center mb-1" style={{ fontSize: '18px' }}>Unlock the power of your <span style={{ color: '#60D0C4' }}>{`{workforce}`}</span></p>
            <p className="text-center mb-4" style={{ fontSize: '18px' }}>We are here to support you</p>
            <div className="d-flex justify-content-center gap-3">
              <div style={{ width: "40px", height: "40px", display: "inline-flex", justifyContent: "center", alignItems: "center" }} className='bg-dark p-2 rounded-circle'>
                <a href="https://www.facebook.com/people/Viteace-Solutions/100083205264634/?mibextid=ZbWKwL" className="text-white fs-4 "><i className="fab fa-facebook"></i></a>
              </div>
              <div style={{ width: "40px", height: "40px", display: "inline-flex", justifyContent: "center", alignItems: "center" }} className='bg-dark p-2 rounded-circle'>
                <a href="https://www.instagram.com/viteacesolutions/" className="text-white fs-4 "><i className="fab fa-instagram"></i></a>
              </div>
              <div style={{ width: "40px", height: "40px", display: "inline-flex", justifyContent: "center", alignItems: "center" }} className='bg-dark p-2 rounded-circle'>
                <a href="https://www.linkedin.com/company/inovaqo-tech-solutions/" className="text-white fs-4 "><i className="fab fa-linkedin"></i></a>
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-5">
            <form onSubmit={handleSubmit} className="box2">
              <h5 className="text-center mb-2" style={{ color: '#fff' }}>Reset Password</h5>
              <div className='d-flex justify-content-center'>

              <div className="mb-3 w-75">
                <input
                  type="email"
                  className="form-control rounded-3 p-3"
                  value={email}
                  placeholder="Email Address"
                  onChange={(e) => setEmail(e.target.value)}
                
                />
              </div>
              </div>
            
              <div className="d-grid  d-flex justify-content-center">
                <button type="submit" className="btn btn-dark rounded-3 p-3 w-75">Reset Password</button>
              </div>
              
              <div className=' p-2 d-flex justify-content-center mt-2'>
           
                <a className=' text-decoration-none link-hover' href='/login'><FontAwesomeIcon  icon={faArrowLeft} /> Back To Login</a>
              </div>
          
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;

