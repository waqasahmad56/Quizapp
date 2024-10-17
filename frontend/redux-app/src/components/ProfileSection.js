import React from 'react';
import { useSelector } from 'react-redux';
import '../App.css'

const ProfileSection = () => {
  const profile = useSelector((state) => state.profile);

  return (
    <>
    
    <div className="profile-section d-flex align-items-center " >

<div className="profile-pic ">
  <img
    src={`http://localhost:5000/uploads/${profile.profilePic}` || '/testportal-logo.svg'}
    alt="Profile"
    className="rounded-circle mb-4 shadow"
    style={{ width: '150px', height: '150px', objectFit: 'cover', borderRadius: '50%',border:'4px solid white' }}
  /> 
    <h6 className='text-info'>{profile.firstName} {profile.lastName}</h6>

</div>

<div className="profile-info ms-4 mb-5 ">
  <p className='text-danger  text-nowrap'>Stage 2: <b className='text-secondary fw-light'>Practice (Timed)</b></p>
  <p className='text-danger profilepara '>Take a PT</p>
  <button type='submit' className="btn btn-danger btn-custom text-nowrap">Resume Training</button>
</div>
 
</div>
 
    <div className="text-start profile-info mt-2"  style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
        <p className='text-dark fw-normal'>Target Test: Undecided<b className='text-secondary fw-light'> (Unregistered)</b></p>
        <p>Target Score: <b className="text-danger">120</b></p>
        <button type='submit' className="btn btn-danger btn-custom text-nowrap w-50">Take a PT</button>
      </div>
     <div className="text-start  myinfo"  style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
     <p className='text-dark'>Latest PT Score: <span className="text-warning">124</span></p>
     <p className='text-info'><a href="/" className="link-underline-secondary text-secondary">Recent Average:</a>125.2</p>
     <p>Latest LR: <span className="text-warning">24%</span></p>
     <p className='text-info'><a href="/" className="link-underline-secondary text-secondary">Recent Average: </a>20%</p>
     <p>Latest RC: <span className="text-warning">26%</span></p>
     <p className='text-info'><a href="/" className="link-underline-secondary text-secondary">Recent Average: </a>21%</p>
   </div>
   </>
  );
};

export default ProfileSection;