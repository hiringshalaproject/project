import React, { useEffect, useState } from "react";
import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import "./SuccessfulReferrals.css";
import JobCard from "../Card/JobCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NotFoundImg from "../assets/not-found-img.png";
const SuccessfulReferral = () => {
  const [referredJob, setReferredJob] = useState([]);
  const seekerId = "6461407952dfe32072b74e91";
  const [displayedJobCount, setDisplayedJobCount] = useState(6);
  const navigate = useNavigate();

  const routeChange = (id) => {
    navigate("/description", { state: { jobId: id } });
  };

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

    const GetSeeker = async () => {
      const allJobsResponse = await axios.post(`${apiUrl}/api/v1/jobs/`);
      const allJobs = allJobsResponse.data;
      const seekerResponse = await axios.get(
        `${apiUrl}/api/v1/seekers/${seekerId}`
      );
      const seekerData = seekerResponse.data.seeker;
      const appliedJobs = seekerData.appliedJobList;
      const newReferredJobs = appliedJobs
        .filter((currJob) => currJob.referralStatus === true)
        .map((currJob) => currJob.jobId);

      const filteredJobs = allJobs.filter((currJob) =>
        newReferredJobs.includes(currJob._id)
      );
      setReferredJob(filteredJobs);
    };

    GetSeeker();
  }, [seekerId]);

  //   console.log(referredJob);
  return (
    <div className="ml-10 mt-3 my-card-div">
      <MDBCard className="top-card">
        <MDBCardBody className="d-flex justify-between items-center sm:flex-row sm:items-center text-[30px] font-poppins p-3">
          <span className="font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent heading-div">
            Successful Referrals
          </span>
          <div className="button-div">
            <button
              className="btn btn-primary mx-2 float-right dashboard-btn"
              onClick={() => setDisplayedJobCount(6)}
            >
              Show Less
            </button>
            <button
              className="btn btn-success float-right dashboard-btn"
              onClick={() => setDisplayedJobCount(referredJob.length)}
            >
              Show All
            </button>
          </div>
        </MDBCardBody>
      </MDBCard>
      <MDBCard className="result-card">
        {referredJob.length === 0 ? (
          <div className="d-flex justify-content-center relative">
            <img
              src={NotFoundImg}
              alt="not found"
              className="w-[220px] h-[220px] mt-2"
            />
            <div className="absolute top-0 left-42 border-2 border-blue-300 mascot-text rounded-lg">
              <span className="font-poppins font-semibold text-[18px] bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                No referral yet.Keep applying!!
              </span>
            </div>
          </div>
        ) : (
          <div className="row">
            {referredJob.slice(0, displayedJobCount).map((job, ind) => (
              <div className="col-12 col-sm-6 col-md-4" key={ind}>
                <JobCard
                  jobId={job._id}
                  companyName={job.companyName}
                  jobTitle={job.jobTitle}
                  jobType={job.jobType}
                  jobLocation={job.jobLocation}
                  expectedPackage={job.expectedPackage}
                  isExpired={job.isExpired}
                  routeChange={routeChange}
                />
              </div>
            ))}
          </div>
        )}
      </MDBCard>
    </div>
  );
};

export default SuccessfulReferral;
