import React from 'react';
import '../App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const QuizData = ({ quiz }) => {
  
  if (!quiz) {
    return <div className="text-center">Loading quiz data...</div>; 
  }

  return (
    <div className="container mycontainer  w-75 h-auto rounded-3 bg-light shadow-lg animate__animated animate__fadeIn" style={{ marginLeft: '270px', marginRight: 'auto' }}>
      <h5 className="text-center mb-4 text-primary">Quiz: {quiz.title}</h5>

      {quiz.questions && quiz.questions.map((question, qIndex) => (
        <div key={question._id} className="mb-3 text-dark mt-4 p-3  rounded">
          <h6 className="font-weight-bold text-primary">Question: {question.questionText}</h6>
          
          <div className="row mb-2">
            {question.options.map((option, optIndex) => (
              <div key={optIndex} className="col-12 col-md-6 mb-2">
                <div className="option-card p-2 border rounded bg-light shadow-sm animate__animated animate__zoomIn">
                  <h6 className="text-primary">{option.optionText}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuizData;

















































































































































// import React from 'react';
// import '../App.css';

// const QuizData = ({ quiz }) => {
  
//   if (!quiz) {
//     return <div>Loading quiz data...</div>; 
//   }

//   return (
//     <div className="container mt-1  w-75 h-50 rounded-3 bg-light shadow-lg  " style={{ marginLeft: '300px' }}>
//       {/* <h5 className="text-center mb-4 text-dark">Quiz Details: {quiz.title}</h5> */}
//       {/* <form> */}
        
//         {/* <div className="mb-4">
//           <label className="form-label text-dark">Quiz Title:</label>
//           <input
//             type="text"
//             className="form-control"
//             value={quiz.title}
//             readOnly 
//           />
//         </div> */}

    
//         {quiz.questions && quiz.questions.map((question, qIndex) => (
//           <div key={question._id} className="mb-5 text-dark mt-5">  
//             <h6>Question:      {question.questionText}
//             </h6>

//             {/* <div className="mb-3"> */}
//                {/* {question.questionText} */}

//               {/* <input
//                 type="text"
//                  className="form-control"
//                 value={question.questionText}
//                 readOnly
//               /> */}
//             {/* </div> */}

//             <div className="row mb-2">
//               {question.options.map((option, optIndex) => (
//                 <div key={optIndex} className="col-1">
//                   <h6>{option.optionText}</h6>
//                   {/* <input
//                     type="text"
//                     className="form-control"
//                     value={option.optionText}
//                     readOnly 
//                   /> */}
//                 </div>
//               ))}
//             </div>

//             {/* <div className="mb-3">
//               <label className="form-label">Correct Answer:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={question.correctAnswer}
//                 readOnly 
//               />
//             </div> */}

//             {/* <div className="mb-5" style={{ paddingTop: '5px' }}>  
//               <label className="form-label">Difficulty:</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 value={question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
//                 readOnly 
//               />
//             </div> */}
//           </div>
//         ))}
//       {/* </form> */}
//     </div>
//   );
// };

// export default QuizData;

























