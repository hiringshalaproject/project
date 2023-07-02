import React from "react";
import Footer from "../components/Footer/Footer";
import { useNavigate } from "react-router-dom";


const About = () => {
const navigate = useNavigate();
function submitHandler(){
  navigate("/Description");
}
  return(
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
    }}
  >
    <div
      style={{
        flex: 1,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="about"
    >
    <div>
      <h1>About</h1>
      <button
      onClick={submitHandler}
      >
         Job Details
      </button>
      </div>
    </div>
    <Footer />
  </div>
  );
    };

export default About;