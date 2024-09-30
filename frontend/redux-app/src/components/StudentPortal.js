import React from 'react';

const StudentPortal = () => {
    
    // const handleStartQuiz = () => {
    //     alert('Starting the quiz!');
    // };

    const getQuizInfo = () => {
        return (
            <ul>
                <li><strong>Diverse Question Types:</strong> Our quizzes include various formats like multiple-choice questions (MCQs), true/false questions, and short answer questions.</li>
                <li><strong>Instant Feedback:</strong> Get immediate results after completing a quiz to understand your performance.</li>
                <li><strong>Analytical Reports:</strong> Receive detailed performance reports that highlight your strengths and areas for improvement.</li>
                <li><strong>Personalized Recommendations:</strong> After each quiz, you'll receive tailored advice to help you enhance your learning.</li>
                <li><strong>Interactive Learning:</strong> Engage with quizzes that not only test your knowledge but also provide educational insights.</li>
                <li><strong>Flexible Timing:</strong> Take quizzes at your convenience, allowing you to study at your own pace.</li>
                <li><strong>Compete with Peers:</strong> Challenge your classmates and see how you rank among them.</li>
            </ul>
        );
    };

    return (
        <div className="container w-100 studentport">
            <div className="header text-center bg-primary text-white p-4 ">
                <h1>Welcome to the Student Portal</h1>
            </div>
            <div className="content p-4 bg-light rounded shadow">
                <h2>About Quizzes</h2>
                <p>The quizzes on our platform provide a fantastic opportunity to test your knowledge and enhance your learning experience. They are designed to be engaging and informative.</p>
                <p>Our quizzes cover a wide range of subjects, ensuring that there's something for everyone. Whether you are preparing for exams or just want to brush up on your skills, our quizzes will help you achieve your goals.</p>
                <h4>Quiz Features:</h4>
                {getQuizInfo()}
                <h4>How to Participate:</h4>
                <p>Log in to your profile and navigate to the "Quizzes" section. You'll find a variety of quizzes available based on different subjects and topics.</p>
                <p>Each quiz is designed to challenge your understanding and provide instant feedback to help you learn effectively.</p>
                {/* <button className="btn btn-primary" onClick={handleStartQuiz}>Start Now!</button> */}
            </div>
        </div>
    );
};

export default StudentPortal;
