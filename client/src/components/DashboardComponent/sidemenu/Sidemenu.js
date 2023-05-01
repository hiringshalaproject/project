import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";
import { FaLaptopCode } from "react-icons/fa";
import { RxDashboard } from "react-icons/rx";

import RoundButton from "./RoundButton";
import "./sidemenu.css";
const sidemenu = () => {
  const handleClick = () => {
    console.log("Button clicked!");
  };
  return (
    <div>
      <div className="side">
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className="body">
        <Link to="/dashboard" style={{ display: "flex" }}>
          <h2
            className="font-bold ml-2"
            style={{ marginTop: "20px", color: "#4164E3" }}
          >
            <RxDashboard />
            Dashboard
          </h2>
        </Link>
        <h2
          className="font-bold ml-3"
          style={{ marginTop: "17px", fontSize: "20px" }}
        >
          {" "}
          <FaLaptopCode />
          Opportunities
        </h2>

        <RoundButton text="Log Out" onClick={handleClick} />
      </div>
    </div>
  );
};

export default sidemenu;
