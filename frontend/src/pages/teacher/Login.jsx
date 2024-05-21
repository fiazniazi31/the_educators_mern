import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // const handleLogin = () => {
  //   axios
  //     .post("http://localhost:5555/teacher/login", { username, password })
  //     .then((response) => {
  //       // Store the logged-in teacher's ID in localStorage
  //       localStorage.setItem("teacherId", response.data.teacher._id);
  //       // Handle successful login
  //       navigate("/teacher/home"); // Redirect to dashboard or home page
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       setError("Invalid username or password");
  //     });
  // };

  const handleLogin = () => {
    axios
      .post("http://localhost:5555/teacher/login", { username, password })
      .then((response) => {
        localStorage.setItem("teacherId", response.data.teacher._id);
        navigate("/teacher/home");
      })
      .catch((error) => {
        if (error.response.status === 401) {
          setError("Invalid username or password");
        } else {
          setError("An error occurred. Please try again later.");
        }
      });
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center">Teacher Login</h2>
        {error && <div className="alert alert-danger">{error}</div>}
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
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="d-grid">
          <button className="btn btn-primary" onClick={handleLogin}>
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
