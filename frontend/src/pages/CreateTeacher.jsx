import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const CreateTeacher = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handelSaveTeacher = () => {
    const data = {
      name: name,
      subject: subject,
      age: age,
      phone: phone,
      address: address,
      qualification: qualification,
    };

    setLoading(true);
    axios
      .post(`http://localhost:5555/teacher`, data)
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
      <h1>Create Teacher</h1>
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
          <label htmlFor="subject" className="form-label">
            Subject
          </label>
          <input
            type="text"
            className="form-control"
            id="subject"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
          />
        </div>
        <div className="mb-3" style={{ textAlign: "left" }}>
          <label htmlFor="age" className="form-label">
            Age
          </label>
          <input
            type="text"
            className="form-control"
            id="age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
          <div className="mb-3" style={{ textAlign: "left" }}>
            <label htmlFor="phone" className="form-label">
              Phone
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="mb-3" style={{ textAlign: "left" }}>
            <label htmlFor="address" className="form-label">
              Address
            </label>
            <input
              type="text"
              className="form-control"
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="mb-3" style={{ textAlign: "left" }}>
            <label htmlFor="qualification" className="form-label">
              Qualification
            </label>
            <input
              type="text"
              className="form-control"
              id="qualification"
              value={qualification}
              onChange={(e) => setQualification(e.target.value)}
            />
          </div>
        </div>
        <div className="d-grid gap-2 col-6 mx-auto">
          <button
            className="btn btn-primary"
            type="button"
            onClick={handelSaveTeacher}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeacher;
