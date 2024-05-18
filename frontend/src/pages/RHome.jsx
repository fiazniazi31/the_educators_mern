import React from "react";
import { Link } from "react-router-dom";

const RootHome = () => {
  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-body">
              <h3 className="text-center mb-4">Login Options</h3>
              <div className="d-grid gap-3">
                <Link to="/AdminLogin" className="btn btn-primary btn-lg">
                  Admin Login
                </Link>
                <Link to="/login" className="btn btn-success btn-lg">
                  Teacher Login
                </Link>
                <Link to="/StudentLogin" className="btn btn-info btn-lg">
                  Student Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RootHome;
