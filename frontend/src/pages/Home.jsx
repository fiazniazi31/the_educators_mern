import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-4">
      <h1>Welcome to the Student and Teacher Management System</h1>
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
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
          <div className="card">
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
