import BootstrapCard from "./BootstrapCards";
import { useState, useEffect } from "react";
import fetchUsers from "./FetchData";
import "./BootstrapCards.css";

const RenderUsersInCards = () => {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const updateUsers = async () => {
      let myData = await fetchUsers();
      console.log("myData", myData);

      setUsers(myData);
    };
    updateUsers();
  }, []);

  if (users.length === 0) {
    return <div>...Loading!</div>;
  }

  const displayedUsers = showAll ? users : users.slice(0, 3);

  return (
    <div className="user-cards-container">
      <div className="user-cards-header">
        <h2 style={{ fontSize: "25px", color: "#636C86", fontWeight: "600" }}>
          Successful Referrals
        </h2>
        <div className="btn-container">
          {!showAll && (
            <button
              className="btn btn btn-link"
              onClick={() => setShowAll(true)}
            >
              View All
            </button>
          )}
          {showAll && (
            <button className="btn btn-link" onClick={() => setShowAll(false)}>
              View Less
            </button>
          )}
        </div>
      </div>

      <div className="user-cards">
        {displayedUsers.map((user, index) => {
          return <BootstrapCard user={user} color={"info"} key={index} />;
        })}
      </div>
    </div>
  );
};

export default RenderUsersInCards;
