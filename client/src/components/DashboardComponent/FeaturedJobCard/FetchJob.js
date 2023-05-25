import axios from "axios";
import Cookies from "js-cookie";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

const fetchJobs = async () => {
  try {
    const seekerJob = await axios.post(`${apiUrl}/api/v1/jobs`);
    console.log("seekerJob", seekerJob.data);
    return seekerJob.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchJobs;
