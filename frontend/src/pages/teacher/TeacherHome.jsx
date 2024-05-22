import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import Spinner from "../../components/Spinner";
import ToastNotification from "../../components/ToastedNotifiForTeacher";

const TeacherHome = () => {
  const [teacher, setTeacher] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const teacherId = localStorage.getItem("teacherId");
    if (!teacherId) {
      navigate("/login");
    } else {
      axios
        .get(`http://localhost:5555/teacher/user/${teacherId}`)
        .then((response) => {
          setTeacher(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setLoading(false);
        });
    }
  }, [navigate]);

  const markAttendance = async (type) => {
    try {
      const teacherId = teacher._id;
      const currentDate = new Date();
      const attendance = { type, date: currentDate.toISOString() };

      const { data } = await axios.post(
        `http://localhost:5555/teacher/${teacherId}/attendance`,
        attendance
      );

      if (data.message === "Attendance marked successfully") {
        setToastMessage(`${type.toUpperCase()} attendance marked successfully`);
        setShowToast(true);

        // Update the teacher's attendance record in the state
        setTeacher((prevTeacher) => ({
          ...prevTeacher,
          attendance: [...prevTeacher.attendance, attendance],
        }));
      } else {
        setToastMessage(data.message);
        setShowToast(true);
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setToastMessage(error.response.data.message);
        setShowToast(true);
      } else {
        console.error(error);
        setToastMessage(
          "An unexpected error occurred. Please try again later."
        );
        setShowToast(true);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("teacherId");
    navigate("/");
  };

  return (
    <div
      style={{
        textAlign: "left",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <button className="btn btn-primary" onClick={handleLogout}>
        Log Out
      </button>

      {teacher ? (
        <>
          <Link to={`/teacher/details/${teacher._id}`}>See Details</Link>
          <div style={{ textAlign: "left" }}>
            <h1>Welcome, {teacher.name || "Teacher"}</h1>
            <p>Subject: {teacher.subject || "-"}</p>
            <p>Age: {teacher.age || "-"}</p>
            <p>Phone: {teacher.phone || "-"}</p>
            <p>Address: {teacher.address || "-"}</p>
            <p>Qualification: {teacher.qualification || "-"}</p>
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                justifyContent: "center",
              }}
            >
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
        </>
      ) : loading ? (
        <Spinner />
      ) : (
        <div>No teacher found</div>
      )}
      <ToastNotification
        show={showToast}
        message={toastMessage}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default TeacherHome;
