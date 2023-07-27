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
const EmployeeJobDetails = ({userData,jobData}) => {
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
    const fetchEmployee = async () => {
      try {
        const resolveduserData = await userData;
        const resolvedJobData = await jobData;
        const jobIds = resolveduserData.listOfJobsPosted.map(
          (appliedJob) => appliedJob.jobId
        );
        console.log("herejobIds", jobIds);
        const filteredJobs = resolvedJobData.filter((job) =>
          jobIds.includes(job._id)
        );
        console.log("here filteredJobs", filteredJobs);
        setJobs(filteredJobs);

        const newJobDetails = filteredJobs.map((job) => {
          const appliedJob = resolveduserData.listOfJobsPosted.find(
            (appliedJob) => appliedJob.jobId === job._id
          );
          return {
            ...job,
            totalReferralGiven: resolveduserData.totalReferralGiven,
          };
        });
        setJobDetails(newJobDetails);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployee();
  }, [userId]);
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
        <h2 style={{ fontSize: "25px", color: "#111111", fontWeight: "300" }}>
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
                Job Date <FontAwesomeIcon icon={faSort} />
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
