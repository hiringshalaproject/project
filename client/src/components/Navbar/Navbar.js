import React, { useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Cookies from "js-cookie";
import {FaMoon} from 'react-icons/fa';
import {BiSun} from 'react-icons/bi'
import './darkMode.css'
import { getCookies, removeCookies, removeTheme, setTheme } from "../Cookies";

const NavbarCmp = () => {
  const [expanded, setExpanded] = useState(false);

  const [isDark,setDark]=useState(false);

  const changeMode=()=>{
      removeTheme();
      setDark(!isDark);
      // const theme=isDark?'dark':'light';
      // setTheme(theme);
      // console.log(getCookies().theme);
  }

 

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
        bg={isDark?"black":"white"}
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
                <Nav.Link as={Link} to="/dashboard" className={isDark?'dark-theme':'light-theme'}>
                  Dashboard
                </Nav.Link>
              ) : (
                <Nav.Link as={Link} to="/" className={isDark?'dark-theme':'light-theme'}>
                  Home
                </Nav.Link>
              )}
              <Nav.Link as={Link} to="/about" className={isDark?'dark-theme':'light-theme'}>
                About
              </Nav.Link>
              <Nav.Link as={Link} to="/contact-us" className={isDark?'dark-theme':'light-theme'}>
                Contact Us
              </Nav.Link>
              <Nav.Link as={Link} to="/joblist" className={isDark?'dark-theme':'light-theme'}>
                Job List
              </Nav.Link>
              {isDark
              ?<button class="btn btn-dark" id="modeToggler" data-toggle="tooltip" data-placement="bottom" title="Switch to Light Mode" onClick={changeMode}><BiSun fontSize={20}/></button>
              :<button class="btn btn-light" id="modeToggler" data-toggle="tooltip" data-placement="bottom" title="Switch to Dark Mode" onClick={changeMode}><FaMoon fontSize={20}/></button>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarCmp;
