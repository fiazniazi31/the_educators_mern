import React, { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "../components/Spinner";
import { Link } from "react-router-dom";
import { AiOutlineEdit } from "react-icons/ai";
import { BsInfoCircle } from "react-icons/bs";
import { MdOutlineAddBox, MdOutlineDelete } from "react-icons/md";

const ShowAllStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [classFilter, setClassFilter] = useState("");
  const [filteredStudents, setFilteredStudents] = useState([]);

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/student`)
      .then((response) => {
        setStudents(response.data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setFilteredStudents(
      students.filter((student) =>
        student.class.toLowerCase().includes(classFilter.toLowerCase())
      )
    );
  }, [students, classFilter]);

  const handleClassFilterChange = (e) => {
    setClassFilter(e.target.value);
  };

  const handleAttendance = async (studentId, present) => {
    try {
      const today = new Date().toISOString().split("T")[0];
      const student = students.find((student) => student._id === studentId);

      if (!student) {
        console.log("Student not found");
        alert("Student not found");
        return;
      }

      const existingAttendance = student.attendance.some(
        (record) =>
          new Date(record.date).toDateString() ===
          new Date(today).toDateString()
      );

      if (existingAttendance) {
        alert("Attendance is already marked for today");
        return;
      }

      await axios.post(
        `http://localhost:5555/student/${studentId}/attendance`,
        {
          date: today,
          present,
        }
      );
      alert("Attendance marked successfully");
      // Optionally, you can refetch the student data or update the attendance record in the state
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ padding: "4px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1>Students List</h1>
        <div>
          <input
            type="text"
            placeholder="Filter by class"
            value={classFilter}
            onChange={handleClassFilterChange}
            style={{ marginRight: "10px" }}
          />
          <Link to="/student/create" style={{ fontSize: "1.5rem" }}>
            <MdOutlineAddBox />
          </Link>
        </div>
      </div>
      {loading ? (
        <Spinner />
      ) : (
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Father Name</th>
              <th scope="col">Class</th>
              <th scope="col">Subjects</th>
              <th scope="col">Attendance</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={student._id}>
                <th scope="row">{index + 1}</th>
                <td>{student.name}</td>
                <td>{student.fatherName}</td>
                <td>{student.class}</td>
                <td>{student.subjects.join(", ")}</td>
                <td>
                  <button
                    onClick={() => handleAttendance(student._id, true)}
                    className="btn btn-success btn-sm"
                  >
                    Present
                  </button>
                  <button
                    onClick={() => handleAttendance(student._id, false)}
                    className="btn btn-danger btn-sm"
                  >
                    Absent
                  </button>
                </td>
                <td>
                  <Link to={`/student/details/${student._id}`}>
                    <BsInfoCircle />
                  </Link>
                  <Link to={`/student/edit/${student._id}`}>
                    <AiOutlineEdit />
                  </Link>
                  <Link to={`/student/delete/${student._id}`}>
                    <MdOutlineDelete />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ShowAllStudents;
