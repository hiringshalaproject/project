import BootstrapCard from "./BootstrapCards";
import { useState, useEffect } from "react";
import fetchUsers from "./FetchData";
import "./BootstrapCards.css";
import RoundButton from "../sidemenu/RoundButton";

const RenderUsersInCards = () => {
  const [users, setUsers] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const updateUsers = async () => {
      let myData = await fetchUsers();
      // console.log("myData", myData);

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

        <RoundButton
          onClick={() => setShowAll(!showAll)}
          text={showAll ? "Show Less" : "Show All"}
          className={"RefferedjobButton"}
        />
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
