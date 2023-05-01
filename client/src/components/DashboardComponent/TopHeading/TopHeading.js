import React from "react";
import "./heading.css";
import { MdNotificationAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import SeekerName from "./SeekerName";

function Heading() {
  return (
    <div className="top">
      <div className="top-left">Dashboard</div>
      <div className="top-right">
        <div className="top-notification-icon">
          <i className="fa fa-bell">
            <MdNotificationAdd />
          </i>
        </div>
        <div className="top-profile-icon">
          <i className="fa fa-user">
            <CgProfile />
          </i>
        </div>
        <SeekerName seekerId={"644d6ef36ff422399c1639f2"} />
        {/* <h4>Shiva Jha</h4> */}
      </div>
    </div>
  );
}

export default Heading;
