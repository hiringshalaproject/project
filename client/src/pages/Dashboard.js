import {React, useState, useEffect} from "react";
import "./Dashboard.css";
import RenderUsersInCards from "../components/DashboardComponent/RefferedJobCard/RenderUsersInCards";
import Sidemenu from "../components/DashboardComponent/sidemenu/Sidemenu";
import FileUploader from "../components/FileUploader/FileUploader";
import TopHeading from "../components/DashboardComponent/TopHeading/TopHeading";
import SeekerJobDetails from "../components/DashboardComponent/SeekerJobDetails";
import EmployeeJobDetails from "../components/DashboardComponent/EmployeeJobDetails";
import Cookies from "js-cookie";
import { Navigate, useLocation } from "react-router-dom";
import RenderJobsInCards from "../components/DashboardComponent/FeaturedJobCard/RenderJobsInCards";
import fetchSeeker from "../components/DashboardComponent/RefferedJobCard/FetchSeeker.js";
import fetchEmployee from "../components/DashboardComponent/RefferedJobCard/FetchEmployee.js";
import fetchJobs from "../components/DashboardComponent/FeaturedJobCard/FetchJob";

function Dashboard() {
  const [userDataReady, setUserDataReady] = useState(false);
  const [jobDataReady, setJobDataReady] = useState(false);
  const [userData, setUserData] = useState(false);
  const [jobData, setJobData] = useState(false);
  const isLoggedIn =
    Cookies.get("userId") !== undefined && Cookies.get("userId") !== "";
  const userType = Cookies.get("userType");
  const isSeeker = userType === "seeker";
  const isEmployee = userType === "employee";
  const location = useLocation();
  const jobId = location.state?.jobId;
  useEffect(() => {
    if (userType === "employee") {
      fetchEmployee().then((userDataResponse) => {
        setUserData(userDataResponse);
        setUserDataReady(true);
      }).catch((error) => {
        console.error("Error fetching employee data:", error);
        setUserDataReady(false);
      });
    } else {
      fetchSeeker().then((userDataResponse) => {
        setUserData(userDataResponse);
        setUserDataReady(true);
      }).catch((error) => {
        console.error("Error fetching seeker data:", error);
        setUserDataReady(false);
      });
    }
    fetchJobs().then((jobDataResponse) => {
      setJobData(jobDataResponse);
      setJobDataReady(true);
    }).catch((error) => {
      console.error("Error fetching job data:", error);
      setJobDataReady(false);
    });
  }, [userType]);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  if (isLoggedIn && jobId !== undefined) {
    return <Navigate to="/description" state = {{ jobId: jobId }} />;
  }

  return (
    <div className="dashboard">
      <div className="sideMenu">
        <Sidemenu />
      </div>
      <div className="mainContent">
        <div className="topMenu">
          <TopHeading />
        </div>
        {isSeeker && userDataReady && (
          <div className="ResumeSec">
            <p style={{ display: "inline-flex", marginBottom: "10px" }}>
              Upload your Resume (Optional)
            </p>
            <div className="uploadSection">
              <FileUploader />
              <p>Resume can be in pdf, doc, docs format. File size up to 5Mb</p>
            </div>
          </div>
        )}
        <div className="RefferalChart">
          {userDataReady && jobDataReady && <RenderUsersInCards userData = {userData} jobData = {jobData}/>}
        </div>
        <div className="appliedJob">{isSeeker && userDataReady && jobDataReady && <SeekerJobDetails userData = {userData} jobData = {jobData}/>}</div>
        <div className="appliedJob">{isEmployee && userDataReady && jobDataReady && <EmployeeJobDetails userData = {userData} jobData = {jobData}/>}</div>
        <div className="FeaturedJob">
          {jobDataReady && <RenderJobsInCards jobData={jobData}/>}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
