import React from "react";
import "./index.css";
import Footer from "../../src/components/Footer";
import img1 from "../../src/images/img1.png";

import Button from "../../src/components/Button";
import Button2 from "../../src/components/Button2";

const Home = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      {/* <h1>Home</h1> */}
      <section class="container">
        <div class="left-half">
          <article>
            <img src={img1} alt="img" />
          </article>
        </div>
        <div class="right-half">
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
          <Button2> </Button2>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
