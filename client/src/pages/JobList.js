import axios from "axios";
import React, { useEffect, useState } from "react";
import "./jobList.css";
import { BsBookmark } from "react-icons/bs";
import { FaAmazon } from "react-icons/fa";
import { MdWork } from "react-icons/md";
import JobsSideNav from "../components/Navbar/JobsSideNav";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const JobList = () => {
  const navigate = useNavigate();
  const [job, setJob] = useState([]);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
    const GetAllJobs = async () => {
      axios.post(`${apiUrl}/api/v1/jobs/`)
      .then((response) => {
        setJob(response.data);
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

  const routeChange = (event, id) => {
    // event.preventDefault();
    console.log("Button clicked");
    navigate("/description", { state: { jobId: id } });
  };

  const renderCard = (
    ind,
    jobId,
    companyName,
    jobTitle,
    jobDate,
    jobEligibility,
    jobLocation,
    expectedPackage,
    routeChange
  ) => {
    return (
      <>
        <div
          className={`card card-without-hover jobs-details-card ${
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
                    <span className="border border-black rounded-pill pill d-inline-block">
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
                    <span className="border border-black rounded-pill pill d-inline-block">
                      Project Work
                    </span>
                  </p>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center">
                  <p className="content">
                    <span className="border border-black rounded-pill pill d-inline-block">
                      <MdWork fontSize={20} className="experience-icon" />{" "}
                      2+years
                    </span>
                  </p>
                </div>
              </div>
              <div className="row">
                <div className="col-6 d-flex align-items-left justify-content-left">
                  <p className="content">
                    <span className="border border-black rounded-pill pill d-inline-block">
                      Full Time
                    </span>
                  </p>
                </div>
                <div className="col-6 d-flex align-items-center justify-content-center">
                  <p className="content">
                    <span className="border border-black rounded-pill pill d-inline-block">
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
                    style={{pointerEvents:"visible"}}
                    onClick={event=>routeChange(event,jobId)}
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
        <b className="count-heading">
          Recommended Jobs{"  "}
          <span className="border border-black rounded-pill pill">
            {job.length}
          </span>
        </b>
      </h3>
      <div className="row">
        {job.map((currJob, ind) => (
          <div className="col-12 col-6 col-sm-6">
            {renderCard(
              ind,
              currJob._id,
              currJob.companyName,
              currJob.jobTitle,
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
};

export default JobList;
