// import React, { useState, useEffect } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import Footer from "../Footer/Footer";
// import axios from 'axios';
// import {AiFillDollarCircle} from "react-icons/ai"
// import {BiLocationPlus} from "react-icons/bi"
// import { useLocation } from 'react-router-dom';
// import Marquee from "react-fast-marquee";

// const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
// const apiUrlSecondary = "/api/v1/jobs";

// const JobDescription = () => {
//   const location = useLocation();
//   const jobid = location.state?.jobId;
//   console.log(jobid);


//   const [companyDetails, setCompanyDetails] = useState(null);
//   useEffect(() => {
//     fetchCompanyDetails();
//   }, []);

//   // 64985560673062b875c9a7b7

//   const fetchCompanyDetails = () => {
//     axios.get(`${apiUrl + apiUrlSecondary}/${jobid}`)
//       .then(response => {
//         // const companyId = "64985560673062b875c9a7b7";
//         const companyDetails = response.data.job;
//         setCompanyDetails(companyDetails);
//       })
//       .catch(error => {
//         console.error('Error fetching company details:', error);
//       });
//   };

//   if (!companyDetails) {
//     return <div>Loading...</div>;
//   }

//   const {
//     companyName,
//     jobTitle,
//     jobDate,
//     jobLocation,
//     expectedPackage,
//     jobEligibility,
//     jobRequirements,
//     applyLink,
//     seekersRegistered,
//     jobId,
//     noOfOpenings,
//     isExpired,
//     __v
//   } = companyDetails;

//   const formattedJobDate = jobDate ? new Date(jobDate).toLocaleDateString() : '';
//   const sentences = jobRequirements.split(". ");

//   return (
//    <div className="lg:mt-[71px] mt-[57px] mb-4 ">
//     {/* <div className="h-1 mb-[2px] details bg-teal-800"></div> */}
//    <div className="pt-2 pb-2 w-full mb-[2px] text-white bg-[#999999] font-extrabold text-3xl md:text-6xl lg:text-5xl xl:text-5xl sm:text-3xl flex text-center items-center justify-center"> 
//      {companyName}
//    </div>
//    {/* <div className="h-1 mb-[2px] details bg-teal-800"></div> */}
//    <div className="h-[3vh] bg-[#7bc1b2] flex">
//   <Marquee>
//     <ul className="flex gap-2 ml-2 ml-md-4 pt-3 mr-20 mr-md-4">
//       <li className="text-white font-sans font-medium text-[14px] list-disc">Job Published On:</li>
//       <li className="text-white font-sans font-medium text-[14px] gap-2">{formattedJobDate}</li>
//     </ul>
//     {isExpired ? (
//       <div>
//         <ul className="flex pt-3 ml-2 ml-md-4 gap-2">
//           <li className="text-white font-sans font-medium text-[14px] list-disc">Vacancy Status:</li>
//           <li className="text-white font-sans font-medium text-[14px]">The Job vacancy is Expired</li>
//         </ul>
//       </div>
//     ) : (
//       <div>
//         <ul className="flex pt-3 ml-2 ml-md-4 mr-2 mr-md-4 gap-2">
//           <li className="text-white font-sans font-medium text-[14px] list-disc">Job Status:</li>
//           <li className="text-white font-sans font-medium text-[14px]">Job Application is Open, apply for quick referral.</li>
//         </ul>
//       </div>
//     )}
//   </Marquee>
// </div>

