import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const CreateFeeRecord = () => {
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  const handleAddFeeRecord = () => {
    const data = {
      amount: amount,
      month: month,
      year: year,
    };

    axios
      .post(`http://localhost:5555/student/${id}/fee`, data)
      .then(() => {
        alert("Fee record added successfully");
        navigate(`/student/details/${id}`, { replace: true });
      })
      .catch((error) => {
        console.log(error);
        alert("Failed to add fee record. Please check the console.");
      });
  };

  return (
    <div className="container mt-4">
      <h1>Add Fee Record</h1>
      <form>
        <div className="mb-3">
          <label htmlFor="amount" className="form-label">
            Amount
          </label>
          <input
            type="text"
            className="form-control"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="month" className="form-label">
            Month
          </label>
          <select
            className="form-select"
            id="month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          >
            <option value="">Select Month</option>
            <option value="January">January</option>
            <option value="February">February</option>
            <option value="March">March</option>
            {/* Add other months here */}
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="year" className="form-label">
            Year
          </label>
          <select
            className="form-select"
            id="year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          >
            <option value="">Select Year</option>
            <option value="2022">2022</option>
            <option value="2023">2023</option>
            <option value="2024">2024</option>
            {/* Add other years here */}
          </select>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={handleAddFeeRecord}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default CreateFeeRecord;
