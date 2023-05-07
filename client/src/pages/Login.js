import React from "react";
import Template from "../components/Template";
import LoginImg from "../components/assets/Login.jpg";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

const Login = () => {
  const isLoggedIn =
    Cookies.get("userId") !== undefined && Cookies.get("userId") !== "";

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <Template
      title="Welcome Back"
      desc1="Skill seekho chahe jahaan se.."
      desc2="Job milega yha se..."
      image={LoginImg}
      formtype="login"
    />
  );
};

export default Login;
