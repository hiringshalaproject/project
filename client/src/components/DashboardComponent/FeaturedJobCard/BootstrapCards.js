import React from "react";
import "./BootstrapCards.css";
import { AiFillDollarCircle } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CompanyLogoImg from "../../assets/company-logo.jpg";
import { BsFillBuildingsFill } from "react-icons/bs";
import { GoLocation } from "react-icons/go";
import { MdWork } from "react-icons/md";
import { MdAttachMoney } from "react-icons/md";
// import "../../../jobList.css";
const BootstrapCards = ({ user, ImgSrc }) => {
  // Convert single user object to an array if necessary
  const users = Array.isArray(user) ? user : [user];
  const navigate = useNavigate();

  const routeChange = (id) => {
    navigate("/description", { state: { jobId: id } });
  };
  const renderCard = (
    jobId,
    companyName,
    jobTitle,
    jobType,
    jobLocation,
    expectedPackage,
    isExpired,
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
                      <BsFillBuildingsFill fontSize={20} className="icon" />{" "}
                      {companyName}
                    </p>
                  </div>
                  <div className="row">
                    <p className="card-text">
                      <GoLocation fontSize={20} className="icon" />{" "}
                      {jobLocation}
                    </p>
                  </div>
                </div>
              </div>
              <div className="value-div-outer">
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
            <div className="lower-card-content">
              <button
                type="button"
                className="ctc-button btn btn-lg btn-dark rounded-pill float-left"
              >
                {isExpired ? "Expired" : "Active"}
              </button>
              <button
                type="button"
                className="details-button btn btn-lg btn-dark rounded-pill float-right"
                onClick={() => routeChange(jobId)}
              >
                Details
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="row">
      {users.map((currJob, ind) => (
        <div className="col-12 col-sm-6 col-md-4" key={ind}>
          {renderCard(
            currJob._id,
            currJob.companyName,
            currJob.jobTitle,
            currJob.jobType,
            currJob.jobLocation,
            currJob.expectedPackage,
            currJob.isExipred,
            routeChange
          )}
        </div>
      ))}
    </div>
  );
};

export default BootstrapCards;
