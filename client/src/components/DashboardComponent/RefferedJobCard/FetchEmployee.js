import axios from "axios";
import Cookies from "js-cookie";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

const fetchEmployee = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/employees/${Cookies.get("userId")}`
    );
    const jobIds = response.data.seeker.appliedJobList.map(
      (appliedJob) => appliedJob.jobId
    );
    return response.data.employee;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchEmployee;
