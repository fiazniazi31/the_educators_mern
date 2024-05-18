import React, { useState } from "react";
import axios from "axios";

const CreateAdmin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleCreateAdmin = () => {
    axios
      .post("http://localhost:5555/admin/createAdmin", { username, password })
      .then((response) => {
        setMessage(response.data.message);
      })
      .catch((error) => {
        setMessage("An error occurred. Please try again later.");
      });
  };

  return (
    <div>
      <h2>Create Admin</h2>
      {message && <div className="alert alert-info">{message}</div>}
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
      <button className="btn btn-primary" onClick={handleCreateAdmin}>
        Create Admin
      </button>
    </div>
  );
};

export default CreateAdmin;
