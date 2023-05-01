import axios from "axios";

const fetchUsers = async () => {
  // let response = await axios.post("http://localhost:8000/api/v1/jobs");
  // console.log("ResponseData", response.data);

  // return response.data;
  const response = await axios.get(
    `http://localhost:8000/api/v1/seekers/644d6ef36ff422399c1639f2`
  );
  const jobIds = response.data.seeker.appliedJobList.map(
    (appliedJob) => appliedJob.jobId
  );

  // console.log("jobid", jobIds);
  const seekerJob = await axios.post("http://localhost:8000/api/v1/jobs");
  const filteredJobs = seekerJob.data.filter((job) => jobIds.includes(job._id));
  // console.log("jobs", filteredJobs);
  // setJobs(filteredJobs);
  return filteredJobs;
};

export default fetchUsers;
