import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";
import { setCookies, getCookies } from "./Cookies";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
const LoginForm = ({ userType }) => {
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
  const apiUrlSecondary =
    userType === "seeker" ? "/api/v1/seekers/login" : "/api/v1/employees/login";
  function submitHandler(event) {
    event.preventDefault();
    axios
      .post(`${apiUrl + apiUrlSecondary}`, formData)
      .then((res) => {
        toast.success("Logged In");
        let userName =
          userType === "seeker"
            ? res.data.seeker.seekerName
            : res.data.employee.employeeName;
        let userId =
          userType === "seeker" ? res.data.seeker._id : res.data.employee._id;
        setCookies(userName, userType, userId);
        ({ userName, userType, userId } = getCookies());
        navigate("/dashboard");
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  }

  return (
    <form
      onSubmit={submitHandler}
      className="flex flex-col w-full gap-y-4 mt-6"
    >
      <label className="w-full">
        <MDBContainer>
          <p className="text-[0.875rem] text-slate-600 mb-1 leading-[1.375rem] loginText">
            Email Address<sup className="text-red-700">*</sup>
          </p>
          <input
            required
            type="email"
            value={formData.email}
            onChange={changeHandler}
            placeholder="Enter Email address"
            name="email"
            className="outline-none border-b-[1px] border-black w-full pt-[10px] border-bottom-color bg-transparent "
          />
        </MDBContainer>
      </label>

      <label className="w-full relative">
        <MDBContainer>
          <MDBRow>
            <p className="text-[0.875rem] text-slate-600 mb-1 leading-[1.375rem] loginText  ">
              Password<sup className="text-red-700">*</sup>
            </p>
            <MDBCol size="md" className="col-lg-8 col-xxl-8">
              <input
                required
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={changeHandler}
                placeholder="Enter Password"
                className="outline-none border-b-[1px] w-full pt-[10px] loginText loginInput border-bottom-color bg-transparent"
              />

              <span
                className="absolute mt-2  cursor-pointer"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="eye-icon" />
                ) : (
                  <AiOutlineEye className="eye-icon" />
                )}
              </span>
            </MDBCol>
            <MDBCol size="md mt-4 mt-lg-0" className="col-lg-4 col-xxl-4">
              <button className="h-[40px] bg-teal-300 rounded-[12px] font-medium text-black col-12 col-lg-10 ms-0 mx-lg-5">
                Login
              </button>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
        <MDBContainer>
          <Link to="#">
            <p className="float-left mt-1  font-regular max-w-max ml-auto loginPasswordText">
              Forgot Password?
            </p>
          </Link>
        </MDBContainer>
      </label>
    </form>
  );
};

export default LoginForm;
