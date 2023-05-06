import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Cookies from "js-cookie";

const NavbarCmp = () => {
  const [expanded, setExpanded] = useState(false);
  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    setExpanded(false);
  };

  const userId = Cookies.get("userId");
  const isLoggedIn = userId !== undefined && userId !== "";
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
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="brand-logo">
            <img src={Logo} alt="Expand" width="200" height="100" />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" onSelect={handleSelect}>
            <Nav className="ml-auto">
              {isLoggedIn ? (
                <Nav.Link as={Link} to="/dashboard">
                  Dashboard
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/">
                  Home
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/about">
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact-us">
                Contact Us
              </Nav.Link>
              <Nav.Link as={Link} to="/joblist">
                Job List
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarCmp;
