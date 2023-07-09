import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import "../DashboardComponent/SeekerJob.css";
import RoundButton from "./sidemenu/RoundButton";
import Cookies from "js-cookie";

const apiUrl = process.env.REACT_APP_API_URL || "http://192.168.29.129:8000";
const EmployeeJobDetails = () => {
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const userId = Cookies.get("userId");
  const token = Cookies.get("token");
  const headers = {
    authorization: `Bearer ${token}`,
  };

  useEffect(() => {
    const fetchSeeker = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/employees/${userId}`,
          {
            headers,
          }
        );
        const jobIds = response.data.employee.listOfJobsPosted.map(
          (appliedJob) => appliedJob.jobId
        );
        console.log("JobId", jobIds);

        const employeeJob = await axios.post(`${apiUrl}/api/v1/jobs`);
        const filteredJobs = employeeJob.data.filter((job) =>
          jobIds.includes(job._id)
        );
        setJobs(filteredJobs);

        // Update jobDetails state with combined information
        const newJobDetails = filteredJobs.map((job) => {
          const appliedJob = response.data.employee.listOfJobsPosted.find(
            (appliedJob) => appliedJob.jobId === job._id
          );
          return {
            ...job,

            shortListedStatus: "False",
            totalReferralGiven: response.data.employee.totalReferralGiven,
            // seekerName: response.data.seeker.seekerName,
            // seekerEmail: response.data.seeker.seekerEmail,
            // seekerPhone: response.data.seeker.phone,
          };
        });
        setJobDetails(newJobDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeeker();
  }, [userId]);
  const handleSort = (column) => {
    if (sortColumn === column) {
      // If the current sorting column is the same as the clicked column,
      // reverse the sort direction
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Otherwise, set the clicked column as the sorting column
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedJobDetails = [...jobDetails]; // create a copy of jobDetails to avoid mutating state directly

  if (sortColumn !== null) {
    // Sort the jobDetails array based on the current sorting column and direction
    sortedJobDetails.sort((a, b) => {
      if (a[sortColumn] < b[sortColumn]) {
        return sortDirection === "asc" ? -1 : 1;
      } else if (a[sortColumn] > b[sortColumn]) {
        return sortDirection === "asc" ? 1 : -1;
      } else {
        return 0;
      }
    });
  }
  const visibleRows = showAll ? sortedJobDetails : sortedJobDetails.slice(0, 3);

  return (
    <div>
      <div className="AppliedJobHeader">
        <h2 style={{ fontSize: "25px", color: "#636C86", fontWeight: "600" }}>
          Posted Opportunities
        </h2>

        {sortedJobDetails.length > 0 && (
          <RoundButton
            onClick={() => setShowAll(!showAll)}
            text={showAll ? "Show Less" : "Show All"}
            className={"jobButton"}
          />
        )}
      </div>
      {visibleRows.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("jobDate")}>
                job Date <FontAwesomeIcon icon={faSort} />
              </th>
              <th onClick={() => handleSort("companyName")}>
                Company Name{" "}
                {sortColumn === "companyName" &&
                  (sortDirection === "asc" ? (
                    <FontAwesomeIcon icon={faSortUp} />
                  ) : (
                    <FontAwesomeIcon icon={faSortDown} />
                  ))}
                {!sortColumn && <FontAwesomeIcon icon={faSort} />}
              </th>
              <th onClick={() => handleSort("jobLocation")}>
                Location{" "}
                {sortColumn === "jobLocation" &&
                  (sortDirection === "asc" ? (
                    <FontAwesomeIcon icon={faSortUp} />
                  ) : (
                    <FontAwesomeIcon icon={faSortDown} />
                  ))}
                {!sortColumn && <FontAwesomeIcon icon={faSort} />}
              </th>
              <th onClick={() => handleSort("expectedPackage")}>
                Salary <FontAwesomeIcon icon={faSort} />
              </th>
              <th>Total Referral Given</th>
            </tr>
          </thead>

          <tbody>
            {visibleRows.map((job) => (
              <tr key={job._id}>
                <td>
                  {job.jobDate && format(new Date(job.jobDate), "dd/MM/yyyy")}
                </td>
                <td>{job.companyName}</td>
                <td>{job.jobLocation}</td>
                <td>{job.expectedPackage}</td>
                <td>
                  {" "}
                  {job.totalReferralGiven !== null
                    ? job.totalReferralGiven
                    : "0"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ fontWeight: "300px", fontSize: "20px", margin: "10px" }}>
          You haven’t posted any openings yet. posted opening appear here.
        </div>
      )}
    </div>
  );
};

export default EmployeeJobDetails;
