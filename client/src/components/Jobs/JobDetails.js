import React from "react";
import { useNavigate } from "react-router-dom";
import CompanyLogoImg from "../assets/company-logo.jpg";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { MdWork } from "react-icons/md";
import {MdAttachMoney} from "react-icons/md";
import {FaMoneyBillAlt} from "react-icons/fa";


function JobDetails({ job,filterValue,searchItems}) {
  const navigate = useNavigate();

  const routeChange = (id) => {
    navigate("/description", { state: { jobId: id } });
  };

  let filteredJobs = job;
  // console.log(searchVal);
  filteredJobs =
    filterValue.length !== 0
      ? job.filter(
          (currJob) =>
            filterValue.includes(currJob.jobType) ||
            filterValue.includes(currJob.jobTitle)
        )
      : job;
  
  if(searchItems.length!==0)
    filteredJobs=searchItems;
  

  const renderCard = (
    ind,
    jobId,
    companyName,
    jobTitle,
    jobType,
    jobDate,
    jobEligibility,
    jobLocation,
    expectedPackage,
    routeChange
  ) => {
    return (
      <>
        <div className={`card card-without-hover jobs-details-card`}>
          <div className="card-body">
            <div className="card-top-content">
              <div className="row">
                <div className="col-4 image-col">
                  <img
                    src={CompanyLogoImg}
                    alt="Logo not found"
                    className="company-logo"
                  />
                </div>
                <div className="col descr-col">
                  <div className="row">
                    <p className="job-descr">{jobTitle}</p>
                  </div>
                  <div className="row">
                    <p className="card-text">
                      <BsFillBuildingsFill fontSize={20} className="icon" /> {companyName}
                    </p>
                  </div>
                  <div className="row">
                    <p className="card-text">
                      <GoLocation fontSize={20} className="icon" /> {jobLocation}
                    </p>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-sm-12 col-6  details-col d-flex align-items-center justify-content-center">
                  <p className="content">
                    <span className="border border-black rounded-pill pill d-inline-block">
                      {/* {ind % 2 === 0 ? "Full Time" : "Internship"} */}
                      {jobType}
                    </span>
                  </p>
                </div>
                <div className="col-md-4 col-sm-12 col-6  details-col d-flex align-items-center justify-content-center">
                  <p className="content">
                    <span className="border border-black rounded-pill pill d-inline-block">
                      Remote
                    </span>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4 col-sm-12 col-6  details-col d-flex align-items-center justify-content-center">
                  <p className="content">
                    <span className="border border-black rounded-pill pill d-inline-block">
                      <MdWork fontSize={15} className="icon" /> 2+yrs
                    </span>
                  </p>
                </div>
                <div className="col-md-4 col-sm-12 col-6  details-col d-flex align-items-center justify-content-center">
                  <p className="content">
                    <span className="border border-black rounded-pill pill d-inline-block">
                    <MdAttachMoney fontSize={20} className="icon"/>CTC {expectedPackage}
                    </span>
                  </p>
                </div>
              </div>
            </div>

            <div className="lower-card-content">
              <button
                type="button"
                className="details-button btn btn-lg btn-dark rounded-pill float-right"
                onClick={() => routeChange(jobId)}
              >
                Details
              </button>
              <button
                type="button"
                className="ctc-button btn btn-lg btn-dark rounded-pill float-left"
              >
                <FaMoneyBillAlt fontSize={20} className="icon"/> {expectedPackage}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <h3 className="job-count">
        <b className="count-heading">
          Recommended Jobs{"  "}
          <span className="border border-black rounded-pill pill">
            {filteredJobs.length}
          </span>
        </b>
      </h3>
      <div className="row">
        {filteredJobs.map((currJob, ind) => (
          <div className="col-12 col-sm-6 col-md-4">
            {/* col-6 col-sm-6 */}
            {renderCard(
              ind,
              currJob._id,
              currJob.companyName,
              currJob.jobTitle,
              currJob.jobType,
              currJob.jobDate,
              currJob.jobEligibility,
              currJob.jobLocation,
              currJob.expectedPackage,
              routeChange
            )}
          </div>
        ))}
      </div>
    </>
  );
}

export default JobDetails;
