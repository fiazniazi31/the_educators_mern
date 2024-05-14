import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import Spinner from "../../components/Spinner";

const TeacherHome = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const teacherId = localStorage.getItem("teacherId");
    if (!teacherId) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:5555/teacher/${teacherId}`)
        .then((response) => {
          setTeacher(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, []);

  const markAttendance = (type) => {
    const attendance = {
      type,
      date: new Date().toISOString(),
    };
    axios
      .post(
        `http://localhost:5555/teacher/${teacher._id}/attendance`,
        attendance
      )
      .then((response) => {
        const message =
          type === "in" ? "Marked In successfully" : "Marked Out successfully";
        alert(message);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleLogout = () => {
    localStorage.removeItem("teacherId");
    navigate("/");
  };

  return (
    <div>
      <button className="btn btn-primary" onClick={handleLogout}>
        Log Out
      </button>
      <h1>Welcome, {teacher ? teacher.name : "Teacher"}</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div>
          <p>Subject: {teacher ? teacher.subject : "-"}</p>
          <p>Age: {teacher ? teacher.age : "-"}</p>
          <p>Phone: {teacher ? teacher.phone : "-"}</p>
          <p>Address: {teacher ? teacher.address : "-"}</p>
          <p>Qualification: {teacher ? teacher.qualification : "-"}</p>
          <div style={{ marginTop: "20px" }}>
            <button
              className="btn btn-success"
              onClick={() => markAttendance("in")}
            >
              Mark In
            </button>
            <button
              className="btn btn-danger"
              onClick={() => markAttendance("out")}
              style={{ marginLeft: "10px" }}
            >
              Mark Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TeacherHome;
