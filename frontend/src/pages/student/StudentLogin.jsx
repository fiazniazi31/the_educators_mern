import React, { useState } from "react";
import axios from "axios";

const StudentLogin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    console.log({ username, password });
    axios
      .post("http://localhost:5555/student/login", { username, password })
      .then((response) => {
        // Check if the response contains userId and userType
        if (response.data.userId && response.data.userType === "studnet") {
          // Store the logged-in student's ID in localStorage
          localStorage.setItem("userId", response.data.userId);

          // Replace the current URL and clear the history stack
          window.location.replace("/studnet/home");
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
    <div className="d-flex flex-column align-items-center justify-content-center">
      <div className="w-100" style={{ maxWidth: "400px" }}>
        <h2 className="text-center">Student Login</h2>
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

export default StudentLogin;
