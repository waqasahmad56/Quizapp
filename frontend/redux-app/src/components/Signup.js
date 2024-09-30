import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../features/auth/authAPI';
import '../App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";

function Signup() {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('student'); 
  const [secretKey, setSecretKey] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const signupData = {
        firstname,
        lastname,
        email,
        password,
        role,
        secretKey: role === 'admin' ? secretKey : undefined, 
      };
      await signup(signupData);
      navigate('/login');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100" style={{ background: 'white' }}>
      <div className="row shadow-lg rounded-3 p-5" style={{ backgroundColor: '#25797d', maxWidth: '1000px', width: '100%' }}>
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
        <div className="col-md-6">
          <form onSubmit={handleSubmit} className="p-4">
            <h5 className="text-center mb-2" style={{ color: '#fff' }}>SIGN UP</h5>
            <div className="mb-3">
              <input type="text" className="form-control rounded-3 p-3" value={firstname} placeholder="First Name" onChange={(e) => setFirstname(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="text" className="form-control rounded-3 p-3" value={lastname} placeholder="Last Name" onChange={(e) => setLastname(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="email" className="form-control rounded-3 p-3" value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="mb-3">
              <input type="password" className="form-control rounded-3 p-3" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-check-label text-white me-4 mx-4">
                <input type="radio" className="form-check-input  me-3" value="student" checked={role === 'student'} onChange={() => setRole('student')} />
                      Student
              </label>
              <label className="form-check-label text-white">
                <input type="radio" className="form-check-input " value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} />
                Admin
              </label>
            </div>

            {role === 'admin' && (
              <div className="mb-3">
                <input type="text" className="form-control rounded-3 p-3" value={secretKey} placeholder="Secret Key" onChange={(e) => setSecretKey(e.target.value)} />
              </div>
            )}

            <div className="d-grid">
              <button type="submit" className="btn btn-dark rounded-3 p-2">Signup</button>
            </div>
            <div className='text-white p-2'>
              <p>If you already have an account? <a className='btn btn-primary' href='/login'>Login</a></p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Signup;



































































































































































































































































































































































































































































































































































































































































































































































