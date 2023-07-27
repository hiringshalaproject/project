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
        marginTop: "100px",
      }}
      className="contact"
    >
      <h1>Contact us</h1>
    </div>
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        marginBottom: "50px",
        marginTop: "50px"
      }}
      className="contact"
    >
      {/* Contacts */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
        }}
      >
        <div>
          <strong>University/College associations</strong>
          <p>
            Email us:
            <a href="mailto:info@hiringshala.com">info@hiringshala.com</a>
          </p>
        </div>
        <div>
          <strong>Startups hiring</strong>
          <p>
            Email us:
            <a href="mailto:info@hiringshala.com">info@hiringshala.com</a>
          </p>
        </div>
        <div>
          <strong>Referrals</strong>
          <p>
            Email us:
            <a href="mailto:info@hiringshala.com">info@hiringshala.com</a>
          </p>
        </div>
        <div>
          <strong>For anything else</strong>
          <p>
            Email us:
            <a href="mailto:info@hiringshala.com">info@hiringshala.com</a>
          </p>
        </div>
      </div>


      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          marginTop: "30px"
        }}
      >
        <div>
          <h2>Address</h2>
          <p>123 Main Street, City, Country</p>
        </div>
      </div>
    </div>

    <Footer />
  </div>
);

export default Contact;
