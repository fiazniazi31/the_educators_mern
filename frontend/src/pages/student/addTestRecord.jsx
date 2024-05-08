import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../../components/BackButton";

const AddStudentTest = () => {
  const { id } = useParams(); // Get the id from the URL params
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [obtainMarks, setObtainMarks] = useState("");
  const [totalMarks, setTotalMarks] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch subjects for the specific student
    axios.get(`http://localhost:5555/student/${id}`).then((response) => {
      const studentSubjects = response.data.subjects;
      setSubjects(studentSubjects);
      setSelectedSubject(studentSubjects[0]); // Set default selected subject
    });
  }, [id]);

  const handelSaveStudent = (e) => {
    // e.preventDefault(); // Prevent default form submission
    const data = {
      subject: selectedSubject,
      obtainMarks: obtainMarks,
      totalMarks: totalMarks,
    };

    setLoading(true);
    axios
      .post(`http://localhost:5555/student/${id}/addTest`, data)
      .then(() => {
        alert("Test record added successfully");
        navigate(`/student/details/${id}`, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to add test record. Please check the console.");
      });
  };

  return (
    <div style={{ padding: "4px" }}>
      <BackButton />
      <h1>Add Student Test</h1>
      <div>
        {subjects.length > 0 ? ( // Add this check to ensure subjects array is not empty
          <div>
            <div className="mb-3" style={{ textAlign: "left" }}>
              <label htmlFor="subject" className="form-label">
                Subject
              </label>
              <select
                className="form-select"
                id="subject"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map((subject) => (
                  <option key={subject} value={subject}>
                    {subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3" style={{ textAlign: "left" }}>
              <label htmlFor="obtainMarks" className="form-label">
                Obtain Marks
              </label>
              <input
                type="text"
                className="form-control"
                id="obtainMarks"
                value={obtainMarks}
                onChange={(e) => setObtainMarks(e.target.value)}
              />
            </div>
            <div className="mb-3" style={{ textAlign: "left" }}>
              <label htmlFor="totalMarks" className="form-label">
                Total Marks
              </label>
              <input
                type="text"
                className="form-control"
                id="totalMarks"
                value={totalMarks}
                onChange={(e) => setTotalMarks(e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 col-6 mx-auto">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handelSaveStudent}
              >
                Save
              </button>
            </div>
          </div>
        ) : (
          <div>No subjects found for this student</div>
        )}
      </div>
    </div>
  );
};

export default AddStudentTest;
