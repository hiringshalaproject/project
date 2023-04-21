import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import FileUploader from "./FileUploader/FileUploader";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  function submitHandler(event) {
    event.preventDefault();
    toast.success("Logged In");
    navigate("/Dashboard");
  }

  return (
    <form onSubmit={submitHandler} className="flex flex-col w-full gap-y-4 mt-6">
      <label className="w-full">
        <p className="text-[0.875rem] text-slate-600 mb-1 leading-[1.375rem]">
          Email Address<sup className="text-red-700">*</sup>
        </p>
        <input
          required
          type="email"
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter Email address"
          name="email"
          className="outline-none border-b-[1px] border-black text-black w-full p-[10px]"
        />
      </label>

      <label className="w-full relative">
        <p className="text-[0.875rem] text-slate-600 mb-1 leading-[1.375rem]">
          Password<sup className="text-red-700">*</sup>
        </p>
        <input
          required
          name="password"
          type={showPassword ? "text" : "password"}
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          className="outline-none border-b-[1px] border-black text-black w-full p-[10px]"
        />

        <span
          className="absolute right-3 top-[38px] cursor-pointer"
          onClick={() => setShowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#000000" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#000000" />
          )}
        </span>

        <Link to="#">
          <p className="text-xs mt-1 text-blue-900 font-semibold max-w-max ml-auto">
            Forgot Password ?
          </p>
        </Link>
      </label>

      <FileUploader />

      <button className="w-52 h-[40px] bg-teal-300 rounded-[8px] font-medium text-black mt-6">
        Login
      </button>

      <Link to="#">
        <p className="text-xs mt-1 text-blue-900 font-semibold max-w-max ml-auto">
          Forgot Password ?
        </p>
      </Link>
    </form>
  );
};

export default LoginForm;
