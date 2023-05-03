import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { setCookies } from "./Cookies";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

const SignupForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    seekerEmail: "",
    password: "",
    confirmPassword: "",
    otp: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isOtpSent, setOtpSent] = useState(false);
  const [isOtpVerified, setOtpVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verifyOtpLoading, setverifyOtpLoading] = useState(false);
  function changeHandler(event) {
    setFormData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }

  const sendOtpHandler = () => {
    // send the email input to the server to initiate sending OTP
    setLoading(true);
    axios
      .post(`${apiUrl}/api/v1/otp/send`, { email: formData.seekerEmail })
      .then((response) => {
        // alert("OTP sent successfully!");
        setOtpSent(true);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        alert("Failed to send OTP. Please try again.");
        setLoading(false);
      });
  };

  const verifyOtpHandler = () => {
    setverifyOtpLoading(true);
    axios
      .post(`${apiUrl}/api/v1/otp/verify`, {
        email: formData.seekerEmail,
        otp: formData.otp,
      })
      .then((response) => {
        // alert("OTP Verified successfully!");
        setOtpVerified(true);
        setverifyOtpLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setverifyOtpLoading(false);
        alert("Failed to verify OTP. Please try again.");
      });
  };
  function submitHandler(event) {
    event.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    axios
      .post(`${apiUrl}/api/v1/seekers`, {
        seekerName: formData.firstName + formData.lastName,
        seekerEmail: formData.seekerEmail,
        password: formData.password,
      })
      .then((response) => {
        setCookies(
          formData.firstName + " " + formData.lastName,
          "seeker",
          response.data._id
        );
        toast.success("Account Created");
        navigate(`/dashboard`);
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  }

  return (
    <div>
      <form onSubmit={submitHandler}>
        {/*First Name & Last Name */}
        <div className="flex  gap-x-6">
          <label className="w-full">
            <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem]">
              First Name<sup className="text-red-700">*</sup>
            </p>
            <input
              required
              type="text"
              name="firstName"
              onChange={changeHandler}
              placeholder="Enter first name"
              value={formData.firstName}
              className="outline-none border-b-[1px] border-black text-black w-full p-[2px]"
            />
          </label>

          <label className="w-full">
            <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem]">
              Last Name<sup className="text-red-700">*</sup>
            </p>
            <input
              required
              type="text"
              name="lastName"
              onChange={changeHandler}
              placeholder="Enter last name"
              value={formData.lastName}
              className="outline-none border-b-[1px] border-black text-black w-full p-[2px]"
            />
          </label>
        </div>
        {/*Email address*/}
        <div>
          <label className="w-full">
            <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem]">
              Email Address<sup className="text-red-700">*</sup>
            </p>
            <div className="flex items-center">
              <input
                required
                type="seekerEmail"
                name="seekerEmail"
                onChange={changeHandler}
                placeholder="Enter Email Address"
                value={formData.seekerEmail}
                className={`outline-none border-b-[1px] ${
                  isOtpVerified ? "bg-gray-200" : "border-black"
                } text-black w-full p-[2px] pr-6`}
                readOnly={isOtpVerified}
              />
              {isOtpVerified && (
                <span className="text-gray-500 ml-2">&#10004;</span>
              )}
            </div>
          </label>
          {formData.seekerEmail && !isOtpVerified && (
            <>
              {isOtpSent ? (
                <>
                  <label className="w-full">
                    <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem]">
                      OTP<sup className="text-red-700">*</sup>
                    </p>
                    <input
                      required
                      type="text"
                      name="otp"
                      onChange={changeHandler}
                      placeholder="Enter OTP"
                      value={formData.otp}
                      className="outline-none border-b-[1px] border-black text-black w-full p-[2px]"
                    />
                  </label>
                  <button
                    onClick={verifyOtpHandler}
                    className={
                      verifyOtpLoading
                        ? "w-50 h-[40px] bg-teal-400 rounded-[8px] font-medium text-white mt-6 cursor-wait"
                        : "w-28 h-[35px] bg-teal-600 rounded-[8px] font-medium text-white mt-6"
                    }
                    disabled={verifyOtpLoading}
                  >
                    {verifyOtpLoading ? "Verifying OTP..." : "Verify OTP"}
                  </button>
                </>
              ) : (
                <button
                  onClick={sendOtpHandler}
                  className={
                    loading
                      ? "w-50 h-[40px] bg-blue-200 rounded-[8px] font-medium text-white mt-6 cursor-wait"
                      : "w-28 h-[35px] bg-blue-500 rounded-[8px] font-medium text-white mt-6"
                  }
                  disabled={loading}
                >
                  {loading ? "Sending OTP..." : "Send OTP"}
                </button>
              )}
            </>
          )}
        </div>

        {/*Create Password & Confirm Password */}

        <div className="flex gap-x-6">
          <label className="relative w-full">
            <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem]">
              Create Password<sup className="text-red-700">*</sup>
            </p>
            <input
              required
              type={showPassword ? "text" : "password"}
              name="password"
              onChange={changeHandler}
              placeholder="Enter Password"
              value={formData.password}
              className="outline-none border-b-[1px] border-black text-black w-full p-[2px]"
            />

            <span
              className="absolute right-1 top-[45px] cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#000000" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#000000" />
              )}
            </span>
          </label>

          <label className="relative w-full">
            <p className="text-[0.875rem] text-slate-600 mb-1 mt-4 leading-[1.375rem]">
              Confirm Password<sup className="text-red-700">*</sup>
            </p>
            <input
              required
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              onChange={changeHandler}
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              className="outline-none border-b-[1px] border-black text-black w-full p-[2px]"
            />

            {
              <span
                className="absolute right-1 top-[45px]  cursor-pointer"
                onClick={() => setShowConfirmPassword((prev) => !prev)}
              >
                {showConfirmPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#000000" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#000000" />
                )}
              </span>
            }
          </label>
        </div>
        <button
          className={`w-52 h-[40px] rounded-[8px] font-medium text-white mt-6 bg-teal-600 ${
            isOtpVerified ? "cursor-pointer" : "cursor-not-allowed"
          }`}
          disabled={!isOtpVerified}
          onMouseOver={(e) => {
            if (!isOtpVerified) {
              e.currentTarget.style.backgroundColor = "#b3e6cc";
              e.currentTarget.style.cursor = "not-allowed";
            }
          }}
          onMouseOut={(e) => {
            if (!isOtpVerified) {
              e.currentTarget.style.backgroundColor = "#e0e0e0";
              e.currentTarget.style.cursor = "default";
            }
          }}
        >
          Create Account
        </button>
      </form>
    </div>
  );
};

export default SignupForm;
