import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";


const SignupForm = ({setIsLoggedIn}) => {
    const  navigate = useNavigate(); 

    const [formData, setFormData] = useState({
        firstName:"",
        lastName:"",
        email:"",
        password:"",
        confirmPassword:"",
    })

    const [showPassword, setShowPassword] = useState(false);
    function changeHandler(event) {

      setFormData( (prevData) =>(
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ))
     }

     function submitHandler(event) {
          event.preventDefault();
          if(formData.password !== formData.confirmPassword) {
            toast.error("Passwords do not match");
            return;
          }

          setIsLoggedIn(true);
          toast.success("/Account Created");
          navigate("/Dashboard");
     }

    return (
        <div>
          <form onSubmit={submitHandler}>
             {/*First Name & Last Name */}
          <div className="flex  gap-x-6">
          <label className="w-full">
                <p className='text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem]'>First Name<sup  className='text-red-700'>*</sup></p>
                <input
                    required
                    type="text"
                    name="firstName"
                    onChange={changeHandler}
                    placeholder="Enter first name"
                    value={formData.firstName}
                    className='outline-none border-b-[1px] border-black text-black w-full p-[2px]'
                />
            </label>

            <label className="w-full">
                <p className='text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem]'>Last Name<sup  className='text-red-700'>*</sup></p>
                <input
                    required
                    type="text"
                    name="lastName"
                    onChange={changeHandler}
                    placeholder="Enter last name"
                    value={formData.lastName}
                    className='outline-none border-b-[1px] border-black text-black w-full p-[2px]'
                />
            </label>
          </div>
               {/*Email address*/}
          <label className="w-full">
                <p className='text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem]'>Email Address<sup  className='text-red-700'>*</sup></p>
                <input
                    required
                    type="email"
                    name="email"
                    onChange={changeHandler}
                    placeholder="Enter Email Address"
                    value={formData.email}
                    className='outline-none border-b-[1px] border-black text-black w-full p-[2px]'
                />
            </label>

            {/*Create Password & Confirm Password */}

            <div className="flex gap-x-6">
            <label className="relative w-full">
                <p className='text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem]'>Create Password<sup  className='text-red-700'>*</sup></p>
                <input
                    required
                    type={showPassword ? ("text") : ("password")}
                    name="password"
                    onChange={changeHandler}
                    placeholder="Enter Password"
                    value={formData.password}
                    className='outline-none border-b-[1px] border-black text-black w-full p-[2px]'
                />

            <span 
            className='absolute right-1 top-[45px] cursor-pointer'
            onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ?

                 (<AiOutlineEyeInvisible fontSize={24} fill="#000000"/>) : 

                 (<AiOutlineEye fontSize={24} fill="#000000"/>)}
            </span>
            </label>

            <label className="relative w-full">
                <p className='text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem]'>Confirm Password<sup  className='text-red-700'>*</sup></p>
                <input
                    required
                    type={showPassword ? ("text") : ("password")}
                    name="confirmPassword"
                    onChange={changeHandler}
                    placeholder="Confirm Password"
                    value={formData.confirmPassword}
                    className='outline-none border-b-[1px] border-black text-black w-full p-[2px]'
                />

            { <span
            className='absolute right-1 top-[45px]  cursor-pointer'
             onClick={() => setShowPassword((prev) => !prev)}>
                {showPassword ?

                 (<AiOutlineEyeInvisible fontSize={24} fill="#000000"/>) : 

                 (<AiOutlineEye fontSize={24} fill="#000000"/>)}
            </span> }
            </label>
            </div>
            <button  className='w-52 h-[40px] bg-teal-600 rounded-[8px] font-medium text-white mt-6'>
                Create Account
            </button>
          </form>



        </div>
    )
}

export default SignupForm