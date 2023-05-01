import React from "react";
import "./Dashboard.css";
import RenderUsersInCards from "../components/DashboardComponent/RefferedJobCard/RenderUsersInCards";
import Sidemenu from "../components/DashboardComponent/sidemenu/Sidemenu";
import FileUploader from "../components/FileUploader/FileUploader";
import TopHeading from "../components/DashboardComponent/TopHeading/TopHeading";
import SeekerJobDetails from "../components/DashboardComponent/SeekerJobDetails";

const Dashboard = () => (
  // <div>
  //   <RenderUsersInCards />
  // </div>
  <div className="dashboard">
    <div className="sideMenu">
      {/* <Link to="/" style={{ display: "flex" }}>
        <img src={Logo} alt="Logo" />
        <h2 className="font-bold ml-2" style={{ marginTop: "20px" }}>
          HiringSala
        </h2>
      </Link> */}
      <Sidemenu />
    </div>
    <div className="mainContent">
      <div className="topMenu">
        <TopHeading />
      </div>
      <div className="ResumeSec">
        <div className="uploadSection">
          <FileUploader />
          <p>
            Resume can be in pdf, doc, docs, png, jpg format. File size upto 5Mb
          </p>
        </div>
      </div>
      <div className="RefferalChart">
        <RenderUsersInCards />
      </div>
      <div className="appliedJob">
        <SeekerJobDetails seekerId="644d6ef36ff422399c1639f2" />
      </div>
    </div>
  </div>
);

export default Dashboard;
