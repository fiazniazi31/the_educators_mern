import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { MdOutlineDelete } from "react-icons/md";

const ShowStudent = () => {
  const [student, setStudent] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/student/${id}`)
      .then((response) => {
        if (response.data) {
          setStudent(response.data);
        } else {
          console.log("Invalid response format:", response.data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, [id]);

  const groupAttendanceByMonth = (attendance) => {
    const attendanceByMonth = {};

    attendance.forEach((record) => {
      // Convert record.date to a Date object
      const date = new Date(record.date);

      if (!(date instanceof Date) || isNaN(date)) {
        console.error("Invalid date format:", record.date);
        return;
      }

      const month = date.toLocaleString("default", { month: "long" });
      const day = date.getDate();

      if (!attendanceByMonth[month]) {
        attendanceByMonth[month] = {};
      }

      if (!attendanceByMonth[month][day]) {
        attendanceByMonth[month][day] = [];
      }

      attendanceByMonth[month][day].push(record);
    });

    return attendanceByMonth;
  };

  const totalPaidFee = student.feeRecords
    ? student.feeRecords.reduce((total, record) => total + record.amount, 0)
    : 0;

  return (
    <div style={{ padding: "4px" }}>
      <BackButton />
      <h1>Show Student</h1>
      {loading ? (
        <Spinner />
      ) : student ? (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <Link to={`/student/addFeeRecord/${student._id}`}>Add Fee</Link>
          <br />
          <Link to={`/student/addTest/${student._id}`}>Add Test Record</Link>

          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>ID: </span>
            <span>{student._id}</span>
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Name: </span>
            <span>{student.name}</span>
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Father Name: </span>
            <span>{student.fatherName}</span>
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Subjects: </span>
            <span>
              {student.subjects && student.subjects.length > 0
                ? student.subjects.join(", ")
                : "No subjects"}
            </span>
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Class: </span>
            <span>{student.class}</span>
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Paid Fee Records:</span>
            {student.feeRecords && student.feeRecords.length > 0 ? (
              <table style={{ width: "100%", marginTop: "5px" }}>
                <thead>
                  <tr>
                    <th>Amount</th>
                    <th>Month</th>
                    <th>Year</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {student.feeRecords.map((record, index) => (
                    <tr key={index}>
                      <td>{record.amount}</td>
                      <td>{record.month}</td>
                      <td>{record.year}</td>
                      <td>
                        <button
                          onClick={() => {
                            axios
                              .delete(
                                `http://localhost:5555/student/${student._id}/fee/${record._id}`
                              )
                              .then((response) => {
                                console.log(response.data);
                                // Refresh the student data after deletion
                                axios
                                  .get(
                                    `http://localhost:5555/student/${student._id}`
                                  )
                                  .then((response) => {
                                    setStudent(response.data);
                                  })
                                  .catch((error) => {
                                    console.log(error);
                                  });
                              })
                              .catch((error) => {
                                console.log(error);
                              });
                          }}
                          className="btn btn-outline-danger"
                        >
                          <MdOutlineDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              "No fee records"
            )}
          </div>

          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Total Paid Fee: </span>
            <span>{totalPaidFee}</span>
          </div>

          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Attendance Records:</span>
            {student.attendance && student.attendance.length > 0 ? (
              <div>
                {Object.entries(groupAttendanceByMonth(student.attendance)).map(
                  ([month, attendanceByDay]) => (
                    <div key={month}>
                      <h3>{month}</h3>
                      <table style={{ width: "100%", marginTop: "5px" }}>
                        <thead>
                          <tr>
                            <th>Day</th>
                            <th>Present</th>
                          </tr>
                        </thead>
                        <tbody>
                          {Object.entries(attendanceByDay).map(
                            ([day, records]) => (
                              <tr key={day}>
                                <td>Date:{day}</td>
                                <td>
                                  {records.some((record) => record.present)
                                    ? "Present"
                                    : "Absent"}
                                </td>
                              </tr>
                            )
                          )}
                        </tbody>
                      </table>
                    </div>
                  )
                )}
              </div>
            ) : (
              "No attendance records"
            )}
          </div>
        </div>
      ) : (
        <div>No student found</div>
      )}
    </div>
  );
};

export default ShowStudent;
