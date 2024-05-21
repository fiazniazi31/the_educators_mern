import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const EditStudent = () => {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [clas, setClas] = useState("");
  const [subjects, setSubjects] = useState({
    Biology: false,
    Math: false,
    Chemistry: false,
    Physics: false,
    English: false,
    Urdu: false,
    Islam: false,
    PakStudy: false,
    TQ: false,
    Economics: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/student/${id}`)
      .then((responce) => {
        setName(responce.data.name);
        setFatherName(responce.data.fatherName);
        setClas(responce.data.class);
        // Initialize subjects based on data from the server
        const studentSubjects = responce.data.subjects.reduce(
          (acc, subject) => {
            acc[subject] = true;
            return acc;
          },
          { ...subjects }
        );
        setSubjects(studentSubjects);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        alert("Please Check Colsole");
        setLoading(false);
      });
  }, []);

  const handleEditStudent = () => {
    const selectedSubjects = Object.keys(subjects).filter(
      (subject) => subjects[subject]
    );

    const data = {
      name: name,
      fatherName: fatherName,
      class: clas,
      subjects: selectedSubjects,
    };

    if (!name || !fatherName || !clas) {
      alert("Please fill in all required fields: Name, Father Name, and Class");
      return;
    }
    setLoading(true);
    axios
      .put(`http://localhost:5555/student/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        setLoading(false);
        if (error.response) {
          console.log(error.response.data);
          console.log(error.response.status);
          console.log(error.response.headers);
          alert("Server Error: " + error.response.data.message);
        } else if (error.request) {
          console.log(error.request);
          alert("No response from server");
        } else {
          console.log("Error", error.message);
          alert("Error: " + error.message);
        }
      });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setSubjects((prevSubjects) => ({
      ...prevSubjects,
      [name]: checked,
    }));
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <BackButton />
        <h1 className="text-center">Edit Student</h1>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="fatherName" className="form-label">
            Father Name
          </label>
          <input
            type="text"
            className="form-control"
            id="fatherName"
            value={fatherName}
            onChange={(e) => setFatherName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="class" className="form-label">
            Class
          </label>
          <input
            type="text"
            className="form-control"
            id="class"
            value={clas}
            onChange={(e) => setClas(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label>Subjects:</label>
          <div>
            {Object.keys(subjects).map((subject) => (
              <div key={subject} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={subject}
                  name={subject}
                  checked={subjects[subject]}
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor={subject}>
                  {subject}
                </label>
              </div>
            ))}
          </div>
        </div>
        <div className="d-grid">
          <button
            className="btn btn-primary mx-auto"
            type="button"
            onClick={handleEditStudent}
            style={{ width: "150px" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
