import React from "react";
import CompanyLogoImg from "../assets/company-logo.jpg";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { MdWork } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import "../Dashboard/SuccessfulReferrals.css";
import "../../pages/jobList.css";
import "./jobcard.css";
const JobCard = ({
  jobId,
  companyName,
  jobTitle,
  jobType,
  jobLocation,
  expectedPackage,
  isExpired,
  routeChange,
}) => {
  return (
    <>
      <MDBCard className="job-card shadow-md">
        <MDBCardBody className="text-[20px] font-poppins ">
          <div className="card-top-content">
            <div className="row">
              <div className="col-4">
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
                    <BsFillBuildingsFill fontSize={20} className="icon" />{" "}
                    {companyName}
                  </p>
                </div>
                <div className="row">
                  <p className="card-text">
                    <GoLocation fontSize={20} className="icon" /> {jobLocation}
                  </p>
                </div>
              </div>
            </div>
            <div >
              <div className="value-div-inner">
                <span className="border border-black rounded-pill pill">
                  {jobType}
                </span>
              </div>
              <div className="value-div-inner">
                <span className="border border-black rounded-pill pill">
                  Remote
                </span>
              </div>
              <div className="value-div-inner">
                <span className="border border-black rounded-pill pill">
                  <MdWork fontSize={15} className="icon" /> 2+yrs
                </span>
              </div>
              <div className="value-div-inner">
                <span className="border border-black rounded-pill pill">
                  <MdAttachMoney fontSize={20} className="icon" />
                  CTC {expectedPackage}
                </span>
              </div>
            </div>
          </div>
          <hr className="hr" />
          <div>
            <button
              type="button"
              className={`btn btn-lg ${!isExpired?'btn-success':'btn-danger'} rounded-pill float-left`}
            >
              {isExpired ? "Expired" : "Active"}
            </button>
            <button
              type="button"
              className="btn btn-lg btn-dark rounded-pill float-right"
              onClick={() => routeChange(jobId)}
            >
              Details
            </button>
          </div>
        </MDBCardBody>
      </MDBCard>
    </>
  );
};

export default JobCard;
