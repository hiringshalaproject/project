import React, { useEffect, useState } from "react";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSort,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import "../DashboardComponent/SeekerJob.css";
import RoundButton from "./sidemenu/RoundButton";
const SeekerJobDetails = ({ userData, jobData }) => {
  const [jobDetails, setJobDetails] = useState([]);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState(null);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchSeekerJobs = async () => {
      try {
        if (!userData || !jobData) {
          return;
        }
        const resolveduserData = await userData;
        const resolvedJobData = await jobData;

        if (
          Array.isArray(resolveduserData.appliedJobList) &&
          resolveduserData.appliedJobList.length > 0
        ) {
          const jobIds = resolveduserData.appliedJobList.map(
            (appliedJob) => appliedJob.jobId
          );
          const shortListedStatus = resolveduserData.appliedJobList.map(
            (appliedJob) => appliedJob.shortListedStatus
          );

          const filteredJobs = resolvedJobData.filter((job) =>
            jobIds.includes(job._id)
          );

          const newJobDetails = filteredJobs.map((job) => {
            const index = jobIds.indexOf(job._id);
            return {
              ...job,
              shortListedStatus: shortListedStatus[index].toString(),
            };
          });
          setJobDetails(newJobDetails);
        }
      } catch (error) {
        console.error("Error fetching Seeker's Job Details", error);
      }
    };
    fetchSeekerJobs();
  }, [userData, jobData]);

  const handleSort = (column) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  const sortedJobDetails = [...jobDetails];

  if (sortColumn !== null) {
    // Sort the jobDetails array based on the current sorting column and direction
    sortedJobDetails.sort((a, b) => {
      if (sortColumn === "jobDate") {
        // Sort by date if the sorting column is "jobDate"
        const dateA = new Date(a.jobDate);
        const dateB = new Date(b.jobDate);

        if (dateA < dateB) {
          return sortDirection === "asc" ? -1 : 1;
        } else if (dateA > dateB) {
          return sortDirection === "asc" ? 1 : -1;
        } else {
          return 0;
        }
      } else {
        // Sort by other columns (companyName, jobLocation, etc.) using string comparison
        if (a[sortColumn] < b[sortColumn]) {
          return sortDirection === "asc" ? -1 : 1;
        } else if (a[sortColumn] > b[sortColumn]) {
          return sortDirection === "asc" ? 1 : -1;
        } else {
          return 0;
        }
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
                <td>{job.shortListedStatus}</td>
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
