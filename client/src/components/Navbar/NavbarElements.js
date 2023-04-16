import { FaBars } from "react-icons/fa";
import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";

export const Nav = styled.nav`
  background: #ffffff;
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 0.7rem calc((100vw - 1000px) / 2);
  z-index: 10;
`;

export const NavLink = styled(Link)`
  color: #030302;
  display: flex;
  align-items: center;
  text-decoration: none;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    color: #15cdfc;
  }
`;

export const Bars = styled(FaBars)`
  display: none;
  color: #fff;

  @media screen and (max-width: 768px) {
    display: block;
    position: absolute;
    top: 0;
    right: 0;
    transform: translate(-100%, 75%);
    font-size: 1.8rem;
    cursor: pointer;
  }
`;

export const NavMenu = styled.div`
  display: flex;
  align-items: right;
  justify-content: right;

  width: 100vw;
  margin-left: 30px;
  white-space: nowrap;
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;
  wrap: no-wrap;
`;