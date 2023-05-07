import React from "react";
import "./index.css";
import Footer from "../components/Footer/Footer";
import homepage from "../images/homepage.png";
import Button from "../components/Buttons/Buttons";
import Cookies from "js-cookie";

const Home = () => {
  const theme=Cookies.get("theme");
  console.log(theme);
  return(
  <>
    <div
      className={`home-div`}
      // style={{
      //   display: "flex",
      //   justifyContent: "center",
      //   alignItems: "center",
      //   height: "100vh",
      //   marginTop: "100px",
      // }}
    >
      <section className="homeContainer">
        <div className={`left-half ${theme==='Dark'&&'dark-theme'}`}>
          <article>
            <img src={homepage} alt="img" />
          </article>
        </div>
        <div className="right-half">
          <h1 style={{ fontSize: 55 }}>
            hello unleash your talent potential with company name
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
    </div>
    <Footer />
  </>
  )
};

export default Home;
