import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import '../App.css';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [notificationCount, setNotificationCount] = useState(0);

  useEffect(() => {
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://localhost:5000/notifications');
        setNotifications(response.data);
        setNotificationCount(response.data.length); 
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchNotifications();
  }, []);

  const handleModalOpen = (event) => {
    event.preventDefault(); 
    setShowModal(true);
    setNotificationCount(0); 
  };

  const handleModalClose = () => setShowModal(false);

  return (
    <div>
      <Link to="/notifyalert" className="fs-3" onClick={handleModalOpen}>
        <FontAwesomeIcon icon={faBell} />
        {notificationCount > 0 && (
          <span className="notification-badge">{notificationCount}</span>
        )}
      </Link>

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Notifications</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ul>
            {notifications.map((notification) => (
              <li key={notification._id}>
                <div>{notification.message}</div> 
                <hr />
                <div>{new Date(notification.timestamp).toLocaleString()}</div>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default NotificationList;














