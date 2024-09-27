import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../App.css';
import Sidebar from './Sidebar';  

function Dashboard() {
  const [message, setMessage] = useState('');
  const [activeTab, setActiveTab] = useState('dashboard'); 
  const token = useSelector((state) => state.auth.token);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/auth/users/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage(response.data.message);
      } catch (err) {
        console.log("waqas");
        // console.error(err);
      
      }
    };
    fetchData();
  }, [token]);

  return (
    <>
      <ul className="nav nav-pills mb-3 bg-dark text-white p-4 d-flex justify-content-center gap-3 " id="pills-tab" role="tablist">
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'dashboard' ? 'active' : ''} text-white`}
            id="pills-home-tab"
            onClick={() => setActiveTab('dashboard')} 
            type="button"
            role="tab"
            aria-controls="pills-home"
            aria-selected={activeTab === 'dashboard'}
          >
            Dashboard
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'profile' ? 'active' : ''} text-white`}
            id="pills-profile-tab"
            onClick={() => setActiveTab('profile')} 
            type="button"
            role="tab"
            aria-controls="pills-profile"
            aria-selected={activeTab === 'profile'}
          >
            Profile
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'questions' ? 'active' : ''} text-white`}
            id="pills-contact-tab"
            onClick={() => setActiveTab('questions')} 
            type="button"
            role="tab"
            aria-controls="pills-contact"
            aria-selected={activeTab === 'questions'}
          >
            Quiz Questions
          </button>
        </li>
        <li className="nav-item" role="presentation">
          <button
            className={`nav-link ${activeTab === 'contacts' ? 'active' : ''} text-white`}
            id="pills-disabled-tab"
            onClick={() => setActiveTab('contacts')} 
            type="button"
            role="tab"
            aria-controls="pills-disabled"
            aria-selected={activeTab === 'contacts'}
          >
            Details
          </button>
        </li>
      </ul>

      <div className="tab-content" id="pills-tabContent">
        <div className={`tab-pane fade ${activeTab === 'dashboard' ? 'show active' : ''}`} id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab" tabIndex="0">
          {activeTab === 'dashboard' && <Sidebar />} {/* Sidebar only for dashboard */}
        </div>
        <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
          <div className='text-dark'>{message}</div>
        </div>

        <div className={`tab-pane fade ${activeTab === 'questions' ? 'show active' : ''}`} id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0"></div>
        <div className={`tab-pane fade ${activeTab === 'contacts' ? 'show active' : ''}`} id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab" tabIndex="0"></div>
      </div>
    </>
  );
}

export default Dashboard;

























































































































































