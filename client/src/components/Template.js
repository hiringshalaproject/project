import React from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from 'react-router-dom';

const Template = ({ title, desc1, desc2, image, formtype}) => {
    const navigate = useNavigate();

    const handleButtonClick = () => {
      if (formtype === "signup") {
        navigate("/Login");
      } else {
        navigate("/Signup");
      }
    };
  

  return (
    <div className="flex justify-evenly items-start w-11/12 max-w-[1160px] pt-12 mx-auto gap-x-12 gap-y-0">
      <div className="w-11/12 max-w-[450px]">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-black font-semibold text-[1.875rem] leading-[2.375rem]">
            {title}
          </h1>
        </div>
        <p className="text-[1.125rem] leading[1.625rem] mt-1">
          <span className="text-slate-900 ">{desc1}</span>
          <br />
          <span className="text-blue-700 italic">{desc2}</span>
        </p>

        {formtype === "signup" ? (
          <SignupForm/>
        ) : (
          <LoginForm/>
        )}

        <div className="flex w-full items-center my-4 gap-x-2">
          <div className="w-full h-[1px] bg-slate-700"></div>
          <p className="text-slate-700 font-medium leading[1.375rem]">OR</p>
          <div className="w-full h-[1px] bg-slate-700"></div>
        </div>

        <div>
          <GoogleOAuthProvider clientId="553916619036-m3jrr0hhmltcr5rgcfjn52l2oq4r85sr.apps.googleusercontent.com">
            <GoogleLogin
              size="large"
              theme="filled_blue"
              type="standard"
              shape="rectangular"
              text="signin"
              logo_alignment="left"
              onSuccess={(credentialResponse) => {
                console.log(credentialResponse);
              }}
              onError={() => {
                console.log("Login Failed");
              }}
            />
          </GoogleOAuthProvider>
        </div>
      </div>

      <div className="relative">
        <div className="absolute top-0 right-0 mr-6 mt-0 flex gap-x-4">
        <p className="text-gray-500 text-sm mt-2">
            {formtype === "signup" ? "Already have an account ?" : "New here?"}
          </p>

          {formtype === "signup" ? (
            <button className="px-8 py-2 bg-teal-300 text-black rounded-tl-lg font-medium" onClick={handleButtonClick}>Login</button>
          ) : (
            <button className="px-4 py-2 bg-teal-600 text-white  rounded-tl-lg  font-medium" onClick={handleButtonClick}>
              Sign up
            </button>
          )}
         
        </div>
        <img
          src={image}
          alt="description"
          width={358}
          height={400}
          loading="lazy"
          className="ml-4 mt-14 gap-y-4"
        />
      </div>
    </div>
  )}
export default Template 