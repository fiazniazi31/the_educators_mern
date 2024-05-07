import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ManageFee = () => {
  const { id } = useParams();
  const [months, setMonths] = useState([]);
  const [fees, setFees] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5555/student/${id}/fee`
      );
      setMonths(response.data.months);
      setFees(response.data.fees);
    } catch (error) {
      console.error("Error fetching fee records:", error);
    }
  };

  const handleSave = async () => {
    try {
      await axios.post(`http://localhost:5555/student/${id}/fee`, { fees });
      alert("Fee records saved successfully");
    } catch (error) {
      console.error("Error saving fee records:", error);
    }
  };

  const handleInputChange = (index, value) => {
    const newFees = [...fees];
    newFees[index] = value;
    setFees(newFees);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Manage Fee Records</h1>
      {months.map((month, index) => (
        <div key={index} className="mb-3">
          <label>{month}</label>
          <input
            type="number"
            className="form-control"
            placeholder="Enter fee amount"
            value={fees[index] || ""}
            onChange={(e) => handleInputChange(index, e.target.value)}
          />
        </div>
      ))}
      <button className="btn btn-primary" onClick={handleSave}>
        Save
      </button>
    </div>
  );
};

export default ManageFee;
