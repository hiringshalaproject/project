import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

function SeekerName() {
  const [seekerName, setSeekerName] = useState("");

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/seekers/${Cookies.get("userId")}`)
      .then((response) => {
        setSeekerName(response.data.seeker.seekerName);
      })
      .catch((error) => console.error(error));
  }, [apiUrl, seekerId]);

  return <h5>{seekerName}</h5>;
}

export default SeekerName;
