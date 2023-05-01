import React from "react";
import {
  MDBFooter,
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBIcon,
  MDBBtn,
} from "mdb-react-ui-kit";

const Footer = () => (
  <MDBFooter
    className="text-center text-white"
    style={{ backgroundColor: "#b3e8e5" }}
  >
    <MDBContainer className="w-50">
      <div
        className="text-center text-dark p-3 rounded-pill m-4"
        style={{ backgroundColor: "#A8DBD9" }}
      >
        Trusted by 150+ companies around the world
        <a className="text-dark" href=""></a>
      </div>
    </MDBContainer>
    <MDBContainer className="pt-4">
      <section className="mb-4">
        <MDBCompanyCustom name={"Amazon"} />
        <MDBCompanyCustom name={"Microsoft"} />
        <MDBCompanyCustom name={"Linkedin"} />
        <MDBCompanyCustom name={"Juspay"} />
        <MDBCompanyCustom name={"Cred"} />
        <MDBCompanyCustom name={"Google"} />
      </section>
    </MDBContainer>
  </MDBFooter>
);

function MDBCompanyCustom({ name }) {
  return (
    <MDBBtn
      color="link"
      floating
      size="lg"
      className="text-dark m-1 text-decoration-none font-weight-bold"
      href=""
    >
      <div>{name}</div>
    </MDBBtn>
  );
}
export default Footer;
