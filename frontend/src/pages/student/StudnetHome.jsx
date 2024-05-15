import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function StudnetHome() {
  const [student, setStudent] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (userId) {
      axios
        .get(`http://localhost:5555/student/user/${userId}`)
        .then((response) => {
          setStudent(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userType");
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
