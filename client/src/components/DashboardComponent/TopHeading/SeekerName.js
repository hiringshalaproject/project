import React, { useState, useEffect } from "react";
import axios from "axios";

const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

function SeekerName({ seekerId }) {
  const [seekerName, setSeekerName] = useState("");

  useEffect(() => {
    axios
      .get(`${apiUrl}/api/v1/seekers/${seekerId}`)
      .then((response) => {
        setSeekerName(response.data.seeker.seekerName);
        console.log(response.data.seeker);
      })
      .catch((error) => console.error(error));
  }, [apiUrl, seekerId]);

  return <h5>{seekerName}</h5>;
}

export default SeekerName;
