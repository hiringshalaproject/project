import React from "react";
import Footer from "../components/Footer/Footer";

const About = () => (
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
      <h1>About</h1>
    </div>
    <Footer />
  </div>
);

export default About;