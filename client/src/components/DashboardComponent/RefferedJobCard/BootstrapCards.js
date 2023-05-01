import React from "react";
import Card from "react-bootstrap/Card";
import "./BootstrapCards.css";
import { format } from "date-fns";
import { FcClock } from "react-icons/fc";
import { AiFillDollarCircle } from "react-icons/ai";

const BootstrapCards = ({ user }) => {
  return (
    <div className="jobCard">
      <Card>
        <Card.Header>
          <FcClock className="clock-icon" />
          {user.jobDate && format(new Date(user.jobDate), "dd/MM/yyyy")}
        </Card.Header>
        <Card.Body>
          <Card.Title>{user.companyName}</Card.Title>
          <Card.Text>{user.jobLocation}</Card.Text>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor
          </p>
          <hr></hr>

          <Card.Text style={{ color: "black" }}>
            <AiFillDollarCircle className="doller-icon" />
            {user.expectedPackage} per annum
          </Card.Text>
        </Card.Body>
      </Card>
      <br />
    </div>
  );
};

export default BootstrapCards;
