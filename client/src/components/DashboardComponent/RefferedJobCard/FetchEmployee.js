import axios from "axios";
import Cookies from "js-cookie";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";


const fetchEmployee = async () => {
  const token = Cookies.get("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };

  try {
    const stringifiedUserData = sessionStorage.getItem("hiringShala_user");
    var employeeDetails = JSON.parse(stringifiedUserData);
    if (stringifiedUserData === null)
      { const response = await axios.get(
        `${apiUrl}/api/v1/employees/${Cookies.get("userId")}`
        , { headers });
          employeeDetails = response.data.employee;
          const stringifiedUserDetails = JSON.stringify(response.data.employee);
          sessionStorage.setItem("hiringShala_user", stringifiedUserDetails);  
      }
    return employeeDetails;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchEmployee;
