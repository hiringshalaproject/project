import BootstrapCard from "./BootstrapCards";
import { useState, useEffect } from "react";
import fetchSeeker from "./FetchSeeker";
import fetchEmployee from "./FetchEmployee.js";
import "./BootstrapCards.css";
import RoundButton from "../sidemenu/RoundButton";
import { Container } from "react-bootstrap";
import SearchJob from "../../assets/job-search.png";
import Cookies from "js-cookie";

const RenderUsersInCards = () => {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);
  const userType = Cookies.get("hiringShala_userType");
  useEffect(() => {
    const updateUsers = async () => {
      let myData = userType === "employee" ? await fetchEmployee() : await fetchSeeker();

      setUsers(myData);
    };
    updateUsers();
  }, []);

  const displayedUsers = showAll ? users : users.slice(0, 3);

  // Text variables based on user type
  const headerText = userType === "employee" ? "Successful Referred Candidates" : "Successful Referrals";
  const noReferralsText = userType === "employee" ? "You haven’t referred any candidates yet. Keep referring." : "You haven’t received any referrals yet. Keep applying.";

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
        <div style={{ fontWeight: "300px", fontSize: "20px" }}>
          {noReferralsText}
        </div>
      )}
    </div>
  );
};

export default RenderUsersInCards;
