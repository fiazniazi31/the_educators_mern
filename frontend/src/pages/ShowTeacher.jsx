import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const ShowTeacher = () => {
  const [teacher, setTeacher] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/teacher/${id}`)
      .then((response) => {
        if (response.data) {
          setTeacher(response.data);
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

  return (
    <div style={{ padding: "4px" }}>
      {/* <BackButton /> */}
      <h1>Show Teacher</h1>
      {loading ? (
        <Spinner />
      ) : teacher ? (
        <div
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>ID: </span>
            <span>{teacher._id}</span>
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Name: </span>
            <span>{teacher.name}</span>
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Subject: </span>
            <span>{teacher.subject}</span>
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Age: </span>
            <span>{teacher.age}</span>
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Age: </span>
            <span>{teacher.phone}</span>
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Age: </span>
            <span>{teacher.address}</span>
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Age: </span>
            <span>{teacher.qualification}</span>
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Username: </span>
            <span>{teacher.username}</span>
          </div>
          <div style={{ marginBottom: "10px", textAlign: "left" }}>
            <span>Password: </span>
            <span>{teacher.password}</span>
          </div>

          <h2>Attendance Records</h2>
          {teacher.attendance && teacher.attendance.length > 0 ? (
            <ul>
              {teacher.attendance.map((record, index) => (
                <li key={index}>
                  <strong>{record.type.toUpperCase()}:</strong>{" "}
                  {new Date(record.date).toLocaleString()}
                </li>
              ))}
            </ul>
          ) : (
            <div>No attendance records found</div>
          )}
        </div>
      ) : (
        <div>No teacher found</div>
      )}
    </div>
  );
};

export default ShowTeacher;
