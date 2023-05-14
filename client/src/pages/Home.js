import React from "react";
import "./index.css";
import Footer from "../components/Footer/Footer";
// import homepage from "../images/homepage.png";
import Button from "../components/Buttons/Buttons";
// import Cookies from "js-cookie";
import { Container, Row, Col } from "react-bootstrap";
import HomeImg from "../components/assets/home-page-img.jpg";
import ApplyImg from "../components/assets/apply-for-referral.jpg";
import ContactImg from "../components/assets/contact-us.jpg";
import SearchJob from "../components/assets/job-search.jpg";

const Home = () => {
  const renderCard = (cardTitle, buttonValue, ImgSrc) => {
    return (
      <>
        <div
          className="card h-100"
          style={{
            width: "20rem"
          }}
        >
          <img src={ImgSrc}></img>
          <div className="card-body">
            <h3 className="card-title content">{cardTitle}</h3>
            <p className="card-text content">
              the largest pool of career opportunities that match your skill
              set. link up with outstanding people to create a better future.
            </p>
          </div>
          <button type="submit" className="btn card-button">
            {buttonValue}
          </button>
        </div>
      </>
    );
  };

  return (
    <>
      <Container fluid>
        <Row>
          <Col className="container-col">
            <img src={HomeImg} alt="img"></img>
          </Col>
          <Col className="container-col text">
            <Row>
              <h1 className="mb-4">
                Unleash your potential with HiringShala
              </h1>
              <p>
                the largest pool of career opportunities that match your skill
                set. link up with outstanding people to create a better
                future.the largest pool of career opportunities that match your
                skill set. link up with outstanding people to create a better
                future.
              </p>
            </Row>
            <Row className="buttons">
              <Button />
            </Row>
          </Col>
        </Row>
      </Container>
        <Container className="card-container">
          <Row>
            <Col>{renderCard("Search Job", "Search", SearchJob)}</Col>
            <Col>{renderCard("Apply for Referrals", "Apply", ApplyImg)}</Col>
            <Col>{renderCard("Chat Support", "Start a Chat", ContactImg)}</Col>
          </Row>
        </Container>
      <Footer />
    </>
  );
};

export default Home;
