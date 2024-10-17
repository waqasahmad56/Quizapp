import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProfile, resetProfile } from '../features/profileSlice'; 
import { useNavigate } from 'react-router-dom'; 
import Navbar from './Navbar'; 
import '../App.css';

const Profile = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile);
  const status = useSelector((state) => state.profile.status);
  const navigate = useNavigate(); 

  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profilePic, setProfilePic] = useState(null);

  
  useEffect(() => {
    if (profile.firstName || profile.lastName || profile.email) {
      setFirstName('');
      setLastName('');
      setEmail('');
    } else {
    
      dispatch(resetProfile());
    }
  }, [profile, dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(); 
    formData.append('firstName', firstName);
    formData.append('lastName', lastName);
    formData.append('email', email);
    formData.append('password', password);
    if (profilePic) {
      formData.append('profilePic', profilePic);
    }

    await dispatch(createProfile(formData));
    
    
    setFirstName('');
    setLastName('');
    setEmail('');
    setPassword('');
    setProfilePic(null);
    navigate('/homepage')
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
      <div className='d-flex '  style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
        <div className="container topnav mt-5  rounded w-50 shadow-sm">
          <h2 className='text-center'>Profile Management</h2>
          {status === 'loading' && <p>Creating profile...</p>}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              {/* <label className="form-label">First Name</label> */}
              <input
                type="text"
                className="form-control formselect"
                value={firstName}
                placeholder='Enter First Name'
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              {/* <label className="form-label">Last Name</label> */}
              <input
                type="text"
                className="form-control formselect"
                value={lastName}
                placeholder='Enter Last Name'

                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              {/* <label className="form-label">Email</label> */}
              <input
                type="email"
                className="form-control formselect "
                value={email}
                placeholder='Enter Email'

                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              {/* <label className="form-label">Password</label> */}
              <input
                type="password"
                className="form-control formselect"
                value={password}
                placeholder='Enter Password'

                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              {/* <label className="form-label">Profile Picture</label>  */}
              <input
                type="file"
                className="form-control formselect"
                onChange={handleProfilePicChange}
              />
            </div>
            <div className='text-center mb-3'>
              <button type="submit" className="btn btn-primary" disabled={status === 'loading'}>
                Create Profile
              </button>
            </div>
          </form>

          {/* Check if the profile exists and show a message if not */}
          {!profile.firstName && !profile.lastName && !profile.email && (
            <p className="text-danger text-center">Your profile does not exist. Please create a new profile.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;



















