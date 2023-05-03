import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Logo from "../assets/Logo.png";

const NavbarCmp = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    setExpanded(false);
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="sm"
        bg="white"
        variant="red"
        style={{ marginBottom: "20px", zIndex: 1000, position: "fixed" }}
        expanded={expanded}
        onToggle={handleToggle}
      >
        <Container>
          <Navbar.Brand href="/" className="brand-logo">
            <img src={Logo} alt="Expand" width="200" height="100" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" onSelect={handleSelect}>
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/about">About</Nav.Link>
              <Nav.Link href="/contact-us">Contact Us</Nav.Link>
              <Nav.Link href="/jobList">Job List</Nav.Link>
              {/* <Nav.Link href="/dashboard">Dashboard</Nav.Link> TODO - only visible if logged in */}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarCmp;
