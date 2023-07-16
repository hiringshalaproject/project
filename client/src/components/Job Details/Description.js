import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer/Footer";
import axios from 'axios';
import {AiFillDollarCircle} from "react-icons/ai"
import {BiLocationPlus} from "react-icons/bi"
import { useLocation } from 'react-router-dom';
import Marquee from "react-fast-marquee";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
const apiUrlSecondary = "/api/v1/jobs";

const JobDescription = () => {
  const location = useLocation();
  const jobid = location.state?.jobId;
  console.log(jobid);


  const [companyDetails, setCompanyDetails] = useState(null);
  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  // 64985560673062b875c9a7b7

  const fetchCompanyDetails = () => {
    axios.get(`${apiUrl + apiUrlSecondary}/${jobid}`)
      .then(response => {
        // const companyId = "64985560673062b875c9a7b7";
        const companyDetails = response.data.job;
        setCompanyDetails(companyDetails);
      })
      .catch(error => {
        console.error('Error fetching company details:', error);
      });
  };

  if (!companyDetails) {
    return <div>Loading...</div>;
  }

  const {
    companyName,
    jobTitle,
    jobDate,
    jobLocation,
    expectedPackage,
    jobEligibility,
    jobRequirements,
    applyLink,
    seekersRegistered,
    jobId,
    noOfOpenings,
    isExpired,
    __v
  } = companyDetails;

  const formattedJobDate = jobDate ? new Date(jobDate).toLocaleDateString() : '';
  const sentences = jobRequirements.split(". ");

  return (
   <div className="lg:mt-[71px] mt-[57px] mb-4 ">
    {/* <div className="h-1 mb-[2px] details bg-teal-800"></div> */}
   <div className="pt-2 pb-2 w-full mb-[2px] text-white bg-[#999999] font-extrabold text-3xl md:text-6xl lg:text-5xl xl:text-5xl sm:text-3xl flex text-center items-center justify-center"> 
     {companyName}
   </div>
   {/* <div className="h-1 mb-[2px] details bg-teal-800"></div> */}
   <div className="h-[3vh] bg-[#7bc1b2] flex">
  <Marquee>
    <ul className="flex gap-2 ml-2 ml-md-4 pt-3 mr-20 mr-md-4">
      <li className="text-white font-sans font-medium text-[14px] list-disc">Job Published On:</li>
      <li className="text-white font-sans font-medium text-[14px] gap-2">{formattedJobDate}</li>
    </ul>
    {isExpired ? (
      <div>
        <ul className="flex pt-3 ml-2 ml-md-4 gap-2">
          <li className="text-white font-sans font-medium text-[14px] list-disc">Vacancy Status:</li>
          <li className="text-white font-sans font-medium text-[14px]">The Job vacancy is Expired</li>
        </ul>
      </div>
    ) : (
      <div>
        <ul className="flex pt-3 ml-2 ml-md-4 mr-2 mr-md-4 gap-2">
          <li className="text-white font-sans font-medium text-[14px] list-disc">Job Status:</li>
          <li className="text-white font-sans font-medium text-[14px]">Job Application is Open, apply for quick referral.</li>
        </ul>
      </div>
    )}
  </Marquee>
</div>

  <div className="mt-1  bg-[#F4EEE1]">
  {jobTitle && (
    <div>
      <div className="text-black font-serif font-semibold text-3xl md:text-4xl lg:text-4xl xl:text-4xl text-center pt-2 lg:mb-2 xl:mb-2 md:mb-2 mb-1">
        {jobTitle}
      </div>
    </div>
  )}
  <div className="row">
  <div className="col-md-6 mt-2">
      {jobLocation && (
        <div className="font-medium ">
          <div className="text-black text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold font-sans ml-3 xl:ml-6 lg:ml-6 mr-3">Job Location:</div>
          <ul className="flex items-center">
          <BiLocationPlus />
       <li><span className="text-black font-sans">{jobLocation}</span></li>  
          </ul>
        </div>
      )}
    </div>
    <div class="col-md-6 lg:mt-3 xl:mt-3 mb-2 lg:pt-2 max-sm:ml-2 ">
  <button class="w-40 h-8  mt-1 border-spacing-1 rounded-pill bg-yellow-400 text-xl md:text-lg lg:text-xl font-semibold font-sans text-center">
    Full Time
  </button>
</div>
 </div>
  {expectedPackage && (
    <div className="font-medium ">
      <div className="text-black text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold font-sans ml-3 xl:ml-6 lg:ml-6 mr-3">Expected Package:</div>
      <div className="horizontal-container">
      <ul className="flex items-center">
        <AiFillDollarCircle />
      <li><span className="text-black font-sans">{expectedPackage}</span></li>
       </ul>
      </div>
    </div>
  )}
  {noOfOpenings && (
    <div className=" font-medium ">
      <div className="text-black text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold font-sans ml-3 xl:ml-6 lg:ml-6 mr-3">Total Vacancies:</div>
      <ul className="flex">
      <li className="text-black font-sans">{noOfOpenings}</li>
      </ul>
    </div>
  )}
  {jobId && (
    <div className="font-medium">
      <h4 className="text-black text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold font-sans ml-3 xl:ml-6 lg:ml-6 mr-3">Job Id:</h4>
      <div className="horizontal-container">
      <ul className="flex items-center">
        <AiFillDollarCircle />
        <li className="text-black font-sans">{jobId}</li>
        </ul>
      </div>
    </div>
  )}
  <div className="text-black text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold font-sans ml-3 xl:ml-6 lg:ml-6 mr-3">Job Description</div>
  <ul>
    <li className="font-sans">{companyName} is hiring for {jobTitle} at {jobLocation}</li>
  </ul>
  {jobEligibility && (
    <div>
      <div className="text-black text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold font-sans ml-3 xl:ml-6 lg:ml-6 mr-3">Job Eligibility</div>
      <ul>
        <li className="font-sans">{jobEligibility}</li>
      </ul>
    </div>
  )}
  {jobRequirements && (
    <div>
      <div className="text-black text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold font-sans ml-3 xl:ml-6 lg:ml-6 mr-3">Job Requirements</div>
      <ul className="bullet-list">
        {sentences.map((sentence, index) => (
          <li key={index} className="font-sans mr-5">{sentence}</li>
        ))}
      </ul>
    </div>
  )}
  <div className="flex justify-center pb-4 mx-2">
    <button className="apply-button">
      Apply For Referral
    </button>
  </div>
</div>



  <div className="mb-2 bg-slate-300 lg:flex xl:flex md:flex">
 <div className="ml-4 pt-2 xl:ml-28 lg:ml-28 md:ml-20">
   <div className="flex pb-2 flex-wrap -space-x-2 overflow-hidden ">
  <img
    className="inline-block h-6 w-6 lg:h-10 lg:w-10 xl:h-10 xl:w-10 rounded-full ring-2 ring-white"
    src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    alt=""
  />
  <img
    className="inline-block h-6 w-6 lg:h-10 lg:w-10 xl:h-10 xl:w-10 rounded-full ring-2 ring-white"
    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
    alt=""
  />
  <img
    className="inline-block h-6 w-6 lg:h-10 lg:w-10 xl:h-10 xl:w-10 rounded-full ring-2 ring-white"
    src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    alt=""
  />
</div>

    </div>
    <span className="text-black lg:text-2xl xl:text-2xl md:text-xl font-sans font-medium px-3  lg:mt-3 xl:mt-3">
    {seekersRegistered.length} people interested in this Job.
    </span>
   </div>
 <Footer/>
</div>
  );
}
export default JobDescription ;