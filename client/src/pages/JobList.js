import axios from "axios";
import React, { useEffect, useState } from "react";
import "./jobList.css";
import { BsBookmark } from "react-icons/bs";
import { FaAmazon } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import JobsSideNav from "../components/Navbar/JobsSideNav";
import JobDescription from "../components/Job Details/Description";

const JobList = () => {
  const [job, setJob] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
    const GetAllJobs = async () => {
      axios.post(`${apiUrl}/api/v1/jobs/`).then((response) => {
        setJob(response.data);
      });
    };
    GetAllJobs();
  }, []);

  const getRandomLightColor = () => {
    const letters = "ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  };

  const renderCard = (
    ind,
    companyName,
    jobTitle,
    jobDate,
    jobEligibility,
    jobLocation,
    expectedPackage
  ) => {
    return (
      <>
        <div
          className={`card jobs-details-card ${
            ind % 2 === 0 ? "leftmost-card" : "joblist-card"
          }`}
        >
          <div className="card-body">
            <div
              className="card-top-content border border-black"
              style={{ backgroundColor: getRandomLightColor() }}
            >
              <div className="row justify-content-between">
                <div className="col-6 text-left">
                  <p className="content">
                    <span className="border border-black rounded-pill pill">
                      {jobDate.substring(0, 10)}
                    </span>
                  </p>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center">
                  <BsBookmark fontSize={20} />
                </div>
              </div>
              <div className="row">
                <div className="col-6 text-left">
                  <h5 className="card-title content">{companyName}</h5>
                  <h3 className="card-title content">{jobTitle}</h3>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center">
                  <FaAmazon fontSize={40} />
                </div>
              </div>
              <div className="row">
                <div className="col-6 d-flex align-items-left justify-content-left">
                  <p className="content">
                    <span className="border border-black rounded-pill pill">
                      Project Work
                    </span>
                  </p>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center">
                  <p className="content">
                    <span className="border border-black rounded-pill pill">
                      <MdWork fontSize={20} className="experience-icon" />{" "}
                      2+years
                    </span>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-6 d-flex align-items-left justify-content-left">
                  <p className="content">
                    <span className="border border-black rounded-pill pill">
                      Full Time
                    </span>
                  </p>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center">
                  <p className="content">
                    <span className="border border-black rounded-pill pill">
                      Senior Level
                    </span>
                  </p>
                </div>
              </div>

              {/* <p className="card-text content">{jobEligibility}</p> */}
            </div>
            <div className="container lower-card-content">
              <div className="row">
                <div className="col-6">
                  <p className="card-text">{expectedPackage}</p>
                  <p className="card-text">{jobLocation}</p>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center">
                  <button
                    type="button"
                    className="btn btn-lg btn-dark rounded-pill"
                  >
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <JobsSideNav />
      <h3 className="job-count">
        <b>Recommended Jobs </b>{" "}
        <span className="border border-black rounded-pill pill">
          {job.length}
        </span>
      </h3>
      <div className="row">
        {job.map((currJob, ind) => (
          <div className="col-6">
            {renderCard(
              ind,
              currJob.companyName,
              currJob.jobTitle,
              currJob.jobDate,
              currJob.jobEligibility,
              currJob.jobLocation,
              currJob.expectedPackage
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default JobList;