//   <div className="mt-1  bg-[#F4EEE1]">
//   {jobTitle && (
//     <div>
//       <div className="text-black font-serif font-semibold text-3xl md:text-4xl lg:text-4xl xl:text-4xl text-center pt-2 lg:mb-2 xl:mb-2 md:mb-2 mb-1">
//         {jobTitle}
//       </div>
//     </div>
//   )}
//   <div className="row">
//   <div className="col-md-6 mt-2">
//       {jobLocation && (
//         <div className="font-medium ">
//           <div className="text-black text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold font-sans ml-3 xl:ml-6 lg:ml-6 mr-3">Job Location:</div>
//           <ul className="flex items-center">
//           <BiLocationPlus />
//        <li><span className="text-black font-sans">{jobLocation}</span></li>  
//           </ul>
//         </div>
//       )}
//     </div>
//     <div class="col-md-6 lg:mt-3 xl:mt-3 mb-2 lg:pt-2 max-sm:ml-2 ">
//   <button class="w-40 h-8  mt-1 border-spacing-1 rounded-pill bg-yellow-400 text-xl md:text-lg lg:text-xl font-semibold font-sans text-center">
//     Full Time
//   </button>
// </div>
//  </div>
//   {expectedPackage && (
//     <div className="font-medium ">
//       <div className="text-black text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold font-sans ml-3 xl:ml-6 lg:ml-6 mr-3">Expected Package:</div>
//       <div className="horizontal-container">
//       <ul className="flex items-center">
//         <AiFillDollarCircle />
//       <li><span className="text-black font-sans">{expectedPackage}</span></li>
//        </ul>
//       </div>
//     </div>
//   )}
//   {noOfOpenings && (
//     <div className=" font-medium ">
//       <div className="text-black text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold font-sans ml-3 xl:ml-6 lg:ml-6 mr-3">Total Vacancies:</div>
//       <ul className="flex">
//       <li className="text-black font-sans">{noOfOpenings}</li>
//       </ul>
//     </div>
//   )}
//   {jobId && (
//     <div className="font-medium">
//       <h4 className="text-black text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold font-sans ml-3 xl:ml-6 lg:ml-6 mr-3">Job Id:</h4>
//       <div className="horizontal-container">
//       <ul className="flex items-center">
//         <AiFillDollarCircle />
//         <li className="text-black font-sans">{jobId}</li>
//         </ul>
//       </div>
//     </div>
//   )}
//   <div className="text-black text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold font-sans ml-3 xl:ml-6 lg:ml-6 mr-3">Job Description</div>
//   <ul>
//     <li className="font-sans">{companyName} is hiring for {jobTitle} at {jobLocation}</li>
//   </ul>
//   {jobEligibility && (
//     <div>
//       <div className="text-black text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold font-sans ml-3 xl:ml-6 lg:ml-6 mr-3">Job Eligibility</div>
//       <ul>
//         <li className="font-sans">{jobEligibility}</li>
//       </ul>
//     </div>
//   )}
//   {jobRequirements && (
//     <div>
//       <div className="text-black text-xl md:text-2xl lg:text-2xl xl:text-2xl font-semibold font-sans ml-3 xl:ml-6 lg:ml-6 mr-3">Job Requirements</div>
//       <ul className="bullet-list">
//         {sentences.map((sentence, index) => (
//           <li key={index} className="font-sans mr-5">{sentence}</li>
//         ))}
//       </ul>
//     </div>
//   )}
//   <div className="flex justify-center pb-4 mx-2">
//     <button className="apply-button">
//       Apply For Referral
//     </button>
//   </div>
// </div>



//   <div className="mb-2 bg-slate-300 lg:flex xl:flex md:flex">
//  <div className="ml-4 pt-2 xl:ml-28 lg:ml-28 md:ml-20">
//    <div className="flex pb-2 flex-wrap -space-x-2 overflow-hidden ">
//   <img
//     className="inline-block h-6 w-6 lg:h-10 lg:w-10 xl:h-10 xl:w-10 rounded-full ring-2 ring-white"
//     src="https://images.unsplash.com/photo-1550525811-e5869dd03032?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//     alt=""
//   />
//   <img
//     className="inline-block h-6 w-6 lg:h-10 lg:w-10 xl:h-10 xl:w-10 rounded-full ring-2 ring-white"
//     src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2.25&w=256&h=256&q=80"
//     alt=""
//   />
//   <img
//     className="inline-block h-6 w-6 lg:h-10 lg:w-10 xl:h-10 xl:w-10 rounded-full ring-2 ring-white"
//     src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
//     alt=""
//   />
// </div>

//     </div>
//     <span className="text-black lg:text-2xl xl:text-2xl md:text-xl font-sans font-medium px-3  lg:mt-3 xl:mt-3">
//     {seekersRegistered.length} people interested in this Job.
//     </span>
//    </div>
//  <Footer/>
// </div>
//   );
// }
// export default JobDescription ;


