import React from "react";
import "./index.css";
import Footer from "../../src/components/Footer/Footer";
import homepage from "../../src/images/homepage.png";
import Button from "../../src/components/Buttons/Buttons";




const Home = () => {
  
  return (
    <>
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <section className="container">
      
        <div className="left-half">
          <article>
            <img src={homepage} alt="img" />
          </article>
        </div>
        <div className="right-half">
          <h1 style={{ fontSize: 60 }}>
            unleash your talent potential with company name
          </h1>
          <p
            style={{
              textAlign: "left",
              width: 200,
              marginLeft: 350,
              fontsize: 25,
            }}
          >
            the largest pool of career opportunities that match your skill set.
            link up with outstanding people to create a better future.
          </p>

          <Button />
        </div>
      </section>
      <Footer />
    </div>
    </>
  );
};

export default Home;
