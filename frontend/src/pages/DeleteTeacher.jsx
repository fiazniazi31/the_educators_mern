import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteTeacher = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const handleDeleteTeacher = () => {
    setLoading(true);
    axios
      .delete(`http://localhost:5555/teacher/${id}`)
      .then(() => {
        setLoading(false);
        navigate("/home");
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
        alert("Please Check Colsole");
      });
  };

  return (
    <div>
      <BackButton />
      <h1>Delete Teacher</h1>
      {loading ? <Spinner /> : ""}
      <div>
        <div>
          <h3>Are you sure to delete the student?</h3>
          <div className="d-grid gap-2 col-6 mx-auto">
            <button
              className="btn btn-primary"
              type="button"
              onClick={handleDeleteTeacher}
            >
              Yes, Delete it
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteTeacher;
