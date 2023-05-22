import React from "react";
import Footer from "../components/Footer/Footer";

const Contact = () => (
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
      className="contact"
    >
      <h1>Contact us</h1>
    </div>
    <Footer />
  </div>
);

export default Contact;
