import axios from "axios";
import Cookies from "js-cookie";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
const token = Cookies.get("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };

const fetchSeeker = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/seekers/${Cookies.get("userId")}`
    , {headers});
    const jobIds = response.data.seeker.appliedJobList
      .filter((appliedJob) => appliedJob.referralStatus === true)
      .map((appliedJob) => appliedJob.jobId);
    const seekerJob = await axios.post(`${apiUrl}/api/v1/jobs`);
    const filteredJobs = seekerJob.data.filter((job) =>
      jobIds.includes(job._id)
    );
    return filteredJobs;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchSeeker;
