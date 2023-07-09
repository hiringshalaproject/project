import React from "react";
import "./JobSideNav.css";

function JobsSideNav() {
  const renderCheckbox = (jobType) => {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          value=""
          id="flexCheckDefault"
        />
        <label className="form-check-label sidebar-content" for="flexCheckDefault">
          {jobType}
        </label>
      </div>
    );
  };

  return (
    <>
      <nav
        id="sidebarMenu"
        className="d-lg-block sidebar bg-white"
        style={{ marginTop: "40px" }}
      >
        <div className="position-sticky sidebar-content">
          <div className="card noHover learn-more">
            <div className="card-body learn-more-content">
              <h5 className="card-title" style={{ color: "white" }}>
                Get tips to land your dream job with HiringShala
              </h5>
              <button
                type="button"
                className="btn btn-lg btn-primary rounded-pill noHover"
              >
                Learn More
              </button>
            </div>
          </div>

          <h5>
            <b className="sidebar-heading">Filters</b>
          </h5>
          <div className="job-type">
            <p>
              <b className="sidebar-heading">Job Type</b>
            </p>
            {renderCheckbox("Full Time")}
            {renderCheckbox("Part Time")}
            {renderCheckbox("Internship")}
            {renderCheckbox("Remote")}
          </div>

          <div class="form-check form-switch remote-option">
            <input
              class="form-check-input"
              type="checkbox"
              id="flexSwitchCheckDefault"
            />
            <label class="form-check-label" for="flexSwitchCheckDefault">
              <b className="sidebar-heading">Open to Remote</b>
            </label>
          </div>

          <div className="job-category">
            <p>
              <b className="sidebar-heading">Job Categories</b>
            </p>
            <div class="input-group">
              <div class="form-outline">
                <input
                  type="search"
                  id="form1"
                  class="form-control"
                  placeholder="Search"
                />
              </div>
            </div>
            {renderCheckbox("Business Development/Sales")}
            {renderCheckbox("Marketing")}
            {renderCheckbox("Software Engineering")}
            {renderCheckbox("Finance")}
          </div>
        </div>
      </nav>
    </>
  );
}

export default JobsSideNav;
