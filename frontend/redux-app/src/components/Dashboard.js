import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import '../App.css';
import MainNav from './MainNav';
import ChatBox from './ChatBox';

function Dashboard() {
  const token = useSelector((state) => state.auth.token);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      if (!token) return; 
      try {
        const response = await axios.get('http://localhost:5000/auth/users/dashboard', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setMessage(response.data.message);
      } catch (err) {
        console.error(err);
        setMessage('Failed to fetch data.');
      }
    };
    fetchData();
  }, [token]);

  return (
    <>
      <MainNav message={message} />
      <ChatBox/>
    </>
  );
}

export default Dashboard;



















































































































