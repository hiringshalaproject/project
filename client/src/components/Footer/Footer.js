import React from "react";
import { MDBFooter, MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import './footer.css';

const Footer = () => (
  <MDBFooter
    className="text-center text-white"
    style={{ backgroundColor: "#b3e8e5" }}
  >
    <MDBContainer className="text-center container-footer" style={{ width: 350 }}>
      <div
        className="text-dark p-3 rounded-pill m-4"
        style={{ backgroundColor: "#A8DBD9" }}
      >
        Trusted by 150+ companies around the world
      </div>
    </MDBContainer>
    <section className="mb-4">
      <MDBCompanyCustom name={"Amazon"} />
      <MDBCompanyCustom name={"Microsoft"} />
      <MDBCompanyCustom name={"Linkedin"} />
      <MDBCompanyCustom name={"Juspay"} />
      <MDBCompanyCustom name={"Google"} />
    </section>
  </MDBFooter>
);

function MDBCompanyCustom({ name }) {
  return (
    <MDBBtn
      color="link"
      floating
      size="lg"
      className="text-secondary mr-12 ml-12 text-decoration-none fw-bold border-0"
      href=""
    >
      <div>{name}</div>
    </MDBBtn>
  );
}
export default Footer;
