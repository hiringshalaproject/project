import React from "react";
import "./Dashboard.css";
import RenderUsersInCards from "../components/RefferedJobCard/RenderUsersInCards";
import Sidemenu from "../components/sidemenu/Sidemenu";
import FileUploader from "../components/FileUploader/FileUploader";

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
      <div className="topMenu"></div>
      <div className="ResumeSec">
        <div className="uploadSection">
          <FileUploader />
          <text>
            Resume can be in pdf, doc, docs, png, jpg format. File size upto 5Mb
          </text>
        </div>
      </div>
      <div className="RefferalChart">
        <RenderUsersInCards />
      </div>
      <div className="appliedJob"></div>
    </div>
  </div>
);

export default Dashboard;
