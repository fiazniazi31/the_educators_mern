import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const EditTeacher = () => {
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [age, setAge] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [qualification, setQualification] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/teacher/${id}`)
      .then((response) => {
        setName(response.data.name);
        setSubject(response.data.subject);
        setAge(response.data.age);
        setPhone(response.data.phone);
        setAddress(response.data.address);
        setQualification(response.data.qualification);
        setUsername(response.data.username); // This needs to be fetched from User
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Please Check Console");
        setLoading(false);
      });
  }, [id]);

  const handleEditTeacher = () => {
    const data = {
      name,
      subject,
      age,
      phone,
      address,
      qualification,
      username,
      password,
    };

    setLoading(true);
    axios
      .put(`http://localhost:5555/teacher/${id}`, data)
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
        alert("Please Check Console");
        setLoading(false);
      });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "600px" }}>
        <BackButton />
        <h1 className="text-center">Edit Teacher</h1>
        {loading ? (
          <Spinner />
        ) : (
          <>
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
            <div className="mb-3">
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
            </div>
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="mb-3">
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
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                Username
              </label>
              <input
                type="email"
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
              <div className="input-group">
                <input
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  className="btn btn-outline-secondary"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            <div className="d-grid">
              <button
                className="btn btn-primary mx-auto"
                type="button"
                onClick={handleEditTeacher}
                style={{ width: "150px" }}
              >
                Save
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default EditTeacher;
