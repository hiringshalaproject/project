import React from "react";
import Template from "../components/Template";
import LoginImg from "../components/assets/LoginImg.png";

const Login = () => {
    return (
        <Template
            title="Welcome Back"
            desc1="Skill seekho chahe jahaan se.."
            desc2="Job milega yha se..."
            image={LoginImg}
            formtype="login"
        />
    )
}

export default Login