import React, { useEffect, useState } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import Logo_dark from "../assets/Logo_dark.png";
import Logo_light from "../assets/Logo_light.png";
import Cookies from "js-cookie";
import { FaMoon } from "react-icons/fa";
import { BiSun } from "react-icons/bi";

const NavbarCmp = () => {
  const [expanded, setExpanded] = useState(false);

  const handleToggle = () => {
    setExpanded(!expanded);
  };

  const handleSelect = () => {
    if (expanded) {
      setExpanded(false);
    }
  };  

  const userId = Cookies.get("userId");
  const isLoggedIn = userId !== undefined && userId !== "";

  const [isDark, setDark] = useState(
    Cookies.get("theme") === undefined || Cookies.get("theme") === "light"
      ? false
      : true
  );
  const [theme, setTheme] = useState(Cookies.get("theme") || "dark");
  const toggleDarkTheme = () => {
    if (theme === "light") {
      setTheme("dark");
      setDark(true);
      Cookies.set("theme", "dark");
    } else {
      setTheme("light");
      setDark(false);
      Cookies.set("theme", "light");
    }
    handleSelect();
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
          <Nav.Link
            as={Link}
            to={isLoggedIn ? "/dashboard" : "/"}
            className="brand-logo"
          >
            <img
              src={theme === "light" ? Logo_dark : Logo_light}
              alt="Expand"
              width="200"
              height="90"
            />
          </Nav.Link>
          <Navbar.Toggle
            aria-controls="responsive-navbar-nav"
            style={{ color: isDark ? "white" : "black" , backgroundColor: isDark ? "white" : "transparent"}}
          />
          <Navbar.Collapse id="responsive-navbar-nav" onSelect={handleSelect}>
            <Nav className="ml-auto">
              <ul className="xl:flex xl:flex-row xl:gap-x-6 xl:list-disc lg:flex lg:flex-row lg:gap-x-5 lg:list-disc md:flex md:flex-row md:gap-x-6 md:list-disc">
                <li>
                  {isLoggedIn ? (
                    <Nav.Link as={Link} to="/dashboard" onClick={handleSelect}>
                      Dashboard
                    </Nav.Link>
                  ) : (
                    <Nav.Link as={Link} to="/" onClick={handleSelect}>
                      Home
                    </Nav.Link>
                  )}
                </li>
                <li>
                  <Nav.Link as={Link} to="/about" onClick={handleSelect}>
                    About
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/contact-us" onClick={handleSelect}>
                    Contact Us
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/joblist" onClick={handleSelect}>
                    Jobs
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link as={Link} to="/joblist" onClick={handleSelect}>
                    Internships
                  </Nav.Link>
                </li>
                <li>
                  <Nav.Link className="moon-button" onClick={toggleDarkTheme}>
                    {isDark ? (
                      <button
                        className="btn btn-dark"
                        id="modeToggler"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Switch to Light Mode"
                      >
                        <BiSun fontSize={20} />
                      </button>
                    ) : (
                      <button
                        className="btn btn-light"
                        id="modeToggler"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Switch to Dark Mode"
                      >
                        <FaMoon fontSize={20} />
                      </button>
                    )}
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
