import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";

const BackButton = ({ destination = "/" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(destination, { replace: true });
  };

  return (
    <div>
      <Link
        to={destination}
        // style={{
        //   backgroundColor: "skyblue",
        //   color: "white",
        //   padding: "5px 10px",
        //   borderRadius: "5px",
        //   fontSize: "1.5rem",
        // }}
        className="btn btn-primary"
      >
        {/* <BsArrowLeft /> */}
        Home
      </Link>
    </div>
  );
};

export default BackButton;
