import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateStudent = () => {
  const [name, setName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [classValue, setClass] = useState("");
  const [subjects, setSubjects] = useState({
    Biology: false,
    Math: false,
    Chemistry: false,
    Physics: false,
    Computer: false,
    English: false,
    Urdu: false,
    Islam: false,
    PakStudy: false,
    TQ: false,
    Economics: false,
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (subject) => {
    setSubjects((prevSubjects) => ({
      ...prevSubjects,
      [subject]: !prevSubjects[subject],
    }));
  };

  const handelSaveStudent = () => {
    const selectedSubjects = Object.keys(subjects).filter(
      (subject) => subjects[subject]
    );

    const data = {
      name: name,
      fatherName: fatherName,
      class: classValue,
      subjects: selectedSubjects,
    };

    setLoading(true);
    axios
      .post(`http://localhost:5555/student`, data)
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

  return (
    <div style={{ padding: "4px" }}>
      <BackButton />
      <h1>Create Student</h1>
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
            value={classValue}
            onChange={(e) => setClass(e.target.value)}
          />
        </div>
        <div className="mb-3" style={{ textAlign: "left" }}>
          <label>Subjects:</label>
          {Object.keys(subjects).map((subject) => (
            <div key={subject} className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={subject}
                checked={subjects[subject]}
                onChange={() => handleCheckboxChange(subject)}
              />
              <label className="form-check-label" htmlFor={subject}>
                {subject}
              </label>
            </div>
          ))}
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
    </div>
  );
};

export default CreateStudent;
