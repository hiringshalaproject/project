import React, { useState } from "react";
import { navLinksDashboard } from "../../constants/String.js";
import Logo from "../assets/Logo_dark.png";
import close from "../assets/close.svg";
import menu from "../assets/menu.svg";
import profilePicture from "../assets/user-icon.png";


const DashboardNav = () => {
  const [profileActive, setProfileActive] = useState(false);
  const [toggle, setToggle] = useState(false);
  const dropdownMenu = ["My Profile", "Change Password", "Logout"];
  return (
    <>
      <nav className="w-full flex py-6 justify-between items-center navbar mt-2">
        <img src={Logo} alt="hiringshala" className="w-[124px] h-[32px]" />

        <ul className="list-none sm:flex hidden justify-end items-center flex-1">
          {navLinksDashboard.map((nav, index) => (
            <li
              key={nav.id}
              className={`font-poppins font-normal cursor-pointer text-[20px] text-black mr-10
            }`}
            >
              <a href={`${nav.id}`} className="no-underline text-black">
                {nav.title}
              </a>
            </li>
          ))}

          <img
            src={profilePicture}
            alt="Profile"
            className="cursor-pointer w-[35px] h-[35px] relative"
            onClick={() => setProfileActive((prev) => !prev)}
          />
        </ul>

        <div className="sm:hidden flex flex-1 justify-end items-center">
          <img
            src={profilePicture}
            alt="Profile"
            className="cursor-pointer w-[35px] h-[35px] relative mr-5"
            onClick={() => setProfileActive((prev) => !prev)}
          />
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
              {navLinksDashboard.map((nav, index) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-black text-[20px] ${
                    index === navLinksDashboard.length - 1 ? "mb-0" : "mb-4"
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
      {profileActive && (
        <div
          className={`flex p-4 bg-white absolute top-15 right-5 min-w-[50px] rounded-xl sidebar border-2 border-slate-400 z-10`}
        >
          <ul className="list-none flex justify-end items-start flex-1 flex-col p-0 mb-0">
            {dropdownMenu.map((item, index) => (
              <li
                key={index}
                className={`font-poppins font-medium cursor-pointer text-[20px] ${
                  index === dropdownMenu.length - 1 ? "mb-0" : "mb-2"
                }`}
              >
                <a href="#item" className="no-underline text-black text-center">
                  {item}
                </a>
                {index !== dropdownMenu.length - 1 && (
                  <hr className="hr mt-0 mb-2" />
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default DashboardNav;
