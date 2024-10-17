import React from 'react';
import './TestTable.css'; 
import { useNavigate } from 'react-router-dom';
import HomeNav from './HomeNav';

const TestTable = () => {
    const navigate = useNavigate();

    const tests = [
        { id: 1, title: 'Analytical Reasoning Test', questions: 10, time: '30 mins' },
        { id: 2, title: 'General Knowledge Test', questions: 8, time: '60 mins' },
        { id: 3, title: 'Physics Test', questions: 8, time: '60 mins' },
        { id: 4, title: 'Chemistry Test', questions: 10, time: '30 mins' },
        { id: 5, title: 'Physics Test', questions: 10, time: '30 mins' },
    ];

    const handleAnalyticalReasoningTest = () => {
        navigate('/testbutton');
    };

    const handleGeneralKnowledgeTest = () => {
        navigate('/testsbutton');
    };

    const handlePhysicsTest = () => {
        navigate('/testsbutton');
    };

    const handleChemistryTest = () => {
        navigate('/testbutton');
    };

    const handleTestStart = (test) => {
        switch (test.title) {
            case 'Analytical Reasoning Test':
                handleAnalyticalReasoningTest();
                break;
            case 'General Knowledge Test':
                handleGeneralKnowledgeTest();
                break;
            case 'Physics Test':
                handlePhysicsTest();
                break;
            case 'Chemistry Test':
                handleChemistryTest();
                break;
            default:
                navigate('/testbutton'); 
        }
    };

    return (
        <>
            <HomeNav />
            <div className="test-table">
                <h2 className='myhighding'>Available Tests</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Test No</th>
                            <th>Test Title</th>
                            <th>Number of Questions</th>
                            <th>Total Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tests.map((test) => (
                            <tr key={test.id} onClick={() => handleTestStart(test)} className="test-row">
                                <td>{test.id}</td>
                                <td>{test.title}</td>
                                <td>{test.questions}</td>
                                <td>{test.time}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default TestTable;
































