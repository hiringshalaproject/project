import React from "react";
import Template from "../components/Template";
import SignupImg from "../components/assets/SignupImg.png";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Signup = () => {
  const isLoggedIn =
    Cookies.get("userId") !== undefined && Cookies.get("userId") !== "";

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <Template
      title="Personal Details"
      desc1="Skill seekho chahe jahaan se.."
      desc2="Job milega yha se..."
      image={SignupImg}
      formtype="signup"
    />
  );
};

export default Signup;
