import axios from "axios";
import Cookies from "js-cookie";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
const token = Cookies.get("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };

const fetchSeeker = async () => {
  try {
    const stringifiedUserData = sessionStorage.getItem("hiringShala_user");
    var seekerDetails = JSON.parse(stringifiedUserData);
    console.log("hiringShala_user", seekerDetails);
    if (stringifiedUserData === null)
        { console.log("hiringShala_user1", seekerDetails);
        const response = await axios.get(
          `${apiUrl}/api/v1/seekers/${Cookies.get("userId")}`
        , {headers});
            seekerDetails = response.data.seeker;
            const stringifiedUserDetails = JSON.stringify(response.data.seeker);
            sessionStorage.setItem("hiringShala_user", stringifiedUserDetails);  
          }
    return seekerDetails;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchSeeker;