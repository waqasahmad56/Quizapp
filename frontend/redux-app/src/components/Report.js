import React from 'react';


const Report = () => {
  const reportData = [
    {
      studentName: "Alice Johnson",
      quizTitle: "Mathematics Quiz",
      score: 85,
      totalQuestions: 20,
      description: "Alice performed exceptionally well in the Mathematics Quiz, answering 17 out of 20 questions correctly. Keep up the great work!",
      imgSrc: "https://wallsdesk.com/wp-content/uploads/2016/05/Waterfalls-Photos.jpg",
    },
    {
      studentName: "John Doe",
      quizTitle: "Science Quiz",
      score: 90,
      totalQuestions: 15,
      description: "John excelled in the Science Quiz with a score of 90%. His understanding of scientific concepts is impressive!",
      imgSrc: "https://images.unsplash.com/photo-1593642632400-8f2a8b1f63f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDEzfHxzY2llbnxlbnwwfHx8fDE2NjM3ODg1MjE&ixlib=rb-1.2.1&q=80&w=1080",
    },
    {
      studentName: "Emily Davis",
      quizTitle: "History Quiz",
      score: 70,
      totalQuestions: 10,
      description: "Emily showed a solid understanding of historical events, scoring 70%. With a bit more study, she can achieve even higher!",
      imgSrc: "https://images.unsplash.com/photo-1549880367-e8e5d0e8e5b2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fGhpc3Rvcnl8ZW58MHx8fHwxNjYzNzgwNTA5&ixlib=rb-1.2.1&q=80&w=1080",
    },
    {
      studentName: "Michael Brown",
      quizTitle: "Geography Quiz",
      score: 78,
      totalQuestions: 12,
      description: "Michael scored 78% in the Geography Quiz, showing good knowledge of world geography. Further exploration will boost his score!",
      imgSrc: "https://images.unsplash.com/photo-1582240225977-daa6c9b1d0d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDV8fGdlb2dyYXBoeXxlbnwwfHx8fDE2NjM3ODg1MjE&ixlib=rb-1.2.1&q=80&w=1080",
    },
  ];

  return (
    <div className="container mt-5 w-100">
      <h1 className="text-center mb-4">Student Test Reports</h1>
      <div className="row">
        {reportData.map((report, index) => (
          <div className="col-md-3 mb-4" key={index}>
            <div className="card h-100 shadow-lg rounded">
              <img src={report.imgSrc} className="card-img-top rounded-top" alt={report.studentName} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{report.studentName}</h5>
                <h6 className="card-subtitle mb-2 text-muted">{report.quizTitle}</h6>
                <p className="card-text">Score: {report.score}/{report.totalQuestions}</p>
                <p className="card-text flex-grow-1">{report.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Report;
