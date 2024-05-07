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

    setLoading(true);
    axios
      .put(`http://localhost:5555/student/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.log(error);
        alert("Please Check Colsole");
        setLoading(false);
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
    <div style={{ padding: "4px" }}>
      <BackButton />
      <h1>Edit Student</h1>
      <div>
        <div className="mb-3" style={{ textAlign: "left" }}>
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
        <div className="mb-3" style={{ textAlign: "left" }}>
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
        <div className="mb-3" style={{ textAlign: "left" }}>
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
        <div className="mb-3" style={{ textAlign: "left" }}>
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
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleEditStudent}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditStudent;
