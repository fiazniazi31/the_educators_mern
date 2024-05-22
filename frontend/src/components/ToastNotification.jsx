import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";

const ToastAlert = ({ show, onClose, message, studentName, type }) => {
  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        bg={type === "success" ? "success" : "dark"}
        onClose={onClose}
        show={show}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">Attendance</strong>
        </Toast.Header>
        <Toast.Body>
          <span style={{ fontWeight: "bold", color: "white" }}>
            {studentName}'s
          </span>
          {" - "}
          <span style={{ color: "white" }}>{message}</span>
        </Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastAlert;
