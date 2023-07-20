import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import Footer from "../Footer/Footer";
import axios from 'axios';
import {AiFillDollarCircle, AiOutlineMan} from "react-icons/ai"
import {FaRegCalendarTimes} from "react-icons/fa"
import {BiLocationPlus} from "react-icons/bi"
import Cookies from "js-cookie";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";


const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
const apiUrlSecondary = "/api/v1/jobs";

const JobDescription = () => {
  const location = useLocation();
  const jobid = location.state?.jobId;
  const seekerId = Cookies.get("userId")
  const isLoggedIn = seekerId !== undefined && seekerId !== "";
  const navigate = useNavigate();

  const applyJobFlow = () => {
    const userId = Cookies.get("userId");
    const token = Cookies.get("token");
    const headers = {
      authorization: `Bearer ${token}`,
    };
    const formData = {
      jobId : jobid
    };
    axios
        .patch(`${apiUrl}/api/v1/seekers/apply/${seekerId}`, formData)
        .then((res) => {
          toast.success("Applied SuccessFully");
          const response = axios.get(
            `${apiUrl}/api/v1/seekers/${userId}`
            , { headers })
            .then((res) => {
              const stringifiedUserDetails = JSON.stringify(res.data.seeker);
              sessionStorage.setItem("hiringShala_user", stringifiedUserDetails);  
            })
            .catch((e) => {
              if (e.response) {
                  toast.error(e.response.data.msg);
                } else if (e.request) {
                  toast.error("Network failure or timeout");
              } else {
                  toast.error("An unexpected error occurred");
                }
          });
          
          
        })
      .catch((error) => {
            if (error.response) {
                toast.error(error.response.data.msg);
              } else if (error.request) {
                toast.error("Network failure or timeout");
            } else {
                toast.error("An unexpected error occurred");
              }
        });
};

  const applyForReferalFlow = () => {
    if (isLoggedIn) {
      applyJobFlow();
    }
    else {
      navigate("/seeker/login", { state: { jobId: jobid } });
    }
  };


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
    seekersRegistered,
    jobId,
    noOfOpenings,
    isExpired,
  } = companyDetails;

  const formattedJobDate = jobDate ? new Date(jobDate).toLocaleDateString() : '';
  const sentences = jobRequirements.split(". ");

  return (
    <>
    <div className="mt-20 mb-4 Jobdetails">
      <div className="container">
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
              <h4 className= "job-desc-text">Job Description</h4>
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
              <div
                className="flex align-item-center justify-content-center gap-x-10"
              >
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
              <div className="p-4 bg-transparent border rounded-2xl mt-3 job-box" >
                {jobLocation && (
                  <div>
                    <h4>Job Location</h4>
                    <div className="horizontal-container">
                      <BiLocationPlus />
                      <span>{jobLocation}</span>
                    </div>
                  </div>
                )}
                {expectedPackage && (
                  <div>
                    <h4>Salary</h4>
                    <div className="horizontal-container">
                      <AiFillDollarCircle />
                      <span>{expectedPackage}</span>
                    </div>
                  </div>
                )}
                {formattedJobDate && (
                  <div>
                    <h4>Job Date</h4>
                    <div className="horizontal-container">
                      <FaRegCalendarTimes />
                      <span>{formattedJobDate}</span>
                    </div>
                  </div>
                )}              {seekersRegistered && (
                   <div>
                     <h4>Candidates Interested</h4>
                     <div className="horizontal-container">
                      <AiOutlineMan />
                      <span>{seekersRegistered.length}</span>
                    </div>
                   </div>
                 )}
                 {jobId && (
                   <div>
                     <h4>Job Id</h4>
                     <div className="horizontal-container">
                      <AiFillDollarCircle />
                      <span>{jobId}</span>
                    </div>
                   </div>
                 )}
                 {isExpired && (
                   <div>
                     <h4>Vacancy Status</h4>
                     <ul>
                       <li>{isExpired}</li>
                     </ul>
                   </div>
                 )}
                 {noOfOpenings && (
                   <div>
                     <h4>Number Of Openings</h4>
                    <ul>
                      <li>{noOfOpenings}</li>
                    </ul>
                  </div>
                )}
              </div>
              <button
                  className="apply-button "
                  onClick={event=>applyForReferalFlow()}
              >
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



