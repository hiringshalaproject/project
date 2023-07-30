import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from React Router
import BootstrapCard from "./BootstrapCards";
import { Container } from "react-bootstrap";
import SearchJob from "../../assets/job-search.png";
import fetchJobs from "./FetchJob";
import "./BootstrapCards.css";
import RoundButton from "../sidemenu/RoundButton";

const RenderJobsInCards = ({ jobData }) => {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const updateUsers = async () => {
      let myData = await jobData;

      setUsers(myData);
    };
    updateUsers();
  }, []);
  const displayedUsers = showAll ? users : users.slice(0, 3);

  return (
    <div className="user-cards-container">
      <div className="user-cards-header">
        <h2 style={{ fontSize: "25px", color: "#636C86", fontWeight: "600" }}>
          Featured Openings
        </h2>
      </div>

      {displayedUsers.length > 0 ? (
        <Container className="card-container">
          <div className="card-row">
            {displayedUsers.map((user, index) => {
              return (
                <BootstrapCard user={user} ImgSrc={SearchJob} key={index} />
              );
            })}
          </div>
        </Container>
      ) : (
        <div style={{ fontWeight: "300px", fontSize: "20px" }}>Loading....</div>
      )}
      <Link to="/JobList">
        {" "}
        {/* Use Link component for navigation */}
        <RoundButton
          onClick={() => setShowAll(!showAll)}
          text={showAll ? "Show Less" : "explore more"}
          className={"ListedjobButton"}
        />
      </Link>
    </div>
  );
};

export default RenderJobsInCards;
