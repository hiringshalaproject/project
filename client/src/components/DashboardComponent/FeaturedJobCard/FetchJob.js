import axios from "axios";
import Cookies from "js-cookie";
const apiUrl = process.env.REACT_APP_API_URL || "http://192.168.29.129:8000";

const fetchJobs = async () => {
  try {
    // const response = await axios.get(
    //   `${apiUrl}/api/v1/seekers/${Cookies.get("userId")}`
    // );
    // const jobIds = response.data.seeker.appliedJobList.map(
    //   (appliedJob) => appliedJob.jobId
    // );

    const seekerJob = await axios.post(`${apiUrl}/api/v1/jobs`);
    // const filteredJobs = seekerJob.data.filter((job) =>
    //   jobIds.includes(job._id)
    // );
    console.log("seekerJob", seekerJob.data);
    return seekerJob.data;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export default fetchJobs;
