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
const SeekerJobDetails = () => {
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchSeeker = async () => {
      try {
        const response = await axios.get(
          `${apiUrl}/api/v1/seekers/${Cookies.get("userId")}`
        );
        const jobIds = response.data.seeker.appliedJobList.map(
          (appliedJob) => appliedJob.jobId
        );

        const seekerJob = await axios.post(`${apiUrl}/api/v1/jobs`);
        const filteredJobs = seekerJob.data.filter((job) =>
          jobIds.includes(job._id)
        );
        setJobs(filteredJobs);

        // Update jobDetails state with combined information
        const newJobDetails = filteredJobs.map((job) => {
          const appliedJob = response.data.seeker.appliedJobList.find(
            (appliedJob) => appliedJob.jobId === job._id
          );
          return {
            ...job,

            shortListedStatus: "False",
            seekerName: response.data.seeker.seekerName,
            seekerEmail: response.data.seeker.seekerEmail,
            seekerPhone: response.data.seeker.phone,
          };
        });
        setJobDetails(newJobDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchSeeker();
  }, [Cookies.get("userId")]);
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
  // if (sortedJobDetails.length === 0) {
  //   return (
  //     <div style={{ fontWeight: "300px", fontSize: "20px" }}>
  //       You haven’t applied to any openings yet. Applied opening appear here.
  //     </div>
  //   );
  // }
  const visibleRows = showAll ? sortedJobDetails : sortedJobDetails.slice(0, 3);

  return (
    <div>
      <div className="AppliedJobHeader">
        <h2 style={{ fontSize: "25px", color: "#636C86", fontWeight: "600" }}>
          Applied Opportunities
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
              <th>ShortListed Status</th>
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
                  {job.shortListedStatus !== null
                    ? job.shortListedStatus
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div style={{ fontWeight: "300px", fontSize: "20px", margin: "10px" }}>
          You haven’t applied to any openings yet. Applied opening appear here.
        </div>
      )}
    </div>
  );
};

export default SeekerJobDetails;
