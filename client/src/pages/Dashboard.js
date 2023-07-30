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
  const [dataReady, setDataReady] = useState(false);
  const [userData, setUserData] = useState(false);
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
        setDataReady(true);
      }).catch((error) => {
        console.error("Error fetching employee data:", error);
        setDataReady(true);
      });
    } else {
      fetchSeeker().then((userDataResponse) => {
        setUserData(userDataResponse); // Set userData when data is fetched
        setDataReady(true); // Set dataReady to true when data is fetched
      }).catch((error) => {
        console.error("Error fetching seeker data:", error);
        setDataReady(true);
      });
    }
  }, [userType]);
  let jobData = fetchJobs();
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
        {isSeeker && dataReady && (
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
          <RenderUsersInCards userData = {userData} jobData = {jobData}/>
        </div>
        <div className="appliedJob">{isSeeker && <SeekerJobDetails userData = {userData} jobData = {jobData}/>}</div>
        <div className="appliedJob">{isEmployee && <EmployeeJobDetails userData = {userData} jobData = {jobData}/>}</div>
        <div className="FeaturedJob">
          <RenderJobsInCards jobData={jobData}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
