import axios from "axios";

const fetchUsers = async () => {
  let response = await axios.get("http://localhost:8000/api/v1/jobs");
  console.log("ResponseData", response.data.jobs);

  return response.data.jobs;
};

export default fetchUsers;
