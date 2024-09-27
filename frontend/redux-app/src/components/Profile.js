import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile } from '../features/profileSlice';
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar'; 
import '../App.css';

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const status = useSelector((state) => state.profile.status);
  const [firstName, setFirstName] = useState(profile.firstName || '');
  const [lastName, setLastName] = useState(profile.lastName || '');
  const [email, setEmail] = useState(profile.email || '');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate(); 

  useEffect(() => {
    if (status === 'succeeded') {
      navigate('/test'); 
    }
  }, [status, navigate]); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newProfile = {
      firstName,
      lastName,
      email,
      password,
      profilePic,
    };

    await dispatch(createProfile(newProfile));
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfilePic(file);
    }
  };

  return (
    <>
      <Navbar />
      <div className='d-flex'>
        <div className="container mt-5 bg-light rounded w-50 shadow">
          <h2 className='text-center'>Profile Management</h2>
          {status === 'loading' && <p>Creating profile...</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">First Name</label>
              <input
                type="text"
                className="form-control"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Last Name</label>
              <input
                type="text"
                className="form-control"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Profile Picture</label>
              <input
                type="file"
                className="form-control"
                onChange={handleProfilePicChange}
              />
            </div>
            <div className='text-center mb-3'>
              <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                Create Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Profile;




















































