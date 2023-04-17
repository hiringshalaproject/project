import React from "react";
import { useNavigate } from "react-router-dom";

const buttonStyle = {
  display: "flex-row",
  justifycontent: "space-between",
  background: "#2F8F9D",
  padding: "10 22",
  borderRadius: "20px 0px 0px 0px",
  margin: 20,
  height: 50,
  width: 240,
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
};

const buttonStyle1 = {
  display: "flex-row",
  justifycontent: "space-between",
  background: "#A8DBD9",
  padding: "10 22",
  borderRadius: "0px 0px 20px 0px",
  margin: 20,
  height: 50,
  width: 240,
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
};

const Button = ({ label, to }) => {
  const navigate = useNavigate();
  return (
    <button
      className="btn btn-default"
      style={buttonStyle}
      onClick={() => navigate(to)}
    >
      {label}
    </button>
  );
};

const Button2 = ({ label, to }) => {
  const navigate = useNavigate();
  return (
    <button
      className="btn btn-default"
      style={buttonStyle1}
      onClick={() => navigate(to)}
    >
      {label}
    </button>
  );
};

const buttonContainerStyle = {
  display: "flex",
  alignItems: "center",
};


const buttonRow = () => {
  return (
      <div style={buttonContainerStyle} >
      <Button label="I'm a Job Seeker" to="/login" />
      <Button2 label="I'm an Employee"/>
    </div>
  );
};

export default buttonRow;