import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer/Footer";
import axios from 'axios';
import { AiFillDollarCircle, AiOutlineFieldTime, AiOutlineLink, AiOutlineMan } from "react-icons/ai"
import { FaRegCalendarTimes } from "react-icons/fa"
import { BiLocationPlus } from "react-icons/bi"
import { useLocation } from 'react-router-dom';

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
      <div className="mt-20 mb-4 Jobdetails">
        <div className="container shadow-slate-300">
          <div className="row">
            <div className="col-lg-8">
              <div className="d-flex align-items-center company-name">
                {/* <img src={CompanyIcon} className="w-8 h-8 ml-2 mt-2" />  */}
                <h1 className="company-name-text">{companyName}</h1>
              </div>
              {jobTitle && (
                <div >
                  <h2 className="job-title">{jobTitle}</h2>
                </div>
              )}
              <div className="mt-3 ml-3 job-desc">
                <h4 className="job-desc-text">Job Description</h4>
                <ul>
                  <li>{companyName} is hiring for {jobTitle} at {jobLocation}</li>
                </ul>
                {jobEligibility && (
                  <div >
                    <h4>Job Eligibility</h4>
                    <ul>
                      <li>{jobEligibility}</li>
                    </ul>
                  </div>
                )}
                {jobRequirements && (
                  <div>
                    <h4>Job Requirements</h4>
                    <ul className="bullet-list">
                      {sentences.map((sentence, index) => (
                        <li key={index}>{sentence}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            <div className="col-lg-4 d-flex flex-column mb-2">
              <div className="flex-grow-1">
                <div className="flex align-item-center justify-content-center gap-x-10">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 hover:scale-110 transition-transform"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6 hover:scale-110 transition-transform"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                  </svg>
                </div>
                <div className="p-4 bg-transparent border rounded-2xl mt-3 job-box">
                  {jobLocation && (
                    <div>
                      <h4 className="text-center">Job Location</h4>
                      <div className="d-flex align-items-center justify-content-center ">
                      <BiLocationPlus /> 
                      <span className="text-center mb-2">{jobLocation}</span>
                    </div>
                    </div>
                  )}
                  {expectedPackage && (
                    <div>
                      <h4 className="text-center">Salary</h4>
                      <div className="d-flex align-items-center justify-content-center ">
                       <AiFillDollarCircle />
                     <span className="text-center mb-2">{expectedPackage}</span>
                     </div>
                    </div>
                  )}
                  {formattedJobDate && (
                    <div>
                      <h4 className="text-center">Job Date</h4>
                      <div className="d-flex align-items-center justify-content-center ">
                        <FaRegCalendarTimes />
                      <span className="text-center mb-2">{formattedJobDate}</span>
                      </div>
                    </div>
                  )}
                  {seekersRegistered && (
                    <div>
                      <h4 className="text-center">Seekers Registered</h4>
                      <div className=" d-flex align-items-center justify-content-center ">
                       <AiOutlineMan />
                       <span className="text-center mb-2" >{seekersRegistered.length}</span>
                      </div>
                    </div>
                  )}
                  {jobId && (
                    <div>
                      <h4 className="text-center">Job Id</h4>
                      <div className=" d-flex align-items-center justify-content-center ">
                        <AiFillDollarCircle />
                       <span className="text-center mb-2">{jobId}</span>
                      </div>
                    </div>
                  )}
                  {isExpired && (
                    <div className="text-center">
                      <h4 className="text-center">Vacancy Status</h4>
                      <ul>
                        <li className="text-center mb-2">{isExpired}</li>
                      </ul>
                    </div>
                  )}
                  {noOfOpenings && (
                    <div className="text-center" >
                      <h4 className="text-center">Number Of Openings</h4>
                        <span className="text-center mb-2">{noOfOpenings}</span>
                    </div>
                  )}
                  {/* {applyLink && (
                    <div>
                      <h4>Apply Link</h4>
                      <div className="horizontal-container">
                        <AiOutlineLink />
                        <span><a href={applyLink} target="_blank" rel="noopener noreferrer">{applyLink}</a></span>
                      </div>
                    </div>
                  )} */}
                </div>
                <button className="apply-button w-full">
                  Apply For Referral
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default JobDescription;



