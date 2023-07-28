import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer/Footer";
import axios from 'axios';
import { AiFillDollarCircle, AiOutlineFieldTime, AiOutlineLink, AiOutlineMan } from "react-icons/ai"
import { FaRegCalendarTimes } from "react-icons/fa"
import { BiLocationPlus } from "react-icons/bi"
import { MdWork } from "react-icons/md";
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
    <>
   <div className="lg:m-20 xl:m-20 max-sm:mx-3 max-sm:mt-16 max-sm:mb-10 bg-white shadow-lg  shadow-slate-950 ">
   {/* <img src={background8} className="bg-no-repeat shadow-slate-950 bg-cover absolute h-full w-full"/> */}
    <h6 className="italic lg:text-xs xl:text-xs text-[8px] text-center text-indigo-600 mt-2 mr-2 ">Grab your dream job on Hiring Shala at...</h6>
      <div className=" h-full w-full">
       <div>
        <div className=" lg:mt-3 xl:mt-3 mt-12 p-2 text-center text-4xl lg:text-5xl font-semibold font-sans text-indigo-600 drop-shadow-lg shadow-gray-700/60">{companyName}</div>
      </div>
       <div className="text-center lg:text-2xl xl:text-2xl text-xl leading-snug mt-2 text-gray-600">{companyName} is hiring for {jobTitle} at {jobLocation}.</div>

      <div className=" ml-10 mt-10 min-w-0 flex-1">
        <div className="lg:text-4xl xl:text-4xl text-2xl font-semibold leading-snug text-indigo-600 sm:truncate sm:text-4xl sm:tracking-tight">
          {jobTitle}
        </div>
        <div className="mt-2 flex flex-col sm:mt-1 sm:flex-row sm:flex-wrap sm:space-x-6">
          <div className="mt-3 flex items-center text-md text-gray-600">
            <MdWork className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true" />
            Full-time
          </div>
          <div className="mt-3 flex items-center text-md text-gray-600">
            <BiLocationPlus className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true" />
            {jobLocation}
          </div>
          <div className="mt-3 flex items-center text-md text-gray-600">
            <AiFillDollarCircle className="mr-1.5 h-5 w-5 flex-shrink-0 text-gray-500" aria-hidden="true" />
            {expectedPackage}
          </div>
      </div>  
    </div>
 <div className="bg-indigo-600 w-full">
      <Marquee >
    <ul className="flex gap-x-2 ml-2 ml-md-4 mr-20 mr-md-4">
      <li className="text-white font-medium text-[14px] list-disc">Job Published On:</li>
      <li className="text-white font-medium text-[14px] ">{formattedJobDate}</li>
    </ul>
    {isExpired ? (
      <div>
        <ul className="flex  ml-2 ml-md-4 gap-x-2">
          <li className="text-white font-sans font-medium text-[14px] list-disc">Vacancy Status:</li>
          <li className="text-white font-sans font-medium text-[14px]">The Job vacancy is Expired</li>
        </ul>
      </div>
    ) : (
      <div>
        <ul className="flex ml-2 ml-md-4 mr-2 mr-md-4 gap-x-2">
          <li className="text-white font-sans font-medium text-[14px] list-disc">Job Status:</li>
          <li className="text-white font-sans font-medium text-[14px]">Job Application is Open, apply for quick referral.</li>
        </ul>
      </div>
    )}
  </Marquee>
  </div>
    <div className=" w-full mt-8"> 

    {jobRequirements && (
     <div>
       <div className="text-indigo-800  text-xl md:text-2xl lg:text-2xl xl:text-2xl font-medium   ml-1 xl:ml-6 lg:ml-6 mr-3">Job Requirements</div>
       <ul className="bullet-list">
         {sentences.map((sentence, index) => (
           <li key={index} className="text-indigo-900 mr-5">{sentence}</li>
         ))}
       </ul>
     </div>
   )}    
   {jobEligibility && (
     <div>
       <div className="text-indigo-800  text-xl md:text-2xl lg:text-2xl xl:text-2xl font-medium   ml-1 xl:ml-6 lg:ml-6 mr-3">Job Eligibility</div>
       <ul>
         <li className="text-indigo-900">{jobEligibility}</li>
       </ul>
     </div>
   )}
   {noOfOpenings && (
     <div className=" font-medium ">
       <div className="text-indigo-800  text-xl md:text-2xl lg:text-2xl xl:text-2xl font-medium  ml-1 xl:ml-6 lg:ml-6 mr-3">Total Vacancies:</div>
       <ul className="flex">
       <li className="text-indigo-900 ">{noOfOpenings}</li>
       </ul>
     </div>
   )}
   {jobId && (
     <div className="font-medium">
       <h4 className="text-indigo-800  text-xl md:text-2xl lg:text-2xl xl:text-2xl font-medium   ml-1 xl:ml-6 lg:ml-6 mr-3">Job Id:</h4>
       <div className="horizontal-container">
       <ul className="flex items-center">
         <AiFillDollarCircle />
         <li className="text-indigo-900">{jobId}</li>
         </ul>
       </div>
     </div>
   )}
   {seekersRegistered && (
        <div>
          <h4 className="text-indigo-800  text-xl md:text-2xl lg:text-2xl xl:text-2xl font-medium ml-1 xl:ml-6 lg:ml-6 mr-3">Seekers Registered</h4>
          <div className=" horizontal-container ">
          <ul className="flex items-center">
           <AiOutlineMan />
           <li className="text-indigo-900" >{seekersRegistered.length}</li>
           </ul>
          </div>
        </div>
      )}
      </div> 
    </div>
   </div>
   <span className="flex justify-center mb-10">
      <button className="apply-button bg-indigo-600 shadow-md shadow-gray-700/60">
        Apply For Referral
      </button>
    </span>
  <Footer />
   </>
  );
};
export default JobDescription; 



