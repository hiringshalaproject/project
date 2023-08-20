import React, { useState } from 'react'
import {navLinks} from "../../constants/String.js";
import Logo from "../assets/Logo_dark.png";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";

const AltNavbar = () => {
    const [active, setActive] = useState("Home");
    const [toggle, setToggle] = useState(false);
  
    return (
      <nav className="w-full flex py-6 justify-between items-center navbar">
        <img src={Logo} alt="hiringshala" className="w-[124px] h-[32px]" />
  
        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinks.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[20px] text-black ${index === navLinks.length - 1 ? "mr-0" : "mr-10"}`}
              onClick={() => setActive(nav.title)}
            >
              <a href={`${nav.id}`} className='no-underline text-black'>{nav.title}</a>
            </li>
          ))}
        </ul>
  
        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={toggle ? close : menu}
            alt="menu"
            className="w-[28px] h-[28px] object-contain mt-2"
            onClick={() => setToggle((prev) => !prev)}
          />
          <div
            className={`${
              !toggle ? "hidden" : "flex"
            } bg-white absolute top-10 right-0 mt-6 w-full min-w-[140px] rounded-xl sidebar border-2 border-black z-10`}
          >
            <ul className="list-none flex justify-end items-start flex-1 flex-col p-4 mb-0">
              {navLinks.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-black text-[20px] ${
                    index === navLinks.length - 1 ? "mb-0" : "mb-4"
                  }`}
                >
                  <a href={`/${nav.id}`} className="no-underline font-poppins font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent text-[20px]">
                    {nav.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    );
}

export default AltNavbar