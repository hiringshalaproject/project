import React from "react";
import "./heading.css";
import { MdNotificationAdd } from "react-icons/md";
import { CgProfile } from "react-icons/cg";

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
        <h4>Shiva Jha</h4>
      </div>
    </div>
  );
}

export default Heading;
