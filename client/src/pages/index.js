import React from "react";
import Footer from "../components/Footer";
import FileUploader from "../components/FileUploader";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "90vh",
      }}
    >
      <h1>Homeeee</h1>
      <FileUploader />
      <Footer />
    </div>
  );
};

export default Home;
