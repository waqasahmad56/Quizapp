import React, { useEffect, useState } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Login from './components/Login';
import Signup from './components/Signup';
import ForgetPassword from './components/ForgetPassword';
import Dashboard from './components/Dashboard';
import Homepage from './components/Homepage'; 
import Home from './components/Home'; 
import Profile from './components/Profile'; 
import Quizzes from './components/Quizzes'; 
import QuestionPage from './components/QuestionPage';
import TestForm from './components/TestForm';
import ResultNav from './components/ResultNav';
import QuestionDataPage from './components/QuestionDataPage';
import AnalyticalQuestion from './components/AnalyticalQuestion';
import RecordPage from './components/RecordPage';
import QuizData from './components/QuizData'; 
import StudentResult from './components/StudentResult';
import Logout from './components/Logout';
import TestTable from './components/TestTable';
import TestButton from './components/TestButton';
import TestsButton from './components/TestsButton';
import StudentRecordPage from './components/StudentRecordPage';
import io from 'socket.io-client';
import Notification from './components/Notification';
import NotificationList from './components/NotificationList';

const socket = io('http://localhost:5000');

const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

function App() {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (Notification.permission === 'default' || Notification.permission === 'denied') {
            Notification.requestPermission().then((permission) => {
                if (permission === 'granted') {
                    console.log('Notification permission granted');
                } else {
                    console.log('Notification permission denied');
                }
            });
        }

        socket.on('pushnotification', (data) => {
            console.log('Received', data);
            if (Notification.permission === 'granted') {
                new Notification('New Notification', {
                    body: data.message,
                    icon: 'https://via.placeholder.com/50',
                });
            }

            setNotifications((prev) => [...prev, data]);
        });

        return () => {
            socket.off('pushnotification');
        };
    }, []);

    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
    const role = useSelector((state) => state.auth.role) || localStorage.getItem('role');

    return (
        <>
            <div>
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/forgot-password" element={<ForgetPassword />} />
                    <Route path="/resultpage" element={<ResultNav />} />
                    <Route path="/recordpage" element={<RecordPage />} />
                    <Route path="/studentresult" element={<StudentResult />} />
                    <Route path="/testtables" element={<TestTable />} />
                    <Route path="/testbutton" element={<TestButton />} />
                    <Route path="/testsbutton" element={<TestsButton />} />
                    <Route path="/studentresultpage" element={<StudentRecordPage />} />
                    <Route path="/notifications" element={<Notification/>} />
                    <Route path="/notifyalert" element={<NotificationList/>} /> 

                    <Route path="/allquiz" element={<ProtectedRoute><QuizData /></ProtectedRoute>} />
                    <Route path="/questions" element={<ProtectedRoute><QuestionPage /></ProtectedRoute>} />
                    <Route path="/analyticalquestion" element={<ProtectedRoute><AnalyticalQuestion /></ProtectedRoute>} />
                    <Route path="/quizdata" element={<ProtectedRoute><QuestionDataPage /></ProtectedRoute>} />
                    <Route path="/test" element={<ProtectedRoute><TestForm /></ProtectedRoute>} />
                    <Route path="/homepage" element={<ProtectedRoute><Homepage /></ProtectedRoute>} />
                    <Route path="/quiz" element={<ProtectedRoute><Quizzes /></ProtectedRoute>} />
                    <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
                    <Route path="/dashboard" element={
                        <ProtectedRoute>
                            {token && role === 'admin' ? <>
                                <Dashboard />
                                <Logout />
                            </> : <Navigate to="/home" />}
                        </ProtectedRoute>
                    } />
                    <Route path="/home" element={
                        <ProtectedRoute>
                            {token && role === 'student' ? <Home /> : <Navigate to="/login" />}
                        </ProtectedRoute>
                    } />
                    <Route path="/" element={token ? <Navigate to={role === 'admin' ? "/dashboard" : "/homepage"} /> : <Navigate to="/login" />} />
                </Routes>
            </div>

            <div>
                <ul>
                    {notifications.map((notifi, index) => (
                        <li key={index}>{notifi.message}</li>
                    ))}
                </ul>
            </div>
        </>
    );
}

export default App;




































































































































































































































































































































































































































































































































































































































































































