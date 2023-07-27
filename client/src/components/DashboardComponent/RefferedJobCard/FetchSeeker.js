import axios from "axios";
import Cookies from "js-cookie";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

const fetchSeeker = async () => {
  try {
    const token = Cookies.get("token");
    const headers = {
      authorization: `Bearer ${token}`,
    };
    let stringifiedUserData = sessionStorage.getItem("hiringShala_user");
    let seekerDetails;

    if (stringifiedUserData === null) {
      const response = await axios.get(
        `${apiUrl}/api/v1/seekers/${Cookies.get("userId")}`,
        { headers }
      );
      seekerDetails = response.data.seeker;
      stringifiedUserData = JSON.stringify(response.data.seeker);
      sessionStorage.setItem("hiringShala_user", stringifiedUserData);
    } else {
      seekerDetails = JSON.parse(stringifiedUserData);
    }

    return seekerDetails;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchSeeker;