import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Notification = () => {
  const [message, setMessage] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const handleSendNotification = async () => {
    try {
      const response = await axios.post('http://localhost:5000/send', { message });
      setResponseMessage(response.data.message);
      setMessage(''); 
    } catch (error) {
      console.error('Error sending notification:', error);
      setResponseMessage('Failed to send notification');
    }
  };

  return (
    <div className='position-relative notify d-flex flex-column gap-4 text-center w-25'>
      <h2>Send Notification</h2>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Enter your message"
      />
      <button onClick={handleSendNotification}>Send Notification</button>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
};

export default Notification;
















