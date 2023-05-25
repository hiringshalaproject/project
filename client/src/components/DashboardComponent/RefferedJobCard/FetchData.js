import axios from "axios";
import Cookies from "js-cookie";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

const fetchUsers = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/seekers/${Cookies.get("userId")}`
    );
    const jobIds = response.data.seeker.appliedJobList.map(
      (appliedJob) => appliedJob.jobId
    );
    console.log("JobID", jobIds);
    const seekerJob = await axios.post(`${apiUrl}/api/v1/jobs`);
    const filteredJobs = seekerJob.data.filter((job) =>
      jobIds.includes(job._id)
    );
    console.log("job", filteredJobs);
    return filteredJobs;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchUsers;
