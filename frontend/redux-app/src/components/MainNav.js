import React, { useState } from 'react';
import Sidebar from './Sidebar';
import RecordPage from './RecordPage';
import Notification from './Notification';


const MainNav = ({ message}) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div style={{ fontFamily: 'Tahoma Verdana sans-serif' }}>
      <ul className="nav nav-pills mb-3 bg-dark text-white p-4 d-flex justify-content-center gap-3 position-fixed z-3 w-100"
        id="pills-tab" role="tablist">
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
          {/* <li className="nav-item" role="presentation">
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
        </li> */}
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
            Notification
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
          {activeTab === 'dashboard' && <Sidebar />}
        </div>
        <div className={`tab-pane fade ${activeTab === 'profile' ? 'show active' : ''}`} id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab" tabIndex="0">
          <div className='text-dark'>{message}</div>
        </div>

        <div className={`tab-pane fade   ${activeTab === 'questions' ? 'show active' : ''}`} id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab" tabIndex="0"><Notification/></div>
        <div className={`tab-pane fade ${activeTab === 'contacts' ? 'show active' : ''}`} id="pills-disabled" role="tabpanel" aria-labelledby="pills-disabled-tab" tabIndex="0"><RecordPage/></div>
      </div>
    </div>
  );
}

export default MainNav;







