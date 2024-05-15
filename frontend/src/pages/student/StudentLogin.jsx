import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const StudentLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    console.log({ username, password });
    axios
      .post("http://localhost:5555/student/login", { username, password })
      .then((response) => {
        // Check if the response contains userId and userType
        if (response.data.userId && response.data.userType === "studnet") {
          // Store the logged-in student's ID in localStorage
          localStorage.setItem("userId", response.data.userId);

          // Handle successful login
          navigate("/studnet/home"); // Redirect to dashboard or home page
        } else {
          setError("Invalid response format");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid username or password");
      });
  };

  return (
    <div>
      <h2>Login</h2>
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
      <button className="btn btn-primary" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

export default StudentLogin;
