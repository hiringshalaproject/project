import axios from "axios";
import Cookies from "js-cookie";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
const token = Cookies.get("token");
const headers = {
  authorization: `Bearer ${token}`,
};

const fetchEmployee = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/employees/${Cookies.get("userId")}`
    , {headers});
    return response;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchEmployee;
