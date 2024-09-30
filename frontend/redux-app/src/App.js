import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Route, Routes, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Logout from './components/Logout';
import Signup from './components/Signup';
import ForgetPassword from './components/ForgetPassword';
import Homepage from './components/Homepage'; 
import Home from './components/Home'; 
import Profile from './components/Profile'; 
import Quizzes from './components/Quizzes'; 
import QuestionPage from './components/QuestionPage';
import TestForm from './components/TestForm';
import ResultNav from './components/ResultNav';
import Report from './components/Report';



const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
    
    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

function App() {
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
    const role = useSelector((state) => state.auth.role) || localStorage.getItem('role');

    return (
        <div>
            <Routes>
        
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgetPassword />} />
                <Route path="/resultpage" element={<ResultNav/>} />
                <Route path="/reports" element={<Report/>} />

                


                <Route path="/questions" element={
                    <ProtectedRoute>
                        <QuestionPage />
                    </ProtectedRoute>
                } />
                <Route path="/test" element={
                    <ProtectedRoute>
                        <TestForm />
                    </ProtectedRoute>
                } />

                {/* Protected Routes */}
                <Route path="/home" element={
                    <ProtectedRoute>
                        <Home />
                    </ProtectedRoute>
                } />
                <Route path="/quiz" element={
                    <ProtectedRoute>
                        <Quizzes />
                    </ProtectedRoute>
                } />
                <Route path="/profile" element={
                    <ProtectedRoute>
                        <Profile />
                    </ProtectedRoute>
                } />
                

                <Route
                    path="/dashboard"
                    element={token && role === 'admin' ? (
                        <div>
                            <Dashboard />
                            <Logout />
                        </div>
                    ) : (
                        <Navigate to="/homepage" />
                    )}
                />

                {/* Student Route */}
                <Route
                    path="/homepage"
                    element={token && role === 'student' ? (
                        <div>
                            <Homepage />
                            <Logout />
                        </div>
                    ) : (
                        <Navigate to="/login" />
                    )}
                />

                {/* Default Route: If not logged in, redirect to login */}
                <Route path="/" element={token ? <Navigate to={role === 'admin' ? "/dashboard" : "/homepage"} /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;

































































































































































































































































































































































































































































