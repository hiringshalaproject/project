import axios from "axios";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import swal from "sweetalert";

function EditJob() {
  const location = useLocation();
  const job = location.state?.job;

  const [jobStatus, setJobStatus] = useState(false);
  const [form, setForm] = useState({});

  const renderInput = (label, name, type, placeholder, defaultValue) => {
    return (
      <>
        <label className="form-label" for="form3Example1q">
          {label}
        </label>
        <input
          type={type}
          placeholder={placeholder}
          name={name}
          onChange={handleForm}
          defaultValue={defaultValue}
          id="form3Example1q"
          class="form-control"
          autoComplete="off"
        />
      </>
    );
  };

  const handleForm = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCheck = (e) => {
    setJobStatus(e.target.checked);
  };

  const handleSubmit = async (e, id) => {
    e.preventDefault();

    form["isExpired"] = jobStatus;

    console.log("Updated Form Data", form);
    const url = `http://localhost:8000/api/v1/jobs/${id}`;

    axios.patch(url, form).then((response) => {
      if (response.status === 200) {
        swal({
          title: "Updated",
          text: "Job Updated Successfully",
          icon: "success",
          button: "OK!",
        });
        setForm({});
      } else {
        swal({
          title: "Update Failed",
          text: "Job Updation Failed",
          icon: "error",
          button: "OK",
        });
      }
    });

    document.getElementById("formData").reset();
  };

  return (
    <div>
      <section class="h-100 h-custom" style={{ backgroundColor: "#8fc4b7" }}>
        <div class="container py-5 h-100">
          <Link to="/getJobs">
            <button
              class="btn btn-success btn-lg mb-1 position-absolute top-0 end-0"
              style={{ marginTop: "20px", marginRight: "20px" }}
            >
              Back
            </button>
          </Link>
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-lg-8 col-xl-6">
              <div class="card rounded-3">
                <div class="card-body p-4 p-md-5">
                  <h3 class="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                    Edit Job Details
                  </h3>
                  <form
                    id="formData"
                    class="px-md-2"
                    autocomplete="off"
                    onSubmit={(e) => handleSubmit(e, job._id)}
                  >
                    <div class="form-outline mb-4">
                      {renderInput(
                        "Company Name",
                        "companyName",
                        "text",
                        "Enter Company Name",
                        job.companyName
                      )}
                    </div>
                    <div class="form-outline mb-4">
                      {renderInput(
                        "Job Requirements",
                        "jobRequirements",
                        "text",
                        "Enter job requirements",
                        job.jobRequirements
                      )}
                    </div>
                    <div class="form-outline mb-4">
                      {renderInput(
                        "Job Eligibility",
                        "jobEligibility",
                        "text",
                        "Enter Eligibility Criteria",
                        job.jobEligibility
                      )}
                    </div>
                    <div class="form-outline mb-4">
                      {renderInput(
                        "Job Location",
                        "jobLocation",
                        "text",
                        "Enter Job Location",
                        job.jobLocation
                      )}
                    </div>
                    <div class="form-outline mb-4">
                      {renderInput(
                        "Expected Package",
                        "expectedPackage",
                        "number",
                        "Enter ctc",
                        job.expectedPackage
                      )}
                    </div>
                    <div class="form-outline mb-4">
                      {renderInput(
                        "Apply Link",
                        "applyLink",
                        "url",
                        "Enter the apply link here",
                        job.applyLink
                      )}
                    </div>
                    <div class="form-outline mb-4">
                      {renderInput(
                        "Number of Openings",
                        "numberOfOpenings",
                        "text",
                        "Enter the number of opening",
                        job.numberOfOpenings
                      )}
                    </div>
                    <div class="form-outline mb-4">
                      {renderInput(
                        "Date",
                        "jobDate",
                        "date",
                        "Enter the date",
                        job.jobDate.substring(0, 10)
                      )}
                    </div>
                    <div class="form-check">
                      <input
                        class="form-check-input"
                        name="isExpired"
                        type="checkbox"
                        value=""
                        id="flexCheckDefault"
                        onChange={handleCheck}
                      />
                      <label class="form-check-label" for="flexCheckDefault">
                        Job Expired
                      </label>
                    </div>
                    <button type="submit" class="btn btn-success btn-lg mb-1">
                      Submit
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EditJob;
