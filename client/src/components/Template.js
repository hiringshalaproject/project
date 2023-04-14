import React from "react";
import SignupForm from "./SignupForm"
import LoginForm from "./LoginForm";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";

const Template = ({title, desc1, desc2,image, formtype, setIsLoggedIn}) => {
     
    return (
        <div className='flex justify-evenly items-center w-11/12 max-w-[1160px] pt-[12px] mx-auto gap-x-12 gap-y-0'>

            <div className="w-11/12 max-w-[450px]">
                <h1
                className='text-black font-semibold text-[1.875rem] leading-[2.375rem]'
                >{title}</h1>
                <p className='text-[1.125rem] leading[1.625rem] mt-1'>
                    <span className='text-slate-900 '>{desc1}</span>
                    <br/>
                    <span className='text-blue-700 italic'>{desc2}</span>
                </p>

                {formtype==="signup" ?
                (<SignupForm setIsLoggedIn={setIsLoggedIn}/>):
                (<LoginForm setIsLoggedIn={setIsLoggedIn}/>)}

                <div className='flex w-full items-center my-4 gap-x-2'>
                    <div className='w-full h-[1px] bg-slate-700'></div>
                    <p className='text-slate-700 font-medium leading[1.375rem]'
                    >OR</p>
                    <div className='w-full h-[1px] bg-slate-700'></div>
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
                      onSuccess={credentialResponse => {
                        console.log(credentialResponse);
                      }}
                      onError={() => {
                        console.log('Login Failed');
                      }}
                    />
                 </GoogleOAuthProvider>
                </div>

            </div>

            <div>
                <img src={image}
                   alt="description"
                width={358}
                height={530}
                loading="lazy"/>
            </div>

        </div>
    )
}

export default Template