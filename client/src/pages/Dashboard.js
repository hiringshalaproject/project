import React from "react";
import DashboardNav from "../components/Navbar/DashboardNav";
import SuccessfulReferral from "../components/Dashboard/SuccessfulReferral";
import AppliedJobOpp from "../components/Dashboard/AppliedJobOpp";
import FeaturedOpenings from "../components/Dashboard/FeaturedOpenings";
import UploadResume from "../components/Dashboard/UploadResume";

const Dashboard = () => {
  return (
    <div className="relative">
      <div className="sm:px-16 px-6 flex justify-center items-center">
        <div className="xl:max-w-[1280px] w-full">
          <DashboardNav />
        </div>
      </div>
      <div className="relative bg-white flex justify-center items-start z-1">
        <div className="xl:max-w-[1280px] w-full">
         <UploadResume />
        </div>
      </div>
      <div className="bg-white flex justify-center items-start">
        <div className="xl:max-w-[1280px] w-full">
          <SuccessfulReferral />
        </div>
      </div>
      <div className="bg-white flex justify-center items-start ">
        <div className="xl:max-w-[1280px] w-full">
          <AppliedJobOpp />
        </div>
      </div>
      <div className="bg-white flex justify-center items-start mb-5">
        <div className="xl:max-w-[1280px] w-full">
          <FeaturedOpenings />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
