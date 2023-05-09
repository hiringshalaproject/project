import React from "react";
import PropTypes from "prop-types";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { toast } from "react-hot-toast";
import { setCookies, getCookies } from "./Cookies";
import Footer from "./Footer/Footer";
import { MDBContainer, MDBCol, MDBRow, MDBBtn } from "mdb-react-ui-kit";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

const Template = ({ title, desc1, desc2, image, formtype, userType }) => {
  const navigate = useNavigate();
  const handleButtonClick = () => {
    if (formtype === "signup") {
      navigate("/" + userType + "/login");
    } else {
      navigate("/" + userType + "/signup");
    }
  };

  const handleGoogleLogin = (credentialResponse) => {
    const decodedToken = jwt_decode(credentialResponse.credential);
    const userData =
      userType === "seeker"
        ? {
            type: userType,
            seekerName: decodedToken.name,
            email: decodedToken.email,
            resumeUrl: "",
            isGoogleLogin: true,
          }
        : {
            type: userType,
            employeeName: decodedToken.name,
            email: decodedToken.email,
            isGoogleLogin: true,
          };

    // Set the Authorization header with the Google access token
    const config = {
      headers: { Authorization: `Bearer ${credentialResponse.credential}` },
    };
    const apiUrlSecondary =
      userType === "seeker"
        ? "/api/v1/seekers/login"
        : "/api/v1/employees/login";
    // Send the user data to the server-side API
    axios
      .post(`${apiUrl + apiUrlSecondary}`, userData, config)
      .then((res) => {
        let userName =
          userType === "seeker"
            ? res.data.seeker.seekerName
            : res.data.employee.employeeName;
        let userId =
          userType === "seeker" ? res.data.seeker._id : res.data.employee._id;
        setCookies(userName, userType, userId);
        ({ userName, userType, userId } = getCookies());
        if (userId && userName && userType) {
          toast.success("Logged In");
          navigate("/dashboard");
        } else {
          toast.error("Unable to Log In");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.msg);
      });
  };

  const handleGoogleLoginError = () => {
    toast.error("Unable to Log In");
  };

  return (
    <>
      <div>
        <MDBContainer fluid className="p-3 mt-20">
          <MDBRow center>
            <MDBCol size="4">
              <img src={image} class="img-fluid" />
            </MDBCol>

            <MDBCol col="4" md="6">
              <div className="d-flex flex-row align-items-center justify-content-center justify-content-lg-end mt-4">
                <p className="lead fw-normal mb-0 me-3">
                  {formtype === "signup" ? "existing user?" : "new here?"}
                </p>
                <button
                  className="login-btn font-medium text-white col-sm-2 col-lg-3 ms-0 mx-lg-3"
                  style={{ borderRadius: "20px 0px 0px 0px" }}
                  onClick={handleButtonClick}
                >
                  {formtype === "signup" ? "Login" : "Sign Up"}
                </button>
              </div>

              <MDBContainer>
                <h1 className="text-black font-semibold text-[1.875rem] leading-[2.375rem] mt-8">
                  {title}
                </h1>
                <p className="text-[1.125rem] leading[1.625rem] mt-2">
                  <span className="text-slate-900 italic">{desc1}</span>
                  <br />
                  <span className="text-slate-900 italic">{desc2}</span>
                </p>
              </MDBContainer>
              {formtype === "signup" ? (
                <SignupForm userType={userType} />
              ) : (
                <LoginForm userType={userType} />
              )}
              <div className="my-5">
                <GoogleOAuthProvider clientId="894607433354-muue271qb4t1mvdo8evk95i896nhdt9i.apps.googleusercontent.com">
                  <GoogleLogin
                    size="large"
                    theme="filled_blue"
                    type="standard"
                    shape="rectangular"
                    text="signin"
                    logo_alignment="left"
                    onSuccess={handleGoogleLogin}
                    onError={handleGoogleLoginError}
                  />
                </GoogleOAuthProvider>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </div>
      <Footer />
    </>
  );
};
Template.propTypes = {
  title: PropTypes.string.isRequired,
  desc1: PropTypes.string.isRequired,
  desc2: PropTypes.string,
  image: PropTypes.string,
  formtype: PropTypes.string.isRequired,
  userType: PropTypes.string.isRequired,
};
export default Template;
