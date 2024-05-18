import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };
  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8 mx-auto text-center">
          <button className="btn btn-primary" onClick={handleLogout}>
            Log Out
          </button>
          <h1 className="mb-4">
            Welcome to the Student and Teacher Management System
          </h1>
          <p className="lead">
            Manage student and teacher records efficiently.
          </p>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Students</h5>
              <p className="card-text">Manage student records.</p>
              <Link to="/student/showAllStudents" className="btn btn-primary">
                View Students
              </Link>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Teachers</h5>
              <p className="card-text">Manage teacher records.</p>
              <Link to="/teacher/showAllTeachers" className="btn btn-primary">
                View Teachers
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
