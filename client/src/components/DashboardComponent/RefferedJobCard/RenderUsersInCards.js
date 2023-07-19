import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import SearchJob from "../../assets/job-search.png";
import Cookies from "js-cookie";
import BootstrapCard from "./BootstrapCards";
import RoundButton from "../sidemenu/RoundButton";

const filterData = (responseData, jobData) => {
  const jobIds = responseData.appliedJobList
    .filter((appliedJob) => appliedJob.referralStatus === true)
    .map((appliedJob) => appliedJob.jobId);

  const filteredJobs = jobData.filter((job) => jobIds.includes(job._id));
  return filteredJobs;
};

const RenderUsersInCards = ({ userData, jobData }) => {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const userType = Cookies.get("userType");

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (userType === "employee") {
          setUsers(userData);
        } else {
          const resolvedJobData = await jobData;
          const resolveduserData = await userData;
          let filteredData = filterData(resolveduserData, resolvedJobData);
          setUsers(filteredData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchData();
  }, [userData, jobData]);

  const dataArray = showAll ? users : users.slice(0, 3);

  // Text variables based on user type
  const headerText =
    userType === "employee" ? "Successful Referred Candidates" : "Successful Referrals";
  const noReferralsText =
    userType === "employee"
      ? "You haven’t referred any candidates yet. Keep referring."
      : "You haven’t received any referrals yet. Keep applying.";

  return (
    <div className="user-cards-container">
      <div className="user-cards-header">
        <h2 style={{ fontSize: "25px", color: "#636C86", fontWeight: "600" }}>
          {headerText}
        </h2>

        {users.length > 0 && (
          <RoundButton
            onClick={() => setShowAll(!showAll)}
            text={showAll ? "Show Less" : "Show All"}
            className={"ReferredJobButton"}
          />
        )}
      </div>

      {dataArray.length > 0 ? (
        <Container className="card-container">
          <div className="card-row">
            {dataArray.map((user, index) => {
              return <BootstrapCard user={user} ImgSrc={SearchJob} key={index} />;
            })}
          </div>
        </Container>
      ) : (
        <div style={{ fontWeight: "300px", fontSize: "20px" }}>{noReferralsText}</div>
      )}
    </div>
  );
};

export default RenderUsersInCards;
