import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudnetHome() {
  const [student, setStudent] = useState({}); // Initialize with an empty object
  const navigate = useNavigate();

  useEffect(() => {
    // Get the student ID from localStorage
    const studentId = localStorage.getItem("studnetId");
    if (studentId) {
      console.log(studentId);
      // Fetch student data from the backend
      axios
        .get(`http://localhost:5555/student/${studentId}`)
        .then((response) => {
          setStudent(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("studentId");
    navigate("/");
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleLogout}>
        Log Out
      </button>
      <h1>Welcome, {student ? student.name : "Student"}</h1>
      {student && (
        <div>
          <p>Father's Name: {student.fatherName}</p>
          <p>Class: {student.class}</p>
          <p>
            Subjects:{" "}
            {student.subjects ? student.subjects.join(", ") : "No subjects"}
          </p>
        </div>
      )}
      <div style={{ display: "flex", marginTop: "20px" }}>
        <div style={{ flex: 1, marginRight: "20px" }}>
          <h2>Attendance Records</h2>
          {student && student.attendance && student.attendance.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {student.attendance.map((record) => (
                  <tr key={record._id}>
                    <td>{new Date(record.date).toLocaleDateString()}</td>
                    <td>{record.present ? "Present" : "Absent"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No attendance records found.</p>
          )}
        </div>
        <div style={{ flex: 1, marginRight: "20px" }}>
          <h2>Test Records</h2>
          {student && student.testRecords && student.testRecords.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Total Marks</th>
                  <th>Obtained Marks</th>
                </tr>
              </thead>
              <tbody>
                {student.testRecords.map((record) => (
                  <tr key={record._id}>
                    <td>{record.subject}</td>
                    <td>{record.totalMarks}</td>
                    <td>{record.obtainMarks}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No test records found.</p>
          )}
        </div>
        <div style={{ flex: 1 }}>
          <h2>Fee Records</h2>
          {student && student.feeRecords && student.feeRecords.length > 0 ? (
            <table>
              <thead>
                <tr>
                  <th>Amount</th>
                  <th>Month</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {student.feeRecords.map((record) => (
                  <tr key={record._id}>
                    <td>{record.amount}</td>
                    <td>{record.month}</td>
                    <td>{record.year}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No fee records found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudnetHome;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function StudentHome() {
//   const [student, setStudent] = useState(null);

//   useEffect(() => {
//     // Get the student ID from localStorage
//     const studentId = localStorage.getItem("studentId");
//     if (studentId) {
//       // Fetch student data from the backend
//       axios
//         .get(`http://localhost:5555/student/${studentId}`)
//         .then((response) => {
//           setStudent(response.data);
//         })
//         .catch((error) => {
//           console.log(error);
//         });
//     }
//   }, []); // Empty dependency array, so it only runs once

//   const handleLogout = () => {
//     localStorage.removeItem("studentId");
//     navigate("/");
//   };

//   const renderAttendance = () => {
//     if (!student || !student.attendance || student.attendance.length === 0) {
//       return <p>No attendance records found.</p>;
//     }

//     return (
//       <div>
//         <h2>Attendance Records</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {student.attendance.map((record) => (
//               <tr key={record._id}>
//                 <td>{new Date(record.date).toLocaleDateString()}</td>
//                 <td>{record.present ? "Present" : "Absent"}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderTestRecords = () => {
//     if (!student || !student.testRecords || student.testRecords.length === 0) {
//       return <p>No test records found.</p>;
//     }

//     return (
//       <div>
//         <h2>Test Records</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Subject</th>
//               <th>Total Marks</th>
//               <th>Obtained Marks</th>
//             </tr>
//           </thead>
//           <tbody>
//             {student.testRecords.map((record) => (
//               <tr key={record._id}>
//                 <td>{record.subject}</td>
//                 <td>{record.totalMarks}</td>
//                 <td>{record.obtainMarks}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   const renderFeeRecords = () => {
//     if (!student || !student.feeRecords || student.feeRecords.length === 0) {
//       return <p>No fee records found.</p>;
//     }

//     return (
//       <div>
//         <h2>Fee Records</h2>
//         <table>
//           <thead>
//             <tr>
//               <th>Date</th>
//               <th>Amount</th>
//             </tr>
//           </thead>
//           <tbody>
//             {student.feeRecords.map((record) => (
//               <tr key={record._id}>
//                 <td>{record.date}</td>
//                 <td>{record.amount}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     );
//   };

//   return (
//     <div>
//       <button className="btn btn-primary" onClick={handleLogout}>
//         Log Out
//       </button>
//       <h1>Welcome, {student ? student.name : "Student"}</h1>
//       {student && (
//         <div>
//           <p>Father's Name: {student.fatherName}</p>
//           <p>Class: {student.class}</p>
//           {student && student.subjects && (
//             <div>
//               <p>Subjects: {student.subjects.join(", ")}</p>
//             </div>
//           )}
//         </div>
//       )}

//       <div style={{ display: "flex", marginTop: "20px" }}>
//         <div style={{ flex: 1, marginRight: "20px" }}>{renderAttendance()}</div>
//         <div style={{ flex: 1, marginRight: "20px" }}>
//           {renderTestRecords()}
//         </div>
//         <div style={{ flex: 1 }}>{renderFeeRecords()}</div>
//       </div>
//     </div>
//   );
// }

// export default StudentHome;
