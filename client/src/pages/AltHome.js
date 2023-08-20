import React from "react";
import AltNavbar from "../components/Navbar/AltNavbar";
import Hero from "./Hero";

const AltHome = () => (
  <div>
    <div className="sm:px-16 px-6 flex justify-center items-center">
      <div className="xl:max-w-[1280px] w-full">
        <AltNavbar />
      </div>
    </div>

    <div className="bg-white flex justify-center items-start">
      <div className="xl:max-w-[1280px] w-full">
        <Hero />
      </div>
    </div>
  </div>
);

export default AltHome;
