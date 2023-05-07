import React from "react";
import { MDBFooter, MDBContainer, MDBBtn } from "mdb-react-ui-kit";
import './footer.css';

const Footer = () => (
  <MDBFooter
    className="text-center text-white footer"
    // style={{ backgroundColor: "#b3e8e5" }}
  >
    <MDBContainer className="text-center container-footer" style={{ width: 350 }}>
      <div
        className="text-dark p-2 rounded-pill m-1"
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
      size="md"
      className="text-secondary mr-8 ml-8 text-decoration-none fw-bold border-0"
      href=""
    >
      <div>{name}</div>
    </MDBBtn>
  );
}
export default Footer;
