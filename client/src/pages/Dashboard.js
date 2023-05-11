import React from "react";
import "./Dashboard.css";
import RenderUsersInCards from "../components/DashboardComponent/RefferedJobCard/RenderUsersInCards";
import Sidemenu from "../components/DashboardComponent/sidemenu/Sidemenu";
import FileUploader from "../components/FileUploader/FileUploader";
import TopHeading from "../components/DashboardComponent/TopHeading/TopHeading";
import SeekerJobDetails from "../components/DashboardComponent/SeekerJobDetails";
import Cookies from "js-cookie";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const isLoggedIn =
    Cookies.get("userId") !== undefined && Cookies.get("userId") !== "";
  const userType = Cookies.get("userType");

  if (!isLoggedIn) {
    return <Navigate to="/" />;
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
        {userType === "seeker" ? (
          <div>
            <div className="ResumeSec">
              <div className="uploadSection">
                <FileUploader />
                <p>
                  Resume can be in pdf, doc, docs, png, jpg format. File size
                  upto 5Mb
                </p>
              </div>
            </div>
            <div className="RefferalChart">
              <RenderUsersInCards />
            </div>
            <div className="appliedJob">
              <SeekerJobDetails />
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
