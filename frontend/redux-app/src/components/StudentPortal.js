import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'

const StudentPortal = () => {
    const [student, setStudent] = useState(null);
    const email = localStorage.getItem('email'); 
    const role = localStorage.getItem('role'); 
    // const navigate = useNavigate();

    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/auth/users/student/${email}`);
                setStudent(response.data);
            } catch (error) {
                console.error('Error fetching student data:', error);
            }
        };

        if (email && role === 'student') {
            fetchStudentData();
        }
    }, [email, role]);

    // const handleEdit = () => {
    //     navigate('/profile');
    // };

    if (!student) return <div className="text-center mt-5">Loading...</div>;

    return (
        <div className="container mt-5 " style={{ maxWidth: '1200px',width:'500px', height: '400px', margin: 'auto',fontFamily: 'Tahoma Verdana sans-serif' }}>
            
            <div className="card p-4 shadow-sm bg-light ">
            <h2 className="text-center mb-4">Student Profile</h2>

                <div className="mb-3">
                    <label className="form-label"><strong>First Name:</strong></label>
                    <input type="text" className="form-control formselect" value={student.firstname} readOnly />
                </div>
                <div className="mb-3">
                    <label className="form-label"><strong>Last Name:</strong></label>
                    <input type="text" className="form-control formselect" value={student.lastname} readOnly />
                </div>
                <div className="mb-3">
                    <label className="form-label"><strong>Email:</strong></label>
                    <input type="email" className="form-control formselect" value={student.email} readOnly />
                </div>
                <div className="mb-3">
                    <label className="form-label"><strong>Role:</strong></label>
                    <input type="text" className="form-control formselect" value={student.role} readOnly />
                </div>
                {/* <button className="btn btn-primary w-25 myeditbutton" onClick={handleEdit}>Edit</button> */}
            </div>
        </div>
    );
};

export default StudentPortal;


































































































































































