import React from "react";
import HomeImg from "../components/assets/home-img.PNG";
import { useNavigate } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";
const Hero = () => {
  const navigate = useNavigate();
  const routeChange = (userType) => {
    navigate(`/${userType}/login`, { state: { userType: userType } });
  };
  return (
    <section id="home" className="flex md:flex-row flex-col sm:py-16 py-6">
      <div
        className={`flex-1 flex justify-start items-start flex-col xl:px-0 sm:px-16 px-6`}
      >
        <div className="flex flex-row justify-between items-center w-full">
          <h1 className="flex-1 font-poppins font-semibold ss:text-[72px] text-[52px] text-black ss:leading-[100.8px] leading-[75px] bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
              Unleash your <br className="sm:block hidden" /> potential
            </span>{" "}
          </h1>
        </div>
        <h1 className="font-poppins font-semibold ss:text-[68px] text-[52px] text-black ss:leading-[100.8px] leading-[65px] w-full">
          <span className="bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            With HiringShala
          </span>
        </h1>
        <p className="font-poppins font-normal text-black text-[18px] leading-[28px] max-w-[470px]">
          The largest pool of career opportunities that match your skill set.
          Link up with outstanding people to create a better future.
        </p>

        <div className="text-center text-lg-start mt-4 pt-2">
          <MDBBtn className="me-1 btn-lg" color="success" onClick={() => routeChange("seeker")}>
            Login
          </MDBBtn>
          <MDBBtn className="me-1 btn-lg ml-5" color="success" onClick={() => routeChange("employee")}>
            Employer Login
          </MDBBtn>
         
        </div>
      </div>

      <div className="flex-1 flex justify-start items-start relative">
        <img
          src={HomeImg}
          alt="home-img"
          className="w-[80%] h-[90%] relative z-[5]"
        />
      </div>
    </section>
  );
};

export default Hero;
