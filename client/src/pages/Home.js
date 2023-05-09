import React from "react";
import "./index.css";
import Footer from "../components/Footer/Footer";
import homepage from "../images/homepage.png";
import Button from "../components/Buttons/Buttons";
import Cookies from "js-cookie";
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  const theme=Cookies.get("theme");
  console.log("theme",theme);
  
  return(
  <>
    <Container className={`mt-5 home-div ${theme==='dark'&&'dark-theme'}`}>
      <Row className="justify-content-center align-items-center dark-theme">
        <Col lg={6}>
          <article>
            <img src={homepage} alt="img" className="img-fluid" />
          </article>
        </Col>
        <Col lg={6}>
          <h1 className="mb-4">
            unleash your talent potential with company name
          </h1>
          <p className=" md:ml-64 sm:ml-0 text-sm md:text-base mt-4 md:mt-8">
            the largest pool of career opportunities that match your skill set.
            link up with outstanding people to create a better future.
          </p>

          <Button />
        </Col>
      </Row>
    </Container>
    <Footer />
  </>
  )
};

export default Home;
