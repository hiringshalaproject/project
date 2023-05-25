import React from "react";
import "./BootstrapCards.css";
import { AiFillDollarCircle } from "react-icons/ai";

const BootstrapCards = ({ user, ImgSrc }) => {
  // Convert single user object to an array if necessary
  const users = Array.isArray(user) ? user : [user];

  return (
    <div className="card-container">
      <div className="card-row">
        {users.map((user, index) => (
          <div className="card-column" key={index}>
            <div className="card h-100">
              {/* <img src={ImgSrc} alt="img"></img> */}
              <div className="card-body card-content">
                <h3 className="card-title">{user.companyName}</h3>
                <h4>{user.jobLocation}</h4>
                <p>
                  the largest pool of career opportunities that match your skill
                  set. link up with outstanding people to create a better
                  future.
                </p>
                <p>
                  <span
                    style={{ display: "inline-flex", alignItems: "center" }}
                  >
                    <AiFillDollarCircle className="dollar-icon" />
                    <span style={{ marginLeft: "0.5rem" }}>
                      {user.expectedPackage}
                    </span>
                    <span style={{ marginLeft: "0.2rem" }}>per annum</span>
                  </span>
                </p>
              </div>
              <button type="submit" className="btn card-button">
                View details
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BootstrapCards;
