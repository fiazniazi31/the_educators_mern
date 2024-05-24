import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheckboxChange = (subject) => {
    setSubjects((prevSubjects) => ({
      ...prevSubjects,
      [subject]: !prevSubjects[subject],
    }));
  };

  // const handelSaveStudent = () => {
  //   const selectedSubjects = Object.keys(subjects).filter(
  //     (subject) => subjects[subject]
  //   );

  //   const data = {
  //     name: name,
  //     fatherName: fatherName,
  //     class: classValue,
  //     subjects: selectedSubjects,
  //     username: username,
  //     password: password,
  //     type: "studnet",
  //   };

  //   setLoading(true);
  //   axios
  //     .post(`http://localhost:5555/student`, data)
  //     .then(() => {
  //       setLoading(false);
  //       navigate("/student/showAllStudents");
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       alert("Please Check Colsole");
  //       setLoading(false);
  //     });
  // };

  const handelSaveStudent = () => {
    const selectedSubjects = Object.keys(subjects).filter(
      (subject) => subjects[subject]
    );

    const data = {
      name: name,
      fatherName: fatherName,
      class: classValue,
      subjects: selectedSubjects,
      username: username,
      password: password,
      type: "studnet",
    };

    setLoading(true);
    axios
      .post(`http://localhost:5555/student`, data)
      .then(() => {
        setLoading(false);
        navigate("/student/showAllStudents");
      })
      .catch((error) => {
        console.log(error);
        alert("Please Check Console");
        setLoading(false);
      });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <BackButton />
        <h1 className="text-center">Create Student</h1>
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
            value={classValue}
            onChange={(e) => setClass(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">
            Username
          </label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="text"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="mb-3">
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
        <div className="d-grid">
          <button
            className="btn btn-primary mx-auto"
            type="button"
            onClick={handelSaveStudent}
            style={{ width: "150px" }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateStudent;
