import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authAPI';
import { login as loginAction } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await login(email, password);
      
      dispatch(loginAction({ token: data.token, role: data.role }));

      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);
      localStorage.setItem('email', email); 
      
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Invalid crediants');
    }
  };
  
  return (
    <div className="container-fluid d-flex justify-content-center align-items-center min-vh-100 image" style={{ background: ' ' }}>
      <div className="row shadow-lg rounded-3 p-5" style={{ backgroundColor: '#25797d', maxWidth: '1000px', width: '100%' }}>
        <div className='d-flex gap-4'>
          <div className="col-md-6 text-white d-flex flex-column justify-content-center align-items-center box">
            <h1 className="mb-4" style={{ fontWeight: 'bold', fontSize: '36px' }}>INOVAQO</h1>
            <h5 className="text-center mb-4" style={{ fontSize: '18px' }}>WHERE PEOPLE MEET EXCELLENCE</h5>
            <p className="text-center mb-1" style={{ fontSize: '18px' }}>Unlock the power of your <span style={{ color: '#60D0C4' }}>{`{workforce}`}</span></p>
            <p className="text-center mb-4" style={{ fontSize: '18px' }}>We are here to support you</p>
            <div className="d-flex justify-content-center gap-3">
              
            </div>
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit} className="box2">
              <h5 className="text-center mb-2" style={{ color: '#fff' }}>Login Form</h5>
              <div className="mb-3">
                <input type="email" className="form-control rounded-3 p-3" value={email} placeholder="Email Address" onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="mb-3">
                <input type="password" className="form-control rounded-3 p-3" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="d-flex justify-content-start mb-3">
                <a href="/forgot-password" className="text-decoration-none link-hover">Forgot password?</a>
              </div>
              <div className="d-grid">
                <button type="submit" className="btn btn-dark rounded-3 p-2">Login</button>
              </div>
              <div className='text-white p-2 d-flex justify-content-center mt-2'>
                <a className='btn btn-primary' href='/signup'>Create An Account</a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;





















































































































