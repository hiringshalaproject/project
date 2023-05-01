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

const SeekerJobDetails = ({ seekerId }) => {
  const [jobs, setJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchSeeker = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/v1/seekers/${seekerId}`
        );
        const jobIds = response.data.seeker.appliedJobList.map(
          (appliedJob) => appliedJob.jobId
        );

        // console.log("jobid", jobIds);
        const seekerJob = await axios.post("http://localhost:8000/api/v1/jobs");
        const filteredJobs = seekerJob.data.filter((job) =>
          jobIds.includes(job._id)
        );
        // console.log("jobs", filteredJobs);
        setJobs(filteredJobs);

        // Update jobDetails state with combined information
        const newJobDetails = filteredJobs.map((job) => {
          const appliedJob = response.data.seeker.appliedJobList.find(
            (appliedJob) => appliedJob.jobId === job._id
          );
          // console.log("status", appliedJob.shortListedStatus);
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
  }, [seekerId]);
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
          Applied Opportunities
        </h2>
        {/* <button onClick={() => setShowAll(!showAll)}>
          {showAll ? "Show Less" : "Show All"}
        </button> */}
        <RoundButton
          onClick={() => setShowAll(!showAll)}
          text={showAll ? "Show Less" : "Show All"}
          className={"jobButton"}
        />
      </div>

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
                {job.shortListedStatus !== null ? job.shortListedStatus : "N/A"}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SeekerJobDetails;
