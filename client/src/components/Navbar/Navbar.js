import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo from "../assets/Logo.png";
import Cookies from "js-cookie";
import {FaMoon} from 'react-icons/fa';
import {BiSun} from 'react-icons/bi';

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

  const [isDark,setDark]=useState(Cookies.get("theme")===undefined || Cookies.get("theme")==="light"?false:true);
  const [theme, setTheme] = useState(Cookies.get("theme") || "light");
  const toggleDarkTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      Cookies.set("theme", "dark");
    } else {
      setTheme("light");
      Cookies.set("theme", "light");
    }
  };
  

  useEffect(() => {
    console.log("theme", theme);
    document.body.className = theme;
  }, [theme]);

  return (
    <>
      <Navbar
        collapseOnSelect
        fixed="top"
        expand="sm"
        className="custom-navbar"
        variant="red"
        expanded={expanded}
        onToggle={handleToggle}
      >
        <Container>
          <Link to={isLoggedIn ? "/dashboard" : "/"} className="brand-logo">
            <img src={Logo} alt="Expand" width="200" height="90" />
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" onSelect={handleSelect}>
            <Nav className="ml-auto">
              <ul className="xl:flex xl:flex-row xl:gap-x-6 xl:list-disc lg:flex lg:flex-row lg:gap-x-5 lg:list-disc md:flex md:flex-row md:gap-x-6 md:list-disc">
                <li>
                  {isLoggedIn ? (
                    <Nav.Link as={Link} to="/dashboard">
                      Dashboard
                    </Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/">
                      Home
                    </Nav.Link>
                  )}
                </li>
                <li>
                  <Nav.Link as={Link} to="/about">
                    About
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/contact-us">
                    Contact Us
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/joblist">
                    Jobs
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/joblist">
                    Internships
                  </Nav.Link>
                </li>
                <li>
                <Nav.Link className="moon-button" onClick={toggleDarkTheme}>
                {isDark
                  ?<button class="btn btn-dark" id="modeToggler" data-toggle="tooltip" data-placement="bottom" title="Switch to Light Mode"><BiSun fontSize={20}/></button>
                  :<button class="btn btn-light" id="modeToggler" data-toggle="tooltip" data-placement="bottom" title="Switch to Dark Mode"><FaMoon fontSize={20}/></button>
                  }
                </Nav.Link>
                </li>
              </ul>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default NavbarCmp;
