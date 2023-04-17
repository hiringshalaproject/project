import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {


  return (
    <div className='flex justify-between items-center w-11/12 max-w-[1160px] py-4 mx-auto'>
      <div className='flex items-center'>
        <NavLink to="/">
          <img src="../../src/components/assets/Logo.png" alt="Logo"/>
        </NavLink>
      </div>
      <nav>
        <ul className='flex justify-evenly'>
          <li>
            <ul className="text-slate-700 flex gap-x-14 justify-evenly list-disc">
              <li>
                <NavLink to="/about" activeStyle>
                  About
                </NavLink>
              </li>
              <li>
                <NavLink to="/platform" activeStyle>
                  Platform
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact-us" activeStyle>
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink to="/blog" activeStyle>
                  Blog
                </NavLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>

    </div>
  );
};

export default Navbar;