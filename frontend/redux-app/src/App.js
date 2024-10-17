import React from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { Routes, Route, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
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
import { messaging } from './firebase';
import { getToken } from 'firebase/messaging';
import TestTable from './components/TestTable';
import TestButton from './components/TestButton';
import TestsButton from './components/TestsButton';

// import ChatBox from './components/ChatBox';
// import Dashboardd from './components/Dashboardd';

const ProtectedRoute = ({ children }) => {
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');

    if (!token) {
        return <Navigate to="/login" />;
    }

    return children;
};

function App() {
    async function requestPermission(){
       const permssion=await Notification.requestPermission()
       if(permssion==='granted')
       {
          const token=await getToken(messaging,{vapidKey:'BGPgQXvLjPJu5ZYLuyXTlvMOFhrWBZyLf1HqDtlzAeJMCiEYzVa33_4i6ODahrJPwLFbtGEkcdJoa-B4MUhnCgY'})
          console.log("Token generated",token);
       }
       else if(permssion==='denied')
       {
        alert("you diened for the notification");
       }
    }
    const token = useSelector((state) => state.auth.token) || localStorage.getItem('token');
    const role = useSelector((state) => state.auth.role) || localStorage.getItem('role');
    useEffect(()=>{
        requestPermission();
    },[])

    return (
        <div>
            <Routes>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgot-password" element={<ForgetPassword />} />
                <Route path="/resultpage" element={<ResultNav />} />
                <Route path="/recordpage" element={<RecordPage />} />
                <Route path="/studentresult" element={<StudentResult />} />
                <Route path="/testtables" element={<TestTable />} />
                <Route path="/testbutton" element={<TestButton/>} />
                <Route path="/testsbutton" element={<TestsButton/>} />




                <Route path="/allquiz" element={
                    <ProtectedRoute>
                        <QuizData />
                    </ProtectedRoute>
                } />

                <Route path="/questions" element={
                    <ProtectedRoute>
                        <QuestionPage />
                    </ProtectedRoute>
                } />

                <Route path="/analyticalquestion" element={
                    <ProtectedRoute>
                        <AnalyticalQuestion />
                    </ProtectedRoute>
                } />

                <Route path="/quizdata" element={
                    <ProtectedRoute>
                        <QuestionDataPage />
                    </ProtectedRoute>
                } />

                <Route path="/test" element={
                    <ProtectedRoute>
                        <TestForm />
                    </ProtectedRoute>
                } />

                {/* Protected Routes */}
                <Route path="/homepage" element={
                    <ProtectedRoute>
                        <Homepage />
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

                <Route path="/dashboard" element={
                    <ProtectedRoute>
                        {token && role === 'admin' ? 
                        <>
                            <Dashboard />
                            <Logout/>
                            </>
                            : <Navigate to="/home" />}
                    </ProtectedRoute>
                } />

                {/* Student Route */}
                <Route path="/home" element={
                    <ProtectedRoute>
                        {token && role === 'student' ?
                        <>
                            <Home />
                            <Logout/>
                            </>
                            : <Navigate to="/login" />}
                    </ProtectedRoute>
                } />

                <Route path="/" element={token ? <Navigate to={role === 'admin' ? "/dashboard" : "/homepage"} /> : <Navigate to="/login" />} />
            </Routes>
        </div>
    );
}

export default App;
































































































































































































































