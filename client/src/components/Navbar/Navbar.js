import React from "react";
import { Nav, NavLink, Bars, NavMenu } from "./NavbarElements";
import { toast } from "react-hot-toast";

const Navbar = (props) => {
  let isLoggedIn = props.isLoggedIn;
  let setIsLoggedIn = props.setIsLoggedIn;
  const activeLinkStyle = { fontWeight: "bold", color: "light-blue" };

  return (
    <div>
      <Nav>
        <NavLink to="/">
          <img src={require("../../images/logo.svg")} alt="logo" />
        </NavLink>
        <Bars />
        <NavMenu>
          <NavLink to="/about" style={activeLinkStyle}>
            About
          </NavLink>
          <NavLink to="/platform" style={activeLinkStyle}>
            Platform
          </NavLink>
          <NavLink to="/contact-us" style={activeLinkStyle}>
            Contact Us
          </NavLink>
          <NavLink to="/dashboard" style={activeLinkStyle}>
            Dashboard
          </NavLink>
        </NavMenu>
      </Nav>

      <div className="flex items-center gap-x-4">
        {!isLoggedIn && (
          <NavLink to="/login">
            <button className="bg-richblack-800 text-white rounded-tl-lg bg-teal-600 py-[8px] px-[12px] border border-b-slate-900">
              Login
            </button>
          </NavLink>
        )}

        {!isLoggedIn && (
          <NavLink to="/signup">
            <button className="bg-richblack-800 text-white rounded-tr-lg bg-teal-600  py-[8px] px-[12px] border border-b-slate-900">
              Sign Up
            </button>
          </NavLink>
        )}

        {isLoggedIn && (
          <NavLink to="/">
            <button
              onClick={() => {
                setIsLoggedIn(false);
                toast.success("Logged Out");
              }}
              className="bg-richblack-800 text-slate-700  py-[8px] px-[12px] rounded-[8px] border border-b-slate-900"
            >
              Logout
            </button>
          </NavLink>
        )}

        {isLoggedIn && (
          <NavLink to="/Dashboard">
            <button className="bg-richblack-800 text-slate-700  py-[8px] px-[12px] rounded-[8px] border border-b-slate-900">
              Dashboard
            </button>
          </NavLink>
        )}
      </div>
    </div>
  );
};

export default Navbar;
