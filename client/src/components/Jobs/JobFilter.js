import React, { useState } from "react";

function JobFilter({ filterName, filterValue, handleFilterChange,clearCheckedItems,clearSearchItems}) {
  const [dropdown, setDropdown] = useState(false);

  const handleClick = (filterName) => {
    if(filterName==="All"){
      clearCheckedItems();
      clearSearchItems();
    }
    setDropdown(!dropdown);
    
  };

  

  const renderCheckbox = (jobType) => {
    return (
      <div className="form-check">
        <input
          className="form-check-input"
          type="checkbox"
          id="flexCheckDefault"
          value={jobType}
          onChange={handleFilterChange}
        />
        <label className="form-check-label" htmlFor="flexCheckDefault">
          {jobType}
        </label>
      </div>
    );
  };

  
  return (
    <div className="job-filter-container">
      <div className="btn-group">
        <button
          type="button"
          className="btn btn-success filter-btn"
          onClick={()=>{handleClick(filterName)}}
        >
          {filterName}
        </button>
      </div>
      {(dropdown && filterValue.length!==0) &&(
        <div className={`flex flex-col dropdown-filter`}>
          <ul className="flex flex-col gap-4">
            {filterValue.map((val, index) => (
              <>{renderCheckbox(val)}</>
            ))}
            
          </ul>
          <div className="dropdown-divider"></div>
          {/* <button type="button" className="btn btn-light btn-block" onClick={}>Apply</button> */}
        </div>
      )}
    </div>
  );
}

export default JobFilter;
