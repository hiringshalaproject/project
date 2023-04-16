import React from "react";

const buttonStyle = {
  display: "flex-row",
  justifycontent: "space-between",
  background: "#2F8F9D",
  padding: "10 22",
  borderRadius: "20px 0px 0px 0px",
  margin: 20,
  // color: #fff;
  height: 50,
  width: 240,
  cursor: "pointer",
  transition: "all 0.2s ease-in-out",
};

const JobSeekerBtn = ({ label, handleClick }) => (
  <button className="btn btn-default" style={buttonStyle} onClick={handleClick}>
    {label} I’m a Job Seeker
  </button>
);

export default JobSeekerBtn;
