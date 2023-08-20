import { MDBCard, MDBCardBody } from "mdb-react-ui-kit";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import JobCard from "../Card/JobCard";
import axios from "axios";
import { toast } from "react-hot-toast";

const FeaturedOpenings = () => {
  const [job,setJob]=useState([]);
  const navigate = useNavigate();

  const routeChange = (id) => {
    navigate("/description", { state: { jobId: id } });
  };

  const routeJob = (type) => {
    navigate("/joblist", { state: { type: type } });
  };
  
  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
    const GetAllJobs = async () => {
      const stringifiedJobList = sessionStorage.getItem("hiringShala_jobList");
      var updatedJobList = JSON.parse(stringifiedJobList);
      if (stringifiedJobList === null) {
        await axios
          .post(`${apiUrl}/api/v1/jobs/`)
          .then((response) => {
            updatedJobList = response.data;
            setJob(updatedJobList);
            const updatedJobListString = JSON.stringify(response.data);
            sessionStorage.setItem("hiringShala_jobList", updatedJobListString);
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
      } else setJob(updatedJobList);
      
    
    };
    GetAllJobs();
  }, []);

  return (
    <div className="ml-10 mt-3 my-card-div">
      <MDBCard className="top-card">
        <MDBCardBody className="d-flex justify-between items-center sm:flex-row sm:items-center text-[30px] font-poppins p-3">
          <span className="font-semibold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent heading-div">Featured Openings</span>
          <div className="button-div">
          <button
            className="btn btn-success float-right dashboard-btn"
            onClick={() => routeJob("Job")}
          >
            Explore More
          </button>
          </div>
        </MDBCardBody>
        
      </MDBCard>
      <MDBCard className="result-card">
        <div className="row">
          {job.map((job, ind) => (
            <div className="col-12 col-sm-6 col-md-4 " key={ind}>
            {console.log(job)}
            {ind<3 && 
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
            }
            </div>
          ))}
        </div>
      </MDBCard>
    </div>
  );
};

export default FeaturedOpenings;
