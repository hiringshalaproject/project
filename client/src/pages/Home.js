import React from "react";
import "./index.css";
import Footer from "../components/Footer/Footer";
import homepage from "../images/homepage.png";
import Button from "../components/Buttons/Buttons";
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => (
  <>
    <Container className="mt-5">
      <Row className="justify-content-center align-items-center">
        <Col xl={6} lg={6} md={6} sm={6}>
          <article>
            <img src={homepage} alt="img" className="img-fluid" />
          </article>
        </Col>
        <Col xl={6} lg={6} md={6} sm={6} className="px-4">
          <h1 style={{ fontSize: "4vw" }} className="font-bold">
            unleash your talent potential with company name
          </h1>
          <p style={{ fontSize: "1.8vw" }} className="lg:ml-26 md:ml-32 sm:ml-20 xs:ml-0 font-normal ">
            the largest pool of career opportunities that match your skill set.
            link up with outstanding people to create a better future.
          </p>
          
          <Button/>
        </Col>
      </Row>
    </Container>
    <Footer />
  </>
);


export default Home;