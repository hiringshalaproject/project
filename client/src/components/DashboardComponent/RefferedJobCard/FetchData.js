import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
const fetchUsers = async () => {
  try {
    const response = await axios.get(
      `${apiUrl}/api/v1/seekers/644d6ef36ff422399c1639f2`
    );
    const jobIds = response.data.seeker.appliedJobList.map(
      (appliedJob) => appliedJob.jobId
    );

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

export default fetchUsers;
