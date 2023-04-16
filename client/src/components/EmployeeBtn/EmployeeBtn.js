import React from "react";

const buttonStyle1 = {
  display: "flex-row",
  justifycontent: "space-between",
  background: "#A8DBD9",
  padding: "10 22",
  borderRadius: "0px 0px 20px 0px",
  margin: 20,
  // color: #fff;
  height: 50,
  width: 240,
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
};

const EmployeeBtn = ({ label, handleClick }) => (
  <button
    className="btn btn-default"
    style={buttonStyle1}
    onClick={handleClick}
  >
    {label} I’m an Employee
  </button>
);

export default EmployeeBtn;
