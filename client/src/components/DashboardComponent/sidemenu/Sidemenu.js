import React from "react";
import Logo_dark from "../../assets/Logo_dark.png";
import { Link, useNavigate } from "react-router-dom";
import RoundButton from "./RoundButton";
import "./sidemenu.css";
import { removeCookies } from "../../Cookies";

const Sidemenu = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeCookies();
    navigate("/");
  };
  return (
    <div>
      <div className="side">
        <Link to={"/dashboard"}>
          <img src={Logo_dark} alt="Logo" />
        </Link>
      </div>
      <div className="body">
        <h2
          className="font-bold ml-3"
          style={{ marginTop: "17px", fontSize: "20px" }}
        >
          <Link
            to="/joblist"
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <i className="fas fa-laptop-code"></i> Opportunities
          </Link>
        </h2>

        <h2
          className="font-bold ml-3"
          style={{ marginTop: "17px", fontSize: "20px" }}
        >
          <Link
            to="/contact-us"
            style={{
              textDecoration: "none",
              color: "inherit",
              cursor: "pointer",
            }}
          >
            <i className="fas fa-laptop-code"></i> Contact Us
          </Link>
        </h2>

        {<RoundButton text="Logout" onClick={handleLogOut} />}
      </div>
    </div>
  );
};

export default Sidemenu;
