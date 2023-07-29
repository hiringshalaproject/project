import axios from "axios";
import React, { useEffect, useState } from "react";
import "./jobList.css";
import JobDetails from "../components/Jobs/JobDetails";
import JobFilter from "../components/Jobs/JobFilter";
import { toast } from "react-hot-toast";
const JobList = () => {
  const [job, setJob] = useState([]);
  const [checkedItems, setCheckedItems] = useState([]);
  const [searchVal, setSearchVal] = useState("");
  const [filteredJobs, setFilteredJobs] = useState([]);
  const handleFilterChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setCheckedItems([...checkedItems, value]);
    } else {
      const updatedItems = checkedItems.filter((item) => item !== value);
      setCheckedItems(updatedItems);
    }
  };

  const handleSearchInput = (event) => {
    setSearchVal(event.target.value);
  };

  const handleSearch = () => {

    searchVal !== "" &&
      setFilteredJobs(
        job.filter(
          (currJob) =>
            currJob.jobType?.toString()?.toLowerCase() ===
              searchVal.toLowerCase() ||
            currJob.jobTitle?.toString()?.toLowerCase() ===
              searchVal.toLowerCase() ||
            currJob.companyName?.toString()?.toLowerCase() ===
              searchVal.toLowerCase() ||
            currJob.jobLocation?.toString()?.toLowerCase() ===
              searchVal.toLowerCase()
        )
      );
    setSearchVal("");
  };

  const clearSearchItems=()=>{
    setFilteredJobs([]);
  }

  const clearCheckedItems = () => {
    setCheckedItems([]);
  };

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";
    const GetAllJobs = async () => {
      const stringifiedJobList = sessionStorage.getItem("hiringShala_jobList");
      var updatedJobList = JSON.parse(stringifiedJobList);
      if (stringifiedJobList === null)
        { await axios.post(`${apiUrl}/api/v1/jobs/`)
          .then((response) => {
            setJob(response.data);
            updatedJobList = response.data;
            const updatedJobListString = JSON.stringify(response.data);
            sessionStorage.setItem("hiringShala_jobList", updatedJobListString);  
          })
          .catch((error) => {
            if (error.response) {
              toast.error(error.response.data.msg);
            } else if (error.request) {
              toast.error("Network failure or timeout");
            } else {
              toast.error("An unexpected error occurred");
            }
          });
      }
      else
        setJob(updatedJobList);
    };
    GetAllJobs();
  }, []);

  const jobTypeList = [
    "Full Time",
    "Internship",
    "Remote",
    "Hybrid",
    "Part Time",
    "Contract",
  ];

  const jobCategoryList = [
    "SDE",
    "Frontend Developer",
    "Business Analyst",
    "Corporate Majdur",
  ];

  return (
    <>
      <div className="wrapper">
        <div className="input-group search-container">
          <input
            type="search"
            className="form-control rounded"
            placeholder="Search here..."
            aria-label="Search"
            value={searchVal}
            aria-describedby="search-addon"
            onChange={handleSearchInput}
          />
          <button
            type="button"
            className="btn btn-outline-success"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
        <div>
          <JobFilter
            filterName="All"
            filterValue={[]}
            handleFilterChange={handleFilterChange}
            clearCheckedItems={clearCheckedItems}
            clearSearchItems={clearSearchItems}
          />
          <JobFilter
            filterName="Job Type"
            filterValue={jobTypeList}
            handleFilterChange={handleFilterChange}
            clearCheckedItems={clearCheckedItems}
            clearSearchItems={clearSearchItems}
          />
          <JobFilter
            filterName="Job Category"
            filterValue={jobCategoryList}
            handleFilterChange={handleFilterChange}
            clearCheckedItems={clearCheckedItems}
            clearSearchItems={clearSearchItems}
          />
          <JobFilter
            filterName="Experience"
            filterValue={["Entry Level", "0-3yrs", "3+yrs", "5+yrs"]}
            handleFilterChange={handleFilterChange}
            clearCheckedItems={clearCheckedItems}
            clearSearchItems={clearSearchItems}
          />
        </div>
      </div>
      <JobDetails job={job} filterValue={checkedItems} searchItems={filteredJobs}/>
    </>
  );
};

export default JobList;
