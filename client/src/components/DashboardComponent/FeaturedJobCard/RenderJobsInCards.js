import BootstrapCard from "./BootstrapCards";
import { useState, useEffect } from "react";
import fetchJobs from "./FetchJob";
import "./BootstrapCards.css";
import RoundButton from "../sidemenu/RoundButton";
import { Container } from "react-bootstrap";
import SearchJob from "../../assets/job-search.png";

const RenderJobsInCards = () => {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const updateUsers = async () => {
      let myData = await fetchJobs();

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
      <RoundButton
        onClick={() => setShowAll(!showAll)}
        text={showAll ? "Show Less" : "explore more"}
        className={"ListedjobButton"}
      />
    </div>
  );
};

export default RenderJobsInCards;
