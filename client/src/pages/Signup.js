import React from "react";
import Template from "../components/Template";
import SignupImg from "../components/assets/Signup.png";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Signup = (props) => {
  const isLoggedIn =
    Cookies.get("hiringShala_userId") !== undefined && Cookies.get("hiringShala_userId") !== "";

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
      userType={props.userType}
    />
  );
};

export default Signup;
