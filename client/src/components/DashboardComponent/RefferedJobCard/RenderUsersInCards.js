import BootstrapCard from "./BootstrapCards";
import { useState, useEffect } from "react";
import fetchUsers from "./FetchData";
import "./BootstrapCards.css";
import RoundButton from "../sidemenu/RoundButton";
import { Container, Row, Col } from "react-bootstrap";
import SearchJob from "../../assets/job-search.png";

const RenderUsersInCards = () => {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const updateUsers = async () => {
      let myData = await fetchUsers();

      setUsers(myData);
    };
    updateUsers();
  }, []);

  const displayedUsers = showAll ? users : users.slice(0, 3);

  return (
    <div className="user-cards-container">
      <div className="user-cards-header">
        <h2 style={{ fontSize: "25px", color: "#636C86", fontWeight: "600" }}>
          Successful Referrals
        </h2>

        {users.length > 0 && (
          <RoundButton
            onClick={() => setShowAll(!showAll)}
            text={showAll ? "Show Less" : "Show All"}
            className={"RefferedjobButton"}
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
          You haven’t received any referrals yet. Keep applying.
        </div>
      )}
    </div>
  );
};

export default RenderUsersInCards;
