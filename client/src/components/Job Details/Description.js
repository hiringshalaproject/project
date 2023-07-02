import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { motion } from 'framer-motion';


const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
const apiUrlSecondary = "/api/v1/jobs/";

const JobDescription = () => {
  const [companyDetails, setCompanyDetails] = useState(null);

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  const fetchCompanyDetails = () => {
    axios.post(`${apiUrl + apiUrlSecondary}`)
      .then(response => {
        const companyId = "6431a3b60212c614a61e9741";
        const companyDetails = response.data.find(company => company._id === companyId);
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

  return (
    <div className="mt-20 Jobdetails">
      <div className="container">
        <div className="row">
          <div className="col-lg-8">
            <motion.h1 className="m-3 text-red-600" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
              {companyName}
            </motion.h1>
            {jobTitle && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
                <h2 className="ml-3">-{jobTitle}</h2>
              </motion.div>
            )}
            <div className="mt-3 ml-3">
              <h4>Job Description</h4>
              <ul>
                <li>{__v}</li>
              </ul>
              {jobEligibility && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.4 }}>
                  <h4>Job Eligibility</h4>
                  <ul>
                    <li>{jobEligibility}</li>
                  </ul>
                </motion.div>
              )}
              {jobRequirements && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.6 }}>
                  <h4>Job Requirements</h4>
                  <ul>
                    <li>{jobRequirements}</li>
                  </ul>
                </motion.div>
              )}
            </div>
          </div>

          <div className="col-lg-4 d-flex flex-column mb-2">
            <div className="flex-grow-1">
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
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
              </motion.div>
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="btn btn-primary mt-3 mb-3 w-100"
              >
                Apply Now
              </motion.button>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 1.2 }}
                className="p-4 bg-transparent border rounded-2xl mt-3"
              >
                {jobLocation && (
                  <div>
                    <h4>Job Location</h4>
                    <ul className="flex gap-x-5">
                      <li className="list-disc">{jobLocation}</li>
                    </ul>
                  </div>
                )}
                {expectedPackage && (
                  <div>
                    <h4>Salary</h4>
                    <ul>
                      <li>{expectedPackage}</li>
                    </ul>
                  </div>
                )}
                {formattedJobDate && (
                  <div>
                    <h4>Job Date</h4>
                    <ul>
                      <li>{formattedJobDate}</li>
                    </ul>
                  </div>
                )}              {seekersRegistered && (
                   <div>
                     <h4>Seekers Registered</h4>
                     <ul>
                       <li>{seekersRegistered}</li>
                     </ul>
                   </div>
                 )}
                 {jobId && (
                   <div>
                     <h4>Job Id</h4>
                     <ul>
                       <li>{jobId}</li>
                     </ul>
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
                 {applyLink && (
                   <div>
                    <h4>Apply Link</h4>
                   <ul>
                     <li>{applyLink}</li>
                     </ul>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JobDescription;




